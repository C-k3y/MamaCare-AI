import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import { aiApi } from '../api/aiApi';
import { messagesApi } from '../api/messagesApi';

const SymptomChecker = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchMessages = async () => {
        try {
            const res = await messagesApi.getMessages();
            // Filter to only show AI-related symptom check messages
            const chatMessages = res.data.filter(m => m.is_ai || m.content.toLowerCase().includes('symptom') || m.sender === m.receiver);
            
            // Sort by created_at ascending
            const sorted = chatMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            setMessages(sorted);
        } catch (err) {
            console.error('Failed to fetch messages', err);
        }
    };

    useEffect(() => {
        fetchMessages();
        // Simple polling to get AI response (since celery is async)
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        setInputValue('');
        setLoading(true);

        // Optimistically add user message to UI
        const tempMsg = {
            id: Date.now(),
            content: userMsg,
            is_ai: false,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            await aiApi.checkSymptoms(userMsg);
            // Fetch immediately, but AI response might take a few seconds (polled)
            await fetchMessages();
        } catch (err) {
            console.error('Failed to send symptom check', err);
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        layout: { display: 'flex', height: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" },
        main: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' },
        chatContainer: { 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            maxWidth: '900px', 
            margin: '0 auto', 
            width: '100%',
            padding: '24px',
            boxSizing: 'border-box'
        },
        header: { marginBottom: '20px', textAlign: 'center' },
        title: { fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', margin: '0 0 8px 0' },
        subtitle: { fontSize: '1rem', color: '#718096', margin: 0 },
        messageList: { 
            flex: 1, 
            overflowY: 'auto', 
            padding: '20px', 
            background: 'white', 
            borderRadius: '24px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        messageRow: (isAi) => ({
            display: 'flex',
            justifyContent: isAi ? 'flex-start' : 'flex-end',
            width: '100%'
        }),
        messageBubble: (isAi) => ({
            maxWidth: '70%',
            padding: '14px 20px',
            borderRadius: '20px',
            background: isAi ? '#f1f5f9' : 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: isAi ? '#1a202c' : 'white',
            borderBottomLeftRadius: isAi ? '4px' : '20px',
            borderBottomRightRadius: isAi ? '20px' : '4px',
            fontSize: '0.95rem',
            lineHeight: '1.5'
        }),
        inputForm: {
            display: 'flex',
            gap: '12px',
            background: 'white',
            padding: '16px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        },
        input: {
            flex: 1,
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '14px',
            fontSize: '1rem',
            outline: 'none',
            fontFamily: 'inherit'
        },
        sendBtn: {
            background: '#fb6f92',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '0 24px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s'
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar activeTab="symptom-checker" />
            <div style={styles.main}>
                <DashboardNavbar />
                <div style={styles.chatContainer}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>AI Symptom Triage</h1>
                        <p style={styles.subtitle}>Describe how you're feeling and our AI will advise if you should see a doctor.</p>
                    </div>

                    <div style={styles.messageList}>
                        {messages.length === 0 && (
                            <div style={{ textAlign: 'center', color: '#a0aec0', marginTop: '40px' }}>
                                <span style={{ fontSize: '3rem' }}></span>
                                <p>No messages yet. Describe your symptoms below!</p>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div key={msg.id} style={styles.messageRow(msg.is_ai)}>
                                <div style={styles.messageBubble(msg.is_ai)}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={styles.messageRow(true)}>
                                <div style={styles.messageBubble(true)}>
                                    <em>Analyzing...</em>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form style={styles.inputForm} onSubmit={handleSend}>
                        <input 
                            type="text" 
                            style={styles.input} 
                            placeholder="e.g. I have a severe headache and some nausea..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" style={styles.sendBtn} disabled={loading || !inputValue.trim()}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SymptomChecker;
