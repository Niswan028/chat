import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

function FullChatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: '🏋️‍♂️ Welcome to FitAI! Ready to crush your fitness goals today?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = await fetch('http://localhost:5000/api/chatbot/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    const botMessage = { role: 'bot', content: data.response };
    setMessages(prev => [...prev, botMessage]);
  };

  const quickReplies = [
  'Give me a fitness tip',
  'Suggest a workout plan',
  'What should I eat after a workout?',
  'Recommend a home workout',
  'How to build muscle?',
  'Best workout for fat loss',
];


  return (
    <div className="chatbot-full">
      <aside className="sidebar">
        
        <div className="quick-buttons">
          {quickReplies.map((txt, i) => (
            <button key={i} onClick={() => setInput(txt)}>{txt}</button>
          ))}
        </div>
      </aside>
      <main className="chat-area">
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>{msg.content}</div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="input-box">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask FitAI anything..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>
    </div>
  );
}

export default FullChatbot;
