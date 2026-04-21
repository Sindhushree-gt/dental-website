import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 I\'m SmileVista\'s AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: input });
      setMessages(prev => [...prev, { type: 'bot', text: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, I couldn\'t process that. Please try again or contact our team.' }]);
    } finally {
      setLoading(false);
    }
  };

  const quickReplies = [
    'Tell me about treatments',
    'How do I book?',
    'What are your costs?',
    'Emergency support'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-[calc(100vw-2rem)] flex flex-col h-[600px] mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--dk)] p-6 text-white">
            <h3 className="font-bold text-lg">SmileVista Assistant</h3>
            <p className="text-sm opacity-90">We typically reply in minutes</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-[color:var(--teal)] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(reply);
                      setMessages(prev => [...prev, { type: 'user', text: reply }]);
                      setTimeout(() => {
                        setMessages(prev => [...prev, { type: 'bot', text: 'Thanks for asking! This is a helpful response.' }]);
                      }, 500);
                    }}
                    className="text-xs bg-[color:var(--soft)] text-[color:var(--dk)] p-2 rounded hover:bg-white transition font-medium border border-black/5"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[color:var(--teal)] text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[color:var(--teal)] text-white px-4 py-2 rounded-lg hover:bg-[color:var(--dk)] transition disabled:opacity-50 font-bold"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[color:var(--teal)] text-white rounded-full p-4 shadow-lg hover:bg-[color:var(--dk)] transition-all hover:scale-110 flex items-center justify-center w-16 h-16"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;
