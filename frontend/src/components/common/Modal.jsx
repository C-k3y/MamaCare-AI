import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    const styles = {
        backdrop: {
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        content: {
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            position: 'relative',
            fontFamily: "'Inter', system-ui, sans-serif",
            animation: 'modal-pop 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        },
        title: {
            margin: 0,
            fontSize: '1.5rem',
            color: '#1a202c',
            fontWeight: '700'
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#a0aec0',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.backdrop} onClick={onClose}>
            <style>
                {`
                @keyframes modal-pop {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                `}
            </style>
            <div style={styles.content} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>{title}</h2>
                    <button style={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
export default Modal;
