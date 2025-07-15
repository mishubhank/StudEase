import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import StudentCard from "./StudentCard";
import image from "../assets/bke340rt.png";
import { MultiSelect } from "react-multi-select-component";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { FaUser } from "react-icons/fa";
import Pages from "./Pagination";
import { useParams, useSearchParams } from "react-router-dom";
interface Options {
  label: string;
  value: string;
}

interface Student {
  Area: string;
  std: number;
  onApply: () => Promise<void>;
  onDetails: () => void;
  postedON: Date;
  studentId: number;
  About: string;
  Sub: string;
  matches: Status[];
}

interface Status {
  tutorcon: boolean;
  studentcon: boolean;
  status: boolean;
}
const Area_label: Options[] = [
  { label: "Vijay Nagar", value: "Vijay Nagar" },
  { label: "Civil Lines", value: "Civil Lines" },
  { label: "Sadar", value: "Sadar" },
  { label: "Napier Town", value: "Napier Town" },
  { label: "Wright Town", value: "Wright Town" },
  { label: "Adhartal", value: "Adhartal" },
  { label: "Gorakhpur", value: "Gorakhpur" },
  { label: "Bhedaghat", value: "Bhedaghat" },
  { label: "Tilhari", value: "Tilhari" },
  { label: "Madan Mahal", value: "Madan Mahal" },
  { label: "Shakti Nagar", value: "Shakti Nagar" },
  { label: "Ranital", value: "Ranital" },
  { label: "Damoh Naka", value: "Damoh Naka" },
  { label: "Pachpedi", value: "Pachpedi" },
  { label: "Katanga", value: "Katanga" },
  { label: "Gwarighat", value: "Gwarighat" },
  { label: "Garha", value: "Garha" },
  { label: "Lalitpur Colony", value: "Lalitpur Colony" },
  { label: "South Civil Lines", value: "South Civil Lines" },
  { label: "Kachnar City", value: "Kachnar City" },
  { label: "Russell Chowk", value: "Russell Chowk" },
  { label: "Polipather", value: "Polipather" },
  { label: "Shastri Bridge", value: "Shastri Bridge" },
  { label: "Ganjipura", value: "Ganjipura" },
  { label: "Karmeta", value: "Karmeta" },
  { label: "Suhagi", value: "Suhagi" },
  { label: "Tripuri Chowk", value: "Tripuri Chowk" },
  { label: "Medical College Area", value: "Medical College Area" },
  { label: "Bargi Hills", value: "Bargi Hills" },
  { label: "Ranjhi", value: "Ranjhi" },
  { label: "Gol Bazaar", value: "Gol Bazaar" },
  { label: "Machhli Ghar", value: "Machhli Ghar" },
  { label: "Nagpur Road", value: "Nagpur Road" },
  { label: "Transport Nagar", value: "Transport Nagar" },
  { label: "Manegaon", value: "Manegaon" },
  { label: "Kachhpura", value: "Kachhpura" },
  { label: "Chhoti Omti", value: "Chhoti Omti" },
  { label: "Bada Omti", value: "Bada Omti" },
  { label: "Lakhera Bagh", value: "Lakhera Bagh" },
  { label: "Shahpura", value: "Shahpura" },
  { label: "Chhota Fuhara", value: "Chhota Fuhara" },
  { label: "Bada Fuhara", value: "Bada Fuhara" },
  { label: "Baldeo Bagh", value: "Baldeo Bagh" },
];

const subjects = [
  { label: "Physics", value: "Physics" },
  { label: "Chemistry", value: "Chemistry" },
  { label: "Maths", value: "Maths" },
  { label: "English", value: "English" },
  { label: "Biology", value: "Biology" },
  { label: "History", value: "History" },
  { label: "Geography", value: "Geography" },
  { label: "Computer Science", value: "Computer Science" },
  { label: "Economics", value: "Economics" },
  { label: "Political Science", value: "Political Science" },
  { label: "Psychology", value: "Psychology" },
  { label: "Sociology", value: "Sociology" },
  { label: "Philosophy", value: "Philosophy" },
  { label: "Art", value: "Art" },
  { label: "Music", value: "Music" },
  { label: "Physical Education", value: "Physical Education" },
  { label: "Environmental Science", value: "Environmental Science" },
  { label: "Business Studies", value: "Business Studies" },
  { label: "Accountancy", value: "Accountancy" },
  { label: "Statistics", value: "Statistics" },
  { label: "Law", value: "Law" },
  { label: "Astronomy", value: "Astronomy" },
  { label: "Literature", value: "Literature" },
  { label: "Engineering Graphics", value: "Engineering Graphics" },
];

