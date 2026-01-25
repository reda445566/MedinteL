import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'system', text: 'Hello! I am MedIntel AI. Ask me anything about your health or medical profile.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('/chatbot/query', { question: userMsg.text });
            if (res.data.success) {
                setMessages(prev => [...prev, { role: 'bot', text: res.data.answer }]);
                // If sources exist, you can display them:
                // if(res.data.sources) ...
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I encountered an error. Please check your connection.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-card">

                {/* Header */}
                <div className="chat-header">
                    <div className="bot-avatar">
                        <FaRobot />
                    </div>
                    <div className="chat-status">
                        <h3 className="chat-title">MedIntel Assistant</h3>
                        <span className="status-indicator">
                            <span className="status-dot"></span> Online
                        </span>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="messages-area">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}>
                            <div className={`msg-avatar ${msg.role === 'user' ? 'user-icon' : 'bot-icon'}`}>
                                {msg.role === 'user' ? <FaUser /> : <FaRobot />}
                            </div>
                            <div className="msg-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="typing-indicator">
                            MedIntel is typing...
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Input Area */}
                <div className="chat-input-area">
                    <form onSubmit={handleSend} className="input-form">
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type your health question..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="send-btn"
                            disabled={loading || !input.trim()}
                        >
                            <FaPaperPlane style={{ marginLeft: loading ? 0 : '-3px' }} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
