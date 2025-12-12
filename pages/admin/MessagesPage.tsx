import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Message, ChatMessage } from '../../types';

const MessagesPage: React.FC = () => {
  const { messages, adminReplyToMessage, markMessageAsRead } = useAppContext();
  const [selectedThread, setSelectedThread] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const unreadCount = messages.filter(m => m.status === 'Unread').length;

  useEffect(() => {
    if (selectedThread?.id) {
      const thread = messages.find(m => m.id === selectedThread.id);
      setSelectedThread(thread || null);
    }
  }, [messages, selectedThread?.id]);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedThread?.conversation]);

  const handleSelectThread = (thread: Message) => {
    setSelectedThread(thread);
    if (thread.status === 'Unread') {
      markMessageAsRead(thread.id);
    }
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedThread && replyText.trim()) {
      adminReplyToMessage(selectedThread.id, replyText.trim());
      setReplyText('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-3xl font-bold text-gray-800">Student Messages ({unreadCount} Unread)</h1>
      </div>
      <div className="flex flex-grow overflow-hidden">
        {/* Thread List */}
        <div className="w-1/3 border-r overflow-y-auto">
          {messages.map((thread) => (
            <button
              key={thread.id}
              onClick={() => handleSelectThread(thread)}
              className={`w-full text-left p-4 border-b hover:bg-gray-100 focus:outline-none ${selectedThread?.id === thread.id ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">{thread.studentName}</p>
                {thread.status === 'Unread' && <span className="w-3 h-3 bg-brand-primary rounded-full"></span>}
              </div>
              <p className="text-sm text-gray-600 truncate">{thread.subject}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(thread.conversation[0].timestamp).toLocaleDateString()}</p>
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="w-2/3 flex flex-col">
          {selectedThread ? (
            <>
              <div className="p-4 border-b bg-gray-50">
                <h2 className="font-bold text-xl">{selectedThread.studentName}</h2>
                <p className="text-sm text-gray-600">{selectedThread.subject}</p>
              </div>
              <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
                {selectedThread.conversation.map((msg: ChatMessage) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'} mb-4`}>
                    <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'admin' ? 'bg-brand-primary text-white' : 'bg-white shadow'}`}>
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-blue-200' : 'text-gray-500'} text-right`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 border-t bg-white">
                <form onSubmit={handleReply} className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <button type="submit" className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-primary-dark transition-colors">
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-500">
              <p>Select a message to view the conversation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
