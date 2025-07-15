import axios from "axios";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
//import Sidebar from "./Sidebar";
import TutorCard from "./TutorCard";
import { PiStudentBold } from "react-icons/pi";
import { IoNotifications } from "react-icons/io5";
import NotifSideBar from "./notifSideBar";

import { useNavigate, useSearchParams } from "react-router-dom";
import ProtectedRoute from "./Auth/ProtectedRoute";
//import NotificationBadge from "react-notification-badge";
//import  Effect  from "react-notification-badge";

const tempNotifications = [
  { id: 1, message: "You have a notification from Roges" },
  { id: 2, message: "Your order is ready for pickup" },
  { id: 3, message: "New message from John Doe" },
  { id: 4, message: "Reminder: Meeting at 3 PM" },
];

interface Tutor {
  id: number;
  userId: number;
  edu: string;
  lat: number | null;
  long: number | null;
  specilization: string;
  location: {
    name: string[];
  }[];
  degree: string;
  active: boolean;
  offering: {
    grade: string;
    subject: string;
  };
  ratings: number;
  photo: string;
}
interface Options {
  label: string;
  value: string;
}

const Dashboard = () => {
  const [ar, setArea] = useState<Options[]>([]);
  const [sub, setSub] = useState<Options[]>([]);

  ///const [offering, setOffering] = useState<string[]>([]);

  const formattedArea: Options[] = area.map((option) => ({
    label: option,
    value: option,
  }));
  const formattedSubject: Options[] = subjects.map((option) => ({
    label: option,
    value: option,
  }));

  console.log("updated array", ar);

  const jwt_token = localStorage.getItem("jwt");
  const completetProfile = async () => {
    console.log("completer profile clicked");
    navigate("../student/post");
  };

  const navigate = useNavigate();
  const [list, setList] = useState<Tutor[]>([]);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  useEffect(() => {
    console.log();
    async function fetchTutor() {
      console.log("Fetching tutors...");
      try {
        const res = await axios.get<{ allTutor: Tutor[] }>(
          `http://localhost:3000/api/tutor/listall?page=${page}`
        );
        if (Array.isArray(res.data.allTutor)) {
          setList(res.data.allTutor); // Ensure the response is an array
          console.log("Fetched data:", res.data);
        }
      } catch (e) {
        return "error fetching tutor list";
      }
    }

    fetchTutor();
  }, [page]);

  function setPage(val: number) {
    navigate(`.?page=${val}`);
  }

  const sumbitForm = async (e: any) => {
    console.log("inside the submit from ", ar);
    e.preventDefault();
    try {
      const details = await axios.post(
        "http://localhost:3000/api/auth/",

        {
          locations: ar || "",
          offering: sub || "",
        },
        {
          headers: {
            authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      console.log("client data", ar, sub);
      console.log("the details are", details.data);
      setList(details.data);
    } catch {
      console.log("error fething filtered tuttors");
      return;
    }
  };

  const toggle = (e: any) => {
    e.preventDefault();
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);
  const [profStat, setProfilStat] = useState(false);

  return (
    <div>
      <ProtectedRoute role="student">
        <div className="h-16 bg-slate-50 flex flex-row items-center border-b border-black">
          <div className="flex items-center justify-center border-y h-full w-1/5 border-black bg-green-100">
            StuEase Logo
          </div>
          <div className="w-4/5 flex">
            <div className="w-2/3 flex space-x-11"></div>
            {/* <div>
          <NotificationBadge count={5} effect={Effect.SCALE} />
        </div> */}
            <div className="w-1/3 flex justify-end mr-6 space-x-6 cursor-pointer">
              {profStat && (
                <div className="flex flex-col z-auto border-1">
                  <div onClick={completetProfile}>complete profile</div>
                </div>
              )}
              <div
                className="flex items-center "
                onClick={() => setProfilStat(!profStat)}
              >
                <PiStudentBold />
                Profile
              </div>
              <button
                // onClick={(e) => e.preventDefault()}
                onClick={(e) => toggle(e)}
                className="relative flex items-center"
              >
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full mr-4 mt-3">
                  {tempNotifications.length}
                </div>
                <NotifSideBar notis={tempNotifications} open={open} />
                <IoNotifications size={22} />
              </button>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sumbitForm(e);
          }}
        >
          {/* <div className="w-full"></div> */}
          <div className="flex flex-5">
            {/* <div className="flex flex-col">
        <div className="h-16 w-screen bg-pink-200">header</div>
      </div> */}

            <div className="bg-blue-100 min-h-[150vh] w-1/5 border-r border-b">
              <div className="flex flex-col items-center mt-20 space-x-5 space-y-10">
                <span className="font-bold text-2xl m-4">Filters</span>

                <div className="font-semibold">
                  <div className=" flex flex-col space-y-20 ">
                    <MultiSelect
                      className="w-48"
                      options={formattedArea}
                      value={ar}
                      onChange={setArea}
                      labelledBy="Select"
                    />{" "}
                    Locations
                    <MultiSelect
                      className="w-48"
                      options={formattedSubject}
                      value={sub}
                      onChange={setSub}
                      labelledBy="Select"
                    />
                    Subjects
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className=" flex flex-col w-4/5 ">
              <div className="  grid grid-cols-3  gap-y-0 min-h-[100vh]  w-full">
                {/* { <IoStar />} */}
                {list.map((item, index) => (
                  <TutorCard
                    tutorId={item.userId}
                    // Ensure you provide a unique key
                    image={item.photo}
                    offerings={item.specilization}
                    reviews={0}
                    rating={2}
                    subject={""}
                    degree={item.degree}
                    location={item.location}
                  />
                ))}
              </div>
              <div className="flex h-8 items-center   justify-center space-x-5">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(1);
                  }}
                  className="border-b-2"
                >
                  1
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(2);
                  }}
                  className="border-b-2"
                >
                  2
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(3);
                  }}
                  className="border-b-2"
                >
                  3
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(4);
                  }}
                  className="border-b-2"
                >
                  4
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(5);
                  }}
                  className="border-b-2"
                >
                  5
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(6);
                  }}
                  className="border-b-2"
                >
                  6
                </button>
                <button onClick={() => setPage(6)} className="border-b-2">
                  +
                </button>
              </div>
            </div>
          </div>
        </form>
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard;

