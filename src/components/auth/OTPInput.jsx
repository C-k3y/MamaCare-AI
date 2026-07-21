import React, { useState, useRef } from "react";

const OTPInput = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    // Handle typing and moving focus forward
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return; // Only allow numbers

        const newOtp = [...otp];
        // Allow only the last character entered
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Check if complete
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length && onComplete) {
            onComplete(combinedOtp);
        }

        // Move focus to next input if there's a value
        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle backspace and moving focus backward
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            // Move focus to the previous input on backspace
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle copy/paste functionality
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text/plain").slice(0, length).split("");
        if (pasteData.some(char => isNaN(char))) return; // Ensure pasted content is numeric

        const newOtp = [...otp];
        pasteData.forEach((char, i) => {
            newOtp[i] = char;
        });
        setOtp(newOtp);

        // Move focus to the next empty input or the last input
        const focusIndex = Math.min(pasteData.length, length - 1);
        inputRefs.current[focusIndex].focus();

        if (pasteData.length === length && onComplete) {
            onComplete(newOtp.join(""));
        }
    };

    // Inline styles matching the app's theme
    const styles = {
        page: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #ffe5ec 0%, #ffc2d1 100%)',
            padding: '20px',
            boxSizing: 'border-box'
        },
        container: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 10px 40px rgba(251, 111, 146, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            maxWidth: '450px',
            width: '100%',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            textAlign: 'center',
            boxSizing: 'border-box'
        },
        title: {
            margin: '0 0 12px 0',
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1a202c',
            letterSpacing: '-0.02em'
        },
        description: {
            margin: '0 0 32px 0',
            fontSize: '0.95rem',
            color: '#718096',
            lineHeight: '1.5'
        },
        otpContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '32px'
        },
        inputBox: {
            width: '45px',
            height: '55px',
            fontSize: '1.5rem',
            textAlign: 'center',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            background: '#ffffff',
            color: '#2d3748',
            fontWeight: '600',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s'
        },
        button: {
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff8fab 0%, #fb6f92 100%)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(251, 111, 146, 0.3)',
            marginBottom: '24px'
        },
        footerText: {
            fontSize: '0.9rem',
            color: '#718096',
            margin: '0'
        },
        link: {
            color: '#fb6f92',
            fontWeight: '600',
            textDecoration: 'none',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.title}>Verification Code</h2>
                <p style={styles.description}>
                    We've sent a one-time password to your email. Please enter it below.
                </p>
                
                <div style={styles.otpContainer} onPaste={handlePaste}>
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            name="otp"
                            maxLength="1"
                            style={styles.inputBox}
                            value={data}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>

                <button style={styles.button} onClick={() => onComplete && onComplete(otp.join(""))}>
                    Verify Code
                </button>
                
                <p style={styles.footerText}>
                    Didn't receive the code? <span style={styles.link}>Resend</span>
                </p>
            </div>
        </div>
    );
};

export default OTPInput;
