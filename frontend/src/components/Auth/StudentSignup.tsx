import { useState } from "react";
//import Header from "../Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const StudentSignup = () => {
  const { role } = useParams();
  console.log(role);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleForm(event: any) {
    event.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth/student/signup`,
        {
          name,
          email,
          password,
        }
      );

      const token = res.data.token;
      localStorage.setItem("jwt", token);
      navigate("../student/dashboard");
      console.log(res);
    } catch (e) {
      console.log("Failed to submit");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleForm}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Sign Up
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-400 transition duration-300"
        >
          Sign Up
        </button>
        Already have an accout ?
        <a className="  underline " href="/student/login">
          {" "}
          SignIn
        </a>
      </form>
    </div>
  );
};

export default StudentSignup;
