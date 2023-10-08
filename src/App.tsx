import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import your main views/pages
import KYC from './views/KYC/KYC';
import UserExchange from './views/UserExchange/UserExchange';
import Archarna from './views/Archarna/Archarna';
import RegFIU from './views/RegFIU/RegFIU';
//... import the rest of the views

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <Routes>
                        <Route path="/kyc" element={<KYC />} />
                        <Route path="/user-exchange" element={<UserExchange />} />
                        <Route path="/archana" element={<Archarna />} />
                        <Route path="/reg-fiu" element={<RegFIU />} />
                        {/* Add routes for other views/pages */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
