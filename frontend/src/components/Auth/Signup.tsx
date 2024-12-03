import React, { useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleForm(event:any) {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/student/signup", {
        name,
        email,
        password
      });

      const token = res.data.token;
      localStorage.setItem("jwt", token);
      navigate('/dashboard');
      console.log(res);
    } catch (e) {
      console.log("Failed to submit");
    }
  }

  return (
    <>   
      <Header />
      
      <div className='flex min-h-[100vh] w-[100%] bg-slate-50'>
        <div className='bg-blue-300 min-h-full w-1/2 flex items-center justify-center'>
          <div className='flex flex-col gap-4'>
            <form onSubmit={handleForm}>
              <div>
                <label htmlFor="name" className="block border-b-2 text-xl font-semibold p-1">Name</label>
                <input 
                  onChange={(e) => setName(e.target.value)} 
                  name="name" 
                  id="name" 
                  className="bg-emerald-200 w-full p-2 text-xl border-2 rounded-lg" 
                />
              </div>

              <div>
                <label htmlFor="email" className='block border-b-2 text-xl font-semibold p-1'>Email</label>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  type='email' 
                  name="email"
                  id="email"  
                  className='bg-emerald-200 w-full p-2 text-xl border-2 rounded-lg' 
                />
              </div>

              <div>
                <label htmlFor="password" className='block border-b-2 text-xl font-semibold p-1'>Password</label>
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  type='password' 
                  name="password"
                  id="password"   
                  className='bg-emerald-200 w-full p-2 text-xl border-2 rounded-lg' 
                />
              </div>

              <button 
                type='submit' 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mt-3"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        
        <div className='bg-white min-h-full w-1/2'>
          container 2
        </div>
      </div>
    </>
  );
};