const StudentList = () => {
  const [area, setArea] = useState<Options[]>([]);
  const [param] = useSearchParams();
  const [drawer, setDrawer] = useState(false);

  const page = param.get("page") || 1;

  const [sub, setSub] = useState<Options[]>([]);
  const [student, setStudenst] = useState<Student[]>([]);
  const [trigger, setTrigger] = useState(false); /// varaible to filter bases on
  const [filStuds, setFillStuds] = useState<Student[]>([]);
  const [location, setLocation] = useState<String[]>();

  const [status, setStatus] = useState<{ [key: number]: Status }>({});
  /// [stud, setStuds]=useState<student[]>([])
  const token = localStorage.getItem("jwt");

  const onFilter = () => {
    setTrigger(!trigger);
  };

  const filter = async () => {
    let values = area.map((obj) => obj.value);
    let locations = values;
    let subjects = sub.map((obj) => obj.value);
    let subjex = subjects;
    console.log("filter button clicked", subjex, locations);
    const result = await axios.post(
      "http://localhost:3000/api/auth/student/findstuds",
      {
        params: {
          location: locations,
          offerings: subjex,
        },
      },

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    const fetchStuds = async () => {
      console.log(student, "studentl;ist");
      try {
        const resp = await axios.get(
          `http://localhost:3000/api/listallStuds/all?page=${page}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Student data fetched");
        setStudenst(resp.data);

        // Initialize statuses for each studentId
        const newStatuses = resp.data.reduce((acc: any, student: Student) => {
          if (student.matches && student.matches.length > 0) {
            const matchData = student.matches[0]; // Use first match
            acc[student.studentId] = {
              tutorcon: matchData.tutorcon,
              studentcon: matchData.studentcon,
              status: matchData.status,
            };
          } else {
            // Default values if no matches exist
            acc[student.studentId] = {
              tutorcon: false,
              studentcon: false,
              status: false,
            };
          }
          return acc;
        }, {});

        setStatus((prev) => ({
          ...prev,
          ...newStatuses,
          status: "applied",
        }));
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStuds();
  }, []);

  useEffect(() => {
    if (trigger === false) return;

    console.log("filter use effect hook running");

    const filtered = location
      ? student.filter((stud) =>
          location.some((loc) => loc.toLowerCase() == stud.Area.toLowerCase())
        )
      : student;
    setStudenst(filtered);
    setTrigger(false);
  }, [location, subjects, trigger]);

  console.log("match status console");
  console.log(status);
  const cardRefs = useRef<any>([]);

  const Focus = (index: any) => {
    // Scroll to the specific card
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Optionally add a focus or highlight style
    const card = cardRefs.current[index];
    card.classList.add("ring-4", "ring-green-500");
    setTimeout(() => card.classList.remove("ring-4", "ring-green-500"), 2000);
    if (card) {
      card.classList.add("highlight");
      setTimeout(() => card.classList.remove("highlight"), 2000); // Remove after 2 seconds
    }
  };
  const sendApplication = async (id: Number): Promise<void> => {
    try {
      const sendMatch = await axios.post(
        "http://localhost:3000/api/tutor/interested",

        {
          studentId: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(sendMatch);
      sendMatch;
    } catch {
      console.log("failed clicking apply from frontend");
    }
  };
  console.log(student, "student list ");
  // const res = status[4];
  // console.log(res.tutorcon);
  // add logo
  // add paganiation
  // profile button

  return (
    <>
      <ProtectedRoute role="tutor">
        <div className="flex flex-row h-screen overflow-x-auto ">
          <div className="relative h-full bg-[#f9f9f9] border-r transition-all duration-300 w-full lg:w-72 ">
            <div className="flex flex-col min-h-screen">
              <div className="h-16 px-4 flex items-center justify-between border-b  ">
                {" "}
                <img
                  className=" mt-2 h-14 w-14 rounded-2xl"
                  src={image}
                  alt=""
                />
              </div>
              <div className=" flex-1 overflow-y-auto">
                <div className=" p-6 space-y-6">
                  <>
                    <div className=" flex justify-between  w-full">
                      <div className=" text-lg font-semibold"> Filter </div>
                      <button className=" text-pink-500 font-medium hover:underline">
                        Reset
                      </button>
                    </div>
                  </>
                  <div className=" ">
                    {" "}
                    Locations
                    <div className="flex flex-col space-y-2">
                      <div className="space-y-2 "></div>
                      <div className="space-y-2"></div>
                      <div className="space-y-2"></div>
                      <div className="space-y-2"></div>
                    </div>
                    <div className="w-60 bg-gray-100 p-4 shadow-md max-h-[400px] overflow-visible border-b-2 ">
                      <form className="space-y-4">
                        <label className="block">
                          <span className="text-gray-700">Search:</span>
                          {/* <input
                          type="text"
                          value={area}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Type a word..."
                        /> */}
                        </label>

                        {/* Suggestions */}

                        <MultiSelect
                          options={Area_label}
                          value={area}
                          onChange={setArea}
                          labelledBy="Select"
                        />
                      </form>
                    </div>
                  </div>
                  <div className=" flex  font-semibold ">Subjects</div>

                  <div className="space-y-2">
                    <div className="w-60 bg-gray-100 p-4 shadow-md max-h-[400px] overflow-visible border-b-2 ">
                      <form className="space-y-4">
                        <label className="block">
                          <span className="text-gray-700">Search:</span>
                          {/* <input
                          type="text"
                          value={offering}
                          onChange={() => {}}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Type a word..."
                        /> */}
                        </label>

                        {/* Suggestions */}
                        {sub.length > 0 && (
                          <div className="bg-white shadow-md rounded-md mt-2 max-h-40 overflow-y-auto">
                            {/* options={sub} */}
                            {/* {sub.map((suggestion, index) => (
                            <div
                              key={index}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => HandleSuggest2(suggestion)}
                            >
                              {suggestion}
                            </div>
                          ))} */}
                          </div>
                        )}
                        <MultiSelect
                          options={subjects}
                          value={sub}
                          onChange={setSub}
                          labelledBy="Select"
                        />
                        <button
                          type="submit"
                          onClick={(even) => {
                            even.preventDefault();
                            onFilter();
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Default
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col w-full  h-[120vh] bg-white">
            <div className=" flex flex-col  h-full">
              <div className="  w-full   flex flex-col items-center h-16 bg-primary border-b-2 border-black ">
                <div className=" h-full w-full px-4  flex flex-row space-x-4 justify-end items-center">
                  <div className="relative  px-4">
                    {!drawer && (
                      <FaUser
                        className="cursor-pointer"
                        onClick={() => setDrawer(!drawer)}
                      />
                    )}
                    {drawer && (
                      <div
                        className="absolute right-0 top-full mt-2 bg-white shadow-lg border z-50 px-4 py-4 flex flex-col"
                        onClick={() => setDrawer(false)}
                      >
                        <div className="border-b-2 w-7 underline"> Profile</div>{" "}
                        <div className="underline"> Logout</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-3 ">
              {student.map((student, index) => (
                <div ref={(el) => (cardRefs.current[index] = el)} key={index}>
                  <StudentCard
                    onApply={() => sendApplication(student.studentId)}
                    matches={{
                      tutorcon: status[student.studentId]?.tutorcon,
                      studentcon: status[student.studentId]?.studentcon,
                      status: status[student.studentId]?.status,
                    }}
                    key={index}
                    std={student.std}
                    PostedOn={student.postedON}
                    Area={student.Area}
                    onDetails={() => Focus(index)}
                    About={student.About}
                    Subject={"Chemistry"}
                    studentId={student.studentId}
                  />
                </div>
              ))}

              <div>5</div>
            </div>
            <Pages />
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default StudentList;
