import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

const conversations = [
    { id: 1, name: 'Dr. Amara Osei', role: 'Obstetrician', avatar: 'AO', lastMsg: 'Your test results look great! Keep it up.', time: '10:32 AM', unread: 2 },
    { id: 2, name: 'MamaCare AI Bot', role: 'AI Assistant', avatar: '🤖', lastMsg: 'How can I help you today?', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Dr. Lena Fischer', role: 'Midwife', avatar: 'LF', lastMsg: 'Don\'t forget to do your breathing exercises.', time: 'Mon', unread: 0 },
    { id: 4, name: 'Nurse Priya', role: 'Support Nurse', avatar: 'NP', lastMsg: 'See you at your next appointment!', time: 'Jul 15', unread: 0 }
];

const chatHistory = {
    1: [
        { from: 'them', text: 'Hello Jane! How are you feeling today?', time: '10:20 AM' },
        { from: 'me', text: 'I\'ve had some mild back pain lately.', time: '10:25 AM' },
        { from: 'them', text: 'That\'s common at week 24. Try a warm compress and gentle stretching. Your test results look great! Keep it up.', time: '10:32 AM' }
    ]
};

const Messages = () => {
    const [activeChat, setActiveChat] = useState(conversations[0]);
    const [input, setInput] = useState('');

    const s = {
        layout: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f7 0%, #ffe5ec 100%)', fontFamily: "'Inter', system-ui, sans-serif" },
        main: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' },
        inner: { display: 'flex', flex: 1, padding: '24px', gap: '20px', alignItems: 'stretch' },
        sidebar: { width: '300px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '20px', boxShadow: '0 8px 32px rgba(251,111,146,0.08)', border: '1px solid rgba(255,255,255,0.6)', flexShrink: 0, overflowY: 'auto' },
        sideTitle: { margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: '800', color: '#1a202c' },
        convItem: (active) => ({ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '16px', cursor: 'pointer', background: active ? 'rgba(251,111,146,0.1)' : 'transparent', border: active ? '1px solid rgba(251,111,146,0.2)' : '1px solid transparent', marginBottom: '8px', transition: 'all 0.2s' }),
        avatar: { width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#fb6f92,#ff8fab)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem', flexShrink: 0 },
        convName: { margin: '0 0 2px 0', fontWeight: '700', fontSize: '0.95rem', color: '#1a202c' },
        convMsg: { margin: 0, fontSize: '0.82rem', color: '#718096', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' },
        chatBox: { flex: 1, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '24px', boxShadow: '0 8px 32px rgba(251,111,146,0.08)', border: '1px solid rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column' },
        chatHeader: { display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '20px', borderBottom: '1px solid #edf2f7', marginBottom: '20px' },
        messages: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' },
        bubble: (fromMe) => ({ alignSelf: fromMe ? 'flex-end' : 'flex-start', background: fromMe ? 'linear-gradient(135deg,#ff8fab,#fb6f92)' : '#f7fafc', color: fromMe ? 'white' : '#2d3748', borderRadius: fromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '12px 16px', maxWidth: '60%', fontSize: '0.92rem', lineHeight: '1.5' }),
        inputRow: { display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #edf2f7' },
        input: { flex: 1, padding: '12px 18px', borderRadius: '16px', border: '2px solid #edf2f7', fontSize: '0.95rem', outline: 'none', fontFamily: "'Inter', system-ui, sans-serif", color: '#2d3748' },
        sendBtn: { padding: '12px 24px', borderRadius: '16px', background: 'linear-gradient(135deg,#ff8fab,#fb6f92)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif" }
    };

    const messages = chatHistory[activeChat.id] || [{ from: 'them', text: 'Hello! How can I help you?', time: 'Now' }];

    return (
        <div style={s.layout}>
            <Sidebar />
            <div style={s.main}>
                <DashboardNavbar />
                <div style={s.inner}>
                    <div style={s.sidebar}>
                        <h2 style={s.sideTitle}>Messages</h2>
                        {conversations.map(c => (
                            <div key={c.id} style={s.convItem(activeChat.id === c.id)} onClick={() => setActiveChat(c)}>
                                <div style={s.avatar}>{c.avatar}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={s.convName}>{c.name}</p>
                                    <p style={s.convMsg}>{c.lastMsg}</p>
                                </div>
                                {c.unread > 0 && <span style={{ background: '#fb6f92', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700', flexShrink: 0 }}>{c.unread}</span>}
                            </div>
                        ))}
                    </div>
                    <div style={s.chatBox}>
                        <div style={s.chatHeader}>
                            <div style={s.avatar}>{activeChat.avatar}</div>
                            <div>
                                <p style={{ margin: '0 0 2px 0', fontWeight: '700', color: '#1a202c' }}>{activeChat.name}</p>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: '#718096' }}>{activeChat.role}</p>
                            </div>
                        </div>
                        <div style={s.messages}>
                            {messages.map((m, i) => (
                                <div key={i} style={s.bubble(m.from === 'me')}>{m.text}</div>
                            ))}
                        </div>
                        <div style={s.inputRow}>
                            <input style={s.input} placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} />
                            <button style={s.sendBtn} onClick={() => setInput('')}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
