import { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { ChatBubbleLeftEllipsisIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { db } from '@/pages/api/firebase/firebase';
import { useAuth } from '@/pages/api/auth/auth';
import { doc, updateDoc, arrayUnion, serverTimestamp, setDoc, collection, onSnapshot, query, orderBy, } from 'firebase/firestore';

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

  useEffect(() => {
    if (user) {
      const messagesRef = collection(db, `users/${user.uid}/messages`);
      const q = query(messagesRef, orderBy('timestamp', 'asc')); // Get messages ordered by timestamp

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          ...doc.data() as Message // Cast the data to the Message interface
        }));
        setMessages(fetchedMessages);
      });

      return () => unsubscribe(); // Unsubscribe from updates when component unmounts
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
          {messages.map(({ id, sender, text }) => (
              <div key={id} className={`border p-2 rounded-xl message ${sender === 'user' ? 'user-message bg-primary-main bg-opacity-90 justify-items-end w-fit text-white mb-3' : 'bg-gray-100 bot-message mb-3'}`}>
                {text}
              </div>
            ))}
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