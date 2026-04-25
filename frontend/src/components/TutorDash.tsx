// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// interface lox {
//   name: string;
// }

// const TutorDash = () => {
//   const [img, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [lox, setLox] = useState<lox[]>([]);
//   const [rating, setRating] = useState(null);
//   const [enq, setEnq] = useState("");
//   const token = localStorage.getItem("jwt");
//   useEffect(() => {
//     const socket = io("http://localhost:3000", {
//       transports: ["websocket"], // force WebSocket for testing
//     });

//     socket.on("connect", () => {
//       console.log("✅ Connected to server with id:", socket.id);
//     });

//     socket.on("welcome", (data) => {
//       console.log("👋 Server says:", data.message);
//       alert("Server says: " + data.message);
//     });

//     socket.on("connect_error", (err) => {
//       console.error("❌ Connection error:", err.message);
//     });
//     socket.on("notification", (data) => {
//       console.log(data.message, "you have a new notification");
//     });

//     const FetchProfile = async () => {
//       console.log("fdfd");
//       try {
//         const profile = await axios.get(
//           "http://localhost:3000/api/auth/tutor/tutprofile",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         //console.log(profile.data[0].user.name);
//         //
//         setImage(profile.data[0].photo);
//         //
//         setLox(profile.data[0].location);
//         setName(profile.data[0].user.name);
//         setRating(profile.data.rating);
//         // console.log(profile.data[0].location)
//       } catch {
//         return { message: "error ffetching tutor profile" };
//       }
//     };
//     FetchProfile();
//   }, []);
//   console.log(lox.length, "len");
//   lox.forEach((e) => console.log(e.name));

//   return (
//     <>
//       <div className="bg-slate-300 flex  items-center justify-center h-screen  flex-3 ">
//         <div className="   w-2/3 bg-red-100 flex"> </div>
//         <div className=" flex-1 rounded-full bg-red-400 min-h-[60px] max-w-[80px]">
//           {" "}
//           hhidsssssssssssssssssssss
//           {/* <img className=' hide-none'  src={img}/> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TutorDash;
