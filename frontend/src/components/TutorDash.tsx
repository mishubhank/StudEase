import axios from "axios";
import React, { useEffect, useState } from "react";

interface lox {
  name: string;
}

const TutorDash = () => {
  const [img, setImage] = useState("");
  const [name, setName] = useState("");
  const [lox, setLox] = useState<lox[]>([]);
  const [rating, setRating] = useState(null);
  const [enq, setEnq] = useState("");
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    const FetchProfile = async () => {
      console.log("fdfd");
      try {
        const profile = await axios.get(
          "http://localhost:3000/api/auth/tutor/tutprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //console.log(profile.data[0].user.name);
        //
        setImage(profile.data[0].photo);
        //
        setLox(profile.data[0].location);
        setName(profile.data[0].user.name);
        setRating(profile.data.rating);
        // console.log(profile.data[0].location)
      } catch {
        return { message: "error ffetching tutor profile" };
      }
    };
    FetchProfile();
  }, []);
  console.log(lox.length, "len");
  lox.forEach((e) => console.log(e.name));

  return (
    <>
      <div className="bg-slate-300 flex  items-center justify-center h-screen  flex-3 ">
        <div className="   w-2/3 bg-red-100 flex"> </div>
        <div className=" flex-1 rounded-full bg-red-400 min-h-[60px] max-w-[80px]">
          {" "}
          hhidsssssssssssssssssssss
          {/* <img className=' hide-none'  src={img}/> */}
        </div>
      </div>
    </>
  );
};

export default TutorDash;
