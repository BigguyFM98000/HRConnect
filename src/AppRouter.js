import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/Login';
import Register from './components/Register';
import Userprofile from './components/Userprofile';

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userprofile" element={<Userprofile />} />
        </Routes>
    </BrowserRouter>
    )
    
}

export default AppRouter;