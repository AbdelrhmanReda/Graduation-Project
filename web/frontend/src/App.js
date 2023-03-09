import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";


import Jobs from "./pages/Jobs";


import Aboutus from "./pages/Aboutus";
import UserProfile from "./pages/UserProfile";

import NotFound from "./pages/NotFound";
import ProtectedRoute from './components/ProtectedRoute';





const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/company/sign-up" element={<CompanySignUp />} /> */}
        <Route path="/jobs" element={<Jobs />} />
      

        <Route path="/about" element={<Aboutus />} />
        

        {/* <Route
          path="/company/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        /> */}
        
        <Route
          path="/user-profile"
          element={
            
              <UserProfile />
            
          }
        />

       
        <Route path="*" element={<NotFound />} />
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
