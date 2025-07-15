import React, { FC, useState } from "react";
import { IoStar } from "react-icons/io5"; // Full star
import { FaStar, FaStarHalf } from "react-icons/fa"; // Half star and empty star
import axios from "axios";
import { jwtDecode } from "jwt-decode";
interface TutorProfile {
  image: string;
  reviews: number;
  offerings: string;
  rating: number; // Add rating to the profile
  subject: string;
  degree: string;
  tutorId: number;
  location: {
    name: string[];
  }[];
}

const renderRatings = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Create full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span
        key={`full-${i}`}
        className="flex items-center justify-center text-yellow-500"
      >
        <IoStar />
      </span>
    );
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(
      <span
        key="half"
        className="flex items-center justify-center text-yellow-500"
      >
        <FaStarHalf />
      </span>
    );
  }

  // Add empty stars if needed (Assuming 5 stars as max)
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span
        key={`empty-${i}`}
        className="flex items-center justify-center text-gray-300"
      >
        <FaStar />
      </span>
    );
  }

  return stars;
};

const TutorCard: FC<TutorProfile> = ({
  image,
  reviews,
  offerings,
  rating,
  subject,
  degree,
  location,
  tutorId,
}): JSX.Element => {
  const token: any = localStorage.getItem("jwt");
  // get tutordid from the backend
  const decode: any = jwtDecode(token as string);
  console.log(decode.role, "checking the role dfrom token");

  const [state, setState] = useState("contact");
  const SendMatch = async () => {
    try {
      const status = await axios.post(
        "http://localhost:3000/api/student/interested",

        {
          tutorId: tutorId,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setState("Applied");
      console.log("matche send", status.data);
    } catch {
      console.log("error in sending the match");
      return;
    }
  };

  return (
    <div className="bg-white border-2 border-black flex flex-col items-center h-80 w-64 rounded-2xl justify-center m-10 font-mono p-4">
      <img
        className=" object-cover w-full h-32 rounded-md mb-4"
        src={image}
        alt="Tutor"
      />
      <h3 className="text-lg font-semibold">{reviews} </h3>
      <h3 className="text-sm text-gray-700">{offerings}</h3>
      <div className="flex justify-normal items-center ">
        {renderRatings(rating)}
      </div>
      <div>{degree}</div>

      {location.length > 0 && (
        <div className="flex flex-crow items-center space-x-2">
          {location.map((item) => (
            <h2> {item.name}</h2>
          ))}{" "}
        </div>
      )}
      <button
        onClick={SendMatch}
        className=" flex items-center  w-full h-6  space-x-4 justify-center bg-orange-400 rounded-xl "
      >
        {state}
        <span>{subject}</span>
      </button>
    </div>
  );
};

export default TutorCard;
