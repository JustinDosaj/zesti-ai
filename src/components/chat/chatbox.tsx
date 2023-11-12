import React, { useRef, useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { ChatBubbleLeftEllipsisIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { db } from '@/pages/api/firebase/firebase';
import { useAuth } from '@/pages/api/auth/auth';
import { doc, updateDoc, arrayUnion, serverTimestamp, setDoc, collection, onSnapshot, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { InlineBtnLink } from '../shared/inline-btn-link';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date | { seconds: number, nanoseconds: number }; // Adjust based on the actual shape of the timestamp
}

export function Chatbox() {
    
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (user) {
      const twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getHours() - 2); // Set to two hours ago

      const messagesRef = collection(db, `users/${user.uid}/messages`);
      const q = query(
        messagesRef,
        where('timestamp', '>=', Timestamp.fromDate(twoHoursAgo)), // Only get messages from the last two hours
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages: Message[] = snapshot.docs.map(doc => ({
          ...doc.data() as Message
        }));
        setMessages(fetchedMessages);
        scrollToBottom();
      });

      return () => unsubscribe();
    }
  }, [user]);


  const handleChatboxClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (message.trim() === '' || !user ) return;
  

    const messagesRef = collection(db, `users/${user?.uid}/messages`);

    // Client side message and timestamp
    const userMessage = {
      sender: "user",
      text: message,
      timestamp: new Date()
    };
  
    try {
      await setDoc(doc(messagesRef), {
        sender: "user",
        text: message,
        timestamp: new Date()
      }, { merge: true });
  
      setMessage(''); // Clear the message input after sending
      scrollToBottom();

    } catch (error) {
      console.error('Error sending message:', error);
    }
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
          {user && messages.length == 0 ? 
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
          : user && messages.length > 0 ?
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map(({ id, sender, text }) => (
            <div key={id} className={`border p-2 rounded-xl message ${sender === 'user' ? 'user-message bg-primary-main bg-opacity-90 justify-items-end w-fit text-white mb-3' : 'bg-gray-100 bot-message mb-3 text-black'}`}>
              {text}
            </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
          :
          <div className="flex-1 p-4 overflow-y-auto">
            <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
              <span className="text-black">Welcome to Zesti!</span>
            </div>
            <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
              <span className="text-black">I am an AI cooking assistant that can answer your cooking questions and change YouTube recipe videos into easy-to-follow instructions</span>
            </div>
            <div className={`border p-2 rounded-xl message bg-gray-100 bg-opacity-90 justify-items-end w-fit text-black mb-3`}>
              <span className="text-black">   
              <InlineBtnLink href="/login" text="Click Here to login" className="text-black mr-1 hover:primary-alt"/>
              and start chatting
              </span>
            </div>
          </div>
          }
          <div className="flex items-center focus:outline-none focus:ring border rounded-lg">
            <input
              type="text"
              placeholder="Ask a cooking question..."
              className="w-full p-2 text-gray-700"
              value={message}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              onClick={handleSendMessage}
              className={`bg-primary-main text-white rounded-r p-2 hover:bg-primary-alt transition ${!user ? `hover:cursor-not-allowed` : ``}`}
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