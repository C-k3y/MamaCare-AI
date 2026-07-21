/**
 * Reusable utility inline style objects
 */

export const flexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export const flexBetween = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

export const flexColumn = {
    display: 'flex',
    flexDirection: 'column'
};

export const glassCard = {
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    padding: '24px'
};

export const buttonPrimary = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #8a2be2 0%, #ff69b4 100%)',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(138, 43, 226, 0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
};

export const inputField = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontSize: '1rem'
};

export default {
    flexCenter,
    flexBetween,
    flexColumn,
    glassCard,
    buttonPrimary,
    inputField
};
