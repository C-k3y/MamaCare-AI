import React from 'react';

const SuggestedQuestions = ({ questions, onSelect }) => {
    if (!questions || questions.length === 0) return null;

    const styles = {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
        },
        button: {
            background: 'rgba(251, 111, 146, 0.05)',
            border: '1px solid rgba(251, 111, 146, 0.3)',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '0.85rem',
            color: '#fb6f92',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none'
        }
    };

    return (
        <div style={styles.container}>
            {questions.map((q, index) => (
                <button 
                    key={index} 
                    style={styles.button}
                    onClick={() => onSelect(q)}
                    onMouseOver={(e) => {
                        e.target.style.background = 'rgba(251, 111, 146, 0.15)';
                        e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'rgba(251, 111, 146, 0.05)';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    {q}
                </button>
            ))}
        </div>
    );
};

export default SuggestedQuestions;
