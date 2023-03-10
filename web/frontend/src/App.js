import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";

import ProtectedRoute from './components/ProtectedRoute'
import Jobs from "./pages/Jobs";


import Aboutus from "./pages/Aboutus";


import NotFound from "./pages/NotFound";

import CompanySignUp from './pages/CompanySignUp';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';





const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/sign-up" element={<CompanySignUp />} />
        <Route path="/Company/dashboard" element={<Dashboard />} />
  
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path='/user-profile'
          element={
            
              <UserProfile />
            
          }
        />


    
      </Routes>

      
      

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        draggable
        limit={3}
      />
    </>
  );
};

export default App;
