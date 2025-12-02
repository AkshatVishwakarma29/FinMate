import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GlobalProvider } from './context/GlobalContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PersonalExpenses from './pages/PersonalExpenses';
import GroupExpenses from './pages/GroupExpenses';
import LandingPage from './pages/LandingPage';

function App() {
    return (
        <AuthProvider>
            <GlobalProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                        <Route path="/personal" element={<Layout><PersonalExpenses /></Layout>} />
                        <Route path="/groups" element={<Layout><GroupExpenses /></Layout>} />
                    </Routes>
                </Router>
            </GlobalProvider>
        </AuthProvider>
    );
}

export default App;
