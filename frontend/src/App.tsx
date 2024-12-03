// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
  
 import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Signup } from "./components/Auth/Signup"
import Dashboard from "./components/Dashboard"
import StudentPost from "./components/StudentPost"
import Sidebar from "./components/Sidebar"
import TutorCard from "./components/TutorCard"
import { ProfilePage } from "./components/ProfilePage"
import TutorPost from "./components/TutorPost"

// import viteLogo from '/vite.svg'
 

function App() {
  
  return (
    <>  
      <BrowserRouter> 
    <Routes>
   <Route
    path="/signup"
    element={<Signup/>}
    />
    <Route path="/dashboard"
    element={<Dashboard/>}
 />
  <Route
  path="/post"
  element={<StudentPost/>}
/>
  <Route
  path="/sidebar"
  element={<Sidebar/>}

  />

  <Route
  path="/profile/:userId"
  element={<ProfilePage/>}

  />
  <Route
  path="/tutpost"
  element={<TutorPost/>}

  />
  {/* <Route path="/tutor_profile"
    element={<TutorCard/>}
 /> */}
    </Routes>

    </BrowserRouter>  
    </>
  )
}

export default App
