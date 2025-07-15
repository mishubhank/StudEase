// import { useState } from 'react'
// import reactLogo from './assets/react.svg'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Signup } from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard";
import StudentPost from "./components/StudentPost";
import Sidebar from "./components/Sidebar";
//import TutorCard from "./components/TutorCard"
import { ProfilePage } from "./components/ProfilePage";
import TutorPost from "./components/TutorPost";
import TutorDash from "./components/TutorDash";
import StudentList from "./components/all_students";
// import StudentCard from "./components/StudentCard";
import HomePage from "./components/HomePage";
import StudentLogin from "./components/Auth/studentLogin";
import Login from "./components/Auth/Login";
import TutorLogin from "./components/Auth/TutorLogin";
import StudentSign from "./components/Auth/StudentSignup";
import TutorSign from "./components/Auth/TutorSignup";

// import viteLogo from '/vite.svg'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="student/dashboard" element={<Dashboard />} />
          <Route path="student/post" element={<StudentPost />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tutor/post" element={<TutorPost />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          {/* <Route path="/tutor/dashboard" element={<TutorDash />} /> */}
          <Route path="/tutor/dashboard" element={<StudentList />} />
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSign />} />
          <Route path="/tutor/signup" element={<TutorSign />} />
          {/* <Route path="/skid" element={<StudentCard />} /> */}

          <Route path="/tutpost" element={<TutorPost />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/tutor_profile"
    element={<TutorCard/>}
 /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
