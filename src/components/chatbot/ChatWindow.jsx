import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';

const ChatWindow = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi there! I'm your MamaCare AI assistant. How can I help you and your little one today?",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const defaultSuggestions = [
        "What are safe exercises for the 2nd trimester?",
        "Is it normal to feel nauseous at 14 weeks?",
        "Suggest a healthy meal plan for today."
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        const newUserMsg = {
            id: Date.now(),
            text: text,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: "That's a great question! However, as an AI, I am currently just demonstrating the UI. In a real app, I would give you a helpful, medically-sound response based on MamaCare's knowledge base.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '600px',
            maxHeight: '85vh',
            maxWidth: '450px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(251, 111, 146, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            overflow: 'hidden'
        },
        header: {
            padding: '20px',
            background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        headerAvatar: {
            width: '40px',
            height: '40px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        headerTitle: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '600'
        },
        headerSubtitle: {
            margin: 0,
            fontSize: '0.85rem',
            opacity: 0.9
        },
        chatArea: {
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            background: 'rgba(250, 250, 250, 0.5)'
        },
        inputArea: {
            padding: '16px',
            background: 'white',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
        },
        input: {
            flex: 1,
            padding: '14px 20px',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            fontSize: '0.95rem',
            outline: 'none',
            background: '#f8fafc',
            color: '#2d3748',
            transition: 'border-color 0.2s'
        },
        sendButton: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: 'white',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(251, 111, 146, 0.3)',
            transition: 'transform 0.2s'
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerAvatar}>🩺</div>
                <div>
                    <h3 style={styles.headerTitle}>MamaCare AI</h3>
                    <p style={styles.headerSubtitle}>Always here for you</p>
                </div>
            </div>

            {/* Chat Area */}
            <div style={styles.chatArea}>
                {messages.map(msg => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                
                {isTyping && <TypingIndicator />}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '0 16px', background: 'white' }}>
                <SuggestedQuestions 
                    questions={messages.length === 1 ? defaultSuggestions : []} 
                    onSelect={handleSend} 
                />
            </div>
            
            <form 
                style={styles.inputArea} 
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(inputValue);
                }}
            >
                <input 
                    type="text" 
                    placeholder="Ask anything..." 
                    style={styles.input}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#fb6f92'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                <button 
                    type="submit" 
                    style={{...styles.sendButton, opacity: inputValue.trim() ? 1 : 0.6}} 
                    disabled={!inputValue.trim()}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
