import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

const notificationsData = [
    { id: 1, type: 'appointment', icon: '📅', title: 'Appointment Reminder', message: 'Your checkup with Dr. Amara Osei is tomorrow at 10:30 AM.', time: '2 hours ago', unread: true },
    { id: 2, type: 'health', icon: '❤️', title: 'Daily Health Check', message: 'Don\'t forget to log your blood pressure reading for today.', time: '5 hours ago', unread: true },
    { id: 3, type: 'nutrition', icon: '🥗', title: 'Nutrition Goal Met', message: 'Great job! You\'ve hit your daily iron intake goal.', time: 'Yesterday', unread: false },
    { id: 4, type: 'tip', icon: '💡', title: 'Week 24 Tip', message: 'Your baby\'s lungs are developing rapidly. Gentle breathing exercises can help.', time: 'Yesterday', unread: false },
    { id: 5, type: 'system', icon: '🔔', title: 'Profile Updated', message: 'Your pregnancy information was successfully updated.', time: '3 days ago', unread: false }
];

const Notifications = () => {
    const [notifications, setNotifications] = useState(notificationsData);
    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));

    const s = {
        layout: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f7 0%, #ffe5ec 100%)', fontFamily: "'Inter', system-ui, sans-serif" },
        main: { marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' },
        content: { padding: '32px', flex: 1, maxWidth: '780px' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
        heading: { margin: 0, fontSize: '1.75rem', fontWeight: '800', color: '#1a202c' },
        badge: { padding: '6px 14px', background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)', color: 'white', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '700' },
        markAllBtn: { padding: '10px 20px', borderRadius: '12px', background: 'transparent', border: '2px solid #edf2f7', fontWeight: '600', fontSize: '0.9rem', color: '#718096', cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif" },
        notifCard: (unread) => ({ background: unread ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '20px 24px', marginBottom: '12px', border: unread ? '1px solid rgba(251,111,146,0.2)' : '1px solid rgba(255,255,255,0.5)', boxShadow: unread ? '0 4px 20px rgba(251,111,146,0.08)' : '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'flex-start', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s' }),
        iconBox: { width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #ffe5ec 0%, #ffc2d1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 },
        notifTitle: { margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: '700', color: '#1a202c' },
        notifMsg: { margin: '0 0 6px 0', fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' },
        notifTime: { margin: 0, fontSize: '0.8rem', color: '#a0aec0', fontWeight: '500' },
        dot: { width: '8px', height: '8px', borderRadius: '50%', background: '#fb6f92', marginTop: '6px', flexShrink: 0 }
    };

    return (
        <div style={s.layout}>
            <Sidebar />
            <div style={s.main}>
                <DashboardNavbar />
                <div style={s.content}>
                    <div style={s.header}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <h1 style={s.heading}>Notifications</h1>
                            {unreadCount > 0 && <span style={s.badge}>{unreadCount} new</span>}
                        </div>
                        {unreadCount > 0 && <button style={s.markAllBtn} onClick={markAllRead}>Mark all as read</button>}
                    </div>
                    {notifications.map(n => (
                        <div
                            key={n.id}
                            style={s.notifCard(n.unread)}
                            onClick={() => markRead(n.id)}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={s.iconBox}>{n.icon}</div>
                            <div style={{ flex: 1 }}>
                                <p style={s.notifTitle}>{n.title}</p>
                                <p style={s.notifMsg}>{n.message}</p>
                                <p style={s.notifTime}>{n.time}</p>
                            </div>
                            {n.unread && <div style={s.dot}></div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
