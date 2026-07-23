import React from 'react';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            overflowX: 'clip' // Prevent horizontal scrolling without swallowing pointer events
        }}>
            <AppRoutes />
        </div>
    );
};

export default App;
