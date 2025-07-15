import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import {} from '../assets/location-sign-svgrepo-com.svg'

interface Tutor {
  about: string;
  photo: string;
  edu: {
    year: number;
    specialization: string;
    degree: string;
  };
  offering: string;
  rating: number;
  count: number;
  location: string;
}

export const ProfilePage = () => {
  const loggedIn = false;
  const [res, setResponse] = useState<Tutor | null>(null);
  //bool loggedIn=false;
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    async function tutorProfile() {
      //   console.log(params.userId);
      try {
        const profile = await axios.get(
          `http://localhost:3000/api/userProfile/${userId}`
        );
        setResponse(profile.data);
        console.log(profile.data);
      } catch (e) {
        return { message: "error fetching profile" };
      }
    }
    tutorProfile();
  }, []);

  return (
    <div className="bg-[#3730a3] text-white">
      <header className="py-6 px-8">
        <h1 className="text-2xl font-bold">StudEase</h1>
      </header>
      <div className="flex justify-center w-full  h-42">
        <img
          className=" h-64
          transition-transform duration-300 ease-in-out hover:scale-105 transform
          rounded-sm
          hover:
         bg-slate-400
        w-84"
          src="https://legacy.reactjs.org/logo-og.png"
          alt="W3Schools.com"
        />
        hi
      </div>

      <div className="flex items-center justify-center h-[calc(100vh-96px)]">
        <div className="bg-white text-black rounded-lg p-8 shadow-lg w-full max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">
            I'm an educator pursuing a Ph.D. in English with experience teaching
            not only English, but also personality development and communication
            skills.
          </h2>

          <div className="flex justify-between items-center mb-8">
            <div className="bg-[#f3f4f6] px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-700">
                Russell Chowk
              </span>
            </div>
            <div className="bg-[#f3f4f6] px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-700">
                Russell Chowk
              </span>
            </div>
          </div>
          <button className=" flex  hover:underline-black "></button>
          <div className="flex justify-end space-x-4">
            <button className="bg-[#3730a3] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#2e2a84] transition-colors duration-300">
              Status
            </button>
            <button className="bg-[#ff70aa] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#ff4c92] transition-colors duration-300">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
