import React, { useRef, useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { ChatBubbleLeftEllipsisIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { db } from '@/pages/api/firebase/firebase';
import { useAuth } from '@/pages/api/auth/auth';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { InlineButton } from '../shared/button';
import { getFunctions, httpsCallable } from 'firebase/functions';

interface AIChatMessageProps {
  id?: string | number;
  sender: string;
  message: string;
  timestamp: Timestamp | Date; // Ensure this matches how you're storing timestamps
}

interface ChatBoxProps {
  role: string | null
  recipe: any,
}

export function Chatbox({role, recipe}:ChatBoxProps) {
    
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<AIChatMessageProps[]>([]);
  const { user } = useAuth();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const functions = getFunctions();
  const chatWithZesti = httpsCallable(functions, 'chatWithZesti');

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (user && recipe.id) {
      const messageRef = doc(db, `users/${user.uid}/messages`, recipe.id);
      
      const unsubscribe = onSnapshot(messageRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const chat = data.chat || [];
          // Slice to get the most recent 20 messages
          const recentMessages = chat.slice(-20).map((msg: AIChatMessageProps, index: number) => ({
            ...msg,
            id: index, // Assign a temporary ID for key prop usage
          }));
          setMessages(recentMessages);
        }
      });

      return () => unsubscribe();
    }
  }, [user, recipe.id, db]);


  const handleChatboxClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setMessage('') // Clear the message input after sending

    if (message.trim() === '' || !user ) return;

    // Client side message and timestamp

    const messageObj = {
      message: message,
      sender: 'user',
    }

    const requestData = {
      messageObj: messageObj,
      recipe_id: recipe.id,
      ingredients: JSON.stringify(recipe.ingredients),
      instructions: JSON.stringify(recipe.instructions)
    }

    const response = await chatWithZesti(requestData).catch((error) => {
      console.log("Error: ", error)
    })
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom every time messages change
  }, [messages]);


  return (
    <div className="fixed bottom-4 right-4 z-[99]">
      {isOpen ? (
        <div className="w-fit h-[500px] ml-4 p-4 md:w-[500px] md:h-[500px] bg-white rounded-lg shadow-lg flex flex-col border border-gray-700" onClick={handleChatboxClick}>
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">Zesti Cooking Assistant</h2>
            <button onClick={() => setIsOpen(false)} className="text-xl">
              <XMarkIcon className="text-black w-6 h-6 hover:text-red-600"/>
            </button>
          </div>
          {user && messages.length == 0 && role !== 'premium' ? // Currentl set !== to allow for anyone to use chat during beta
            <PremiumChat/>
          : user && messages.length == 0 && role == null ?
            <UpgradeToPremiumChat/>
          : user && messages.length > 0 ?
            <ActiveChatMessages messages={messages} endOfMessagesRef={endOfMessagesRef}/>
          :
            <NoAuthChat/>
          }
          <div className="flex items-center focus:outline-none focus:ring border rounded-lg">
            <input
              type="text"
              placeholder="Ask a cooking question..."
              className="w-full p-2 text-gray-700"
              
              value={message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { // Prevent sending on Shift+Enter
                  handleSendMessage(e as unknown as React.MouseEvent<HTMLButtonElement>);
                }
              }}
            />
            <button
              type="button"
              disabled={role !== 'premium' ? false : true}
              onClick={handleSendMessage}
              className={`bg-primary-main text-white rounded-r p-2 hover:bg-primary-alt transition ${role !== 'premium' && user ? 'hover:cursor-pointer' : `cursor-not-allowed`}`}
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
              setIsOpen(true);
              e.stopPropagation();
          }}
          className="bg-primary-main text-white p-4 rounded-full shadow-lg hover:bg-primary-alt transition"
        >
          <ChatBubbleLeftEllipsisIcon className="text-white w-10 h-10"/>
        </button>
      )}
    </div>
  );
}

function UpgradeToPremiumChat() {
  return(
    <div className="flex-1 p-4 overflow-y-auto">
        <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
          <span className="text-black">Updrade to premium to unlock Zesti AI Assistant</span>
        </div>
        <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
            <span className="text-black">   
            <InlineButton isLink={true} href="/auth/login" text="Click here" className="text-black mr-1 hover:primary-alt"/>
            to start a 7-day free trial!
            </span>
        </div>
    </div>
  )
}

function PremiumChat() {
  return(
    <div className="flex-1 p-4 overflow-y-auto">
      <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
        <span className="text-black">Let start cooking!</span>
      </div>
      <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
        <div className="text-black">If you have any general questions, feel free to ask here! For example:</div>
      </div>
      <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
        <div className="text-black">How do I know if chicken is finished cooking?</div>
      </div>
      <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
        <div className="text-black">I ran out of vegetable oil, what can I replace it with?</div>
      </div>
    </div>
  )
}

function NoAuthChat() {
  return(
    <div className="flex-1 p-4 overflow-y-auto">
      <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
        <span className="text-black">Welcome to Zesti!</span>
      </div>
      <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
        <span className="text-black">I am an AI cooking assistant that can answer cooking questions without you ever leaving the page!</span>
      </div>
      <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
        <span className="text-black">   
        <InlineButton isLink={true} href="/auth/login" text="Click here" className="text-black mr-1 hover:primary-alt"/>
          to get started
        </span>
      </div>
    </div>
  )
}

interface ActiveChatMessagesProps {
  messages: AIChatMessageProps[],
  endOfMessagesRef: React.RefObject<HTMLDivElement>;
}

function ActiveChatMessages({messages, endOfMessagesRef}: ActiveChatMessagesProps) {
  return(
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map(({ id, sender, message }) => (
      <div key={id} className={`border p-2 rounded-xl message ${sender === 'user' ? 'user-message bg-primary-main bg-opacity-90 justify-items-end w-fit text-white mb-3' : 'bg-gray-100 bot-message w-fit mb-3 text-black'}`}>
        {message}
      </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  )
}