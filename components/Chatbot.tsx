
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatIcon, CloseIcon, SendIcon, UserCircleIcon, SparklesIcon } from './icons';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const modelMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: 'Maaf, ada masalah koneksi.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 z-50"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-40 overflow-hidden border border-slate-200">
          <header className="bg-sky-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">Asisten AI Guru</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-sky-200">
              <CloseIcon />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && <SparklesIcon />}
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-sky-500 text-white rounded-br-lg' : 'bg-slate-200 text-slate-800 rounded-bl-lg'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
                 {msg.role === 'user' && <UserCircleIcon />}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3">
                <SparklesIcon />
                <div className="max-w-[80%] p-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-lg">
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <footer className="p-4 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tulis pertanyaan..."
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2.5 bg-sky-600 text-white rounded-full hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                aria-label="Send Message"
              >
                <SendIcon />
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Chatbot;
