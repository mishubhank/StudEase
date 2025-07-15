import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const nagivate = useNavigate();

  return (
    <div className="h-screen flex">
      {/* Left Section: Content */}
      <div className="flex w-2/3">
        <div className="p-12 w-full h-screen  ">
          {/* Content Wrapper */}
          <div className="flex flex-col w-3/4 bg-green-100 rounded-xl shadow-xl mx-auto h-full p-8">
            {/* Header */}
            <div className="flex items-center justify-center bg-gray-100 rounded-md h-16 shadow-sm">
              <span className="font-bold text-lg text-gray-800">
                StudEase Logo
              </span>
            </div>

            {/* Title Section */}
            <div className="flex flex-col items-center justify-center mt-10">
              <h1 className="text-3xl font-bold text-gray-800 text-center">
                How do you want to use StudEase?
              </h1>
              <p className="mt-4 text-gray-600 text-center">
                Choose the best way to get started!
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-6 mt-12">
              <button
                className="py-4 px-6 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition   "
                onClick={() => nagivate("/student/login")}
              >
                Hire the Best Tutor for Your Kid
              </button>
              <button
                onClick={() => nagivate("/tutor/login")}
                className="  py-4 px-6 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition"
              >
                Login as Tutor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Visual or Branding */}
      <div className="w-1/3 bg-gradient-to-tl from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to StudEase</h2>
          <p className="text-gray-400 text-lg">
            Simplifying Education, One Step at a Time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
