import { useState, ChangeEvent, MouseEvent } from 'react';
import { ChatBubbleLeftEllipsisIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { db } from '@/pages/api/firebase/firebase';
import { useAuth } from '@/pages/api/auth/auth';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

type ChatBoxProps = {
    recipeId: string;
  };

export function Chatbox({recipeId}: ChatBoxProps) {
    
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [id, setId] = useState<string | null >({recipeId}.recipeId)
  const { user } = useAuth();

  const handleChatboxClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (message.trim() === '' || !user || !id) return;
  
    // Use a client-side timestamp
    const newMessage = {
      text: message,
      timestamp: new Date() // Client-side timestamp
    };
  
    const messagesRef = doc(db, `users/${user.uid}/recipes/${id}`);
  
    try {
      await updateDoc(messagesRef, {
        messages: arrayUnion(newMessage)
      });
  
      setMessage(''); // Clear the message input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="w-64 md:w-96 h-96 bg-white rounded-lg shadow-lg flex flex-col" onClick={handleChatboxClick}>
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold">Talk to Zesti</h2>
            <button onClick={() => setIsOpen(false)} className="text-xl">×</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto ">
            {"Message"}
          </div>
          <div className="flex items-center m-4 focus:outline-none focus:ring border rounded-lg">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2"
              value={message}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              onClick={handleSendMessage}
              className="bg-primary-main text-white rounded-r p-2 hover:bg-primary-alt transition"
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