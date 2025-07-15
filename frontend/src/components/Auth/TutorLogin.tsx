import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TutorLogin = () => {
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const studentLogin = async (e: any) => {
    e.preventDefault();
    try {
      const v = await axios.post(
        "http://localhost:3000/api/auth/student/signin",
        {
          email: mail,
          password: pass,
        }
      );

      navigate("../dashboard");
      console.log(v);
    } catch {
      return { message: "failed to login" };
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      {/* Navbar */}
      <div className="h-16 bg-black w-full flex items-center justify-center shadow-lg">
        <h1 className="text-2xl font-bold text-white">StudEase</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-3/5 flex items-center justify-center bg-green-200 p-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black text-center">
            Your Journey Starts Here Find Student Nearby
          </h2>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center bg-blue-100 shadow-lg p-6">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold font- text-black mb-6">
            Login
          </h3>

          {/* Input Fields */}
          <form action="submit" onSubmit={studentLogin}>
            <div className="w-full md:w-3/4 space-y-4">
              <input
                type="email"
                className="border border-gray-300  p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Email"
                onChange={(e) => setMail(e.target.value)}
              />
              <input
                type="password"
                onChange={(e) => setPass(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full md:w-3/4 bg-black text-white rounded-lg p-3 font-semibold hover:bg-gray-800"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a
              href="/tutor/signup"
              className="text-black font-semibold hover:underline"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorLogin;