// const fs = require('fs')

const area = [
  "Vijay Nagar",
  "Civil Lines",
  "Sadar",
  "Napier Town",
  "Wright Town",
  "Adhartal",
  "Gorakhpur",
  "Bhedaghat",
  "Tilhari",
  "Madan Mahal",
  "Shakti Nagar",
  "Ranital",
  "Damoh Naka",
  "Pachpedi",
  "Katanga",
  "Gwarighat",
  "Garha",
  "Lalitpur Colony",
  "South Civil Lines",
  "Kachnar City",
  "Russell Chowk",
  "Polipather",
  "Shastri Bridge",
  "Ganjipura",
  "Karmeta",
  "Suhagi",
  "Tripuri Chowk",
  "Medical College Area",
  "Bargi Hills",
  "Ranjhi",
  "Gol Bazaar",
  "Machhli Ghar",
  "Nagpur Road",
  "Transport Nagar",
  "Manegaon",
  "Kachhpura",
  "Chhoti Omti",
  "Bada Omti",
  "Lakhera Bagh",
  "Shahpura",
  "Chhota Fuhara",
  "Bada Fuhara",
  "Baldeo Bagh",
];

const subjects = [
  "Physics",
  "Chemistry",
  "Maths",
  "English",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
  "Economics",
  "Political Science",
  "Psychology",
  "Sociology",
  "Philosophy",
  "Art",
  "Music",
  "Physical Education",
  "Environmental Science",
  "Business Studies",
  "Accountancy",
  "Statistics",
  "Law",
  "Astronomy",
  "Literature",
  "Engineering Graphics",
];
