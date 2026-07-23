import React from 'react';

const ChatMessage = ({ message }) => {
    const isBot = message.sender === 'bot';
    
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: isBot ? 'flex-start' : 'flex-end',
            marginBottom: '16px',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            width: '100%'
        },
        bubble: {
            maxWidth: '75%',
            padding: '12px 16px',
            borderRadius: '18px',
            fontSize: '0.95rem',
            lineHeight: '1.5',
            position: 'relative',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            // Conditional styling based on sender
            ...(isBot ? {
                background: 'linear-gradient(135deg, #ffffff 0%, #fff0f3 100%)',
                color: '#2d3748',
                borderTopLeftRadius: '4px',
                border: '1px solid rgba(251, 111, 146, 0.2)'
            } : {
                background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
                color: '#ffffff',
                borderTopRightRadius: '4px',
                border: 'none'
            })
        },
        timestamp: {
            fontSize: '0.75rem',
            color: '#a0aec0',
            marginTop: '4px',
            padding: '0 4px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.bubble}>
                {message.text}
            </div>
            <span style={styles.timestamp}>{message.timestamp}</span>
        </div>
    );
};

export default ChatMessage;
