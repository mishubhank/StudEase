import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import StudentCard from "./StudentCard";
import { MultiSelect } from "react-multi-select-component";
import ProtectedRoute from "./Auth/ProtectedRoute";
import NotifSideBar from "./notifSideBar";
import {
  PiUserCircleFill,
  PiSlidersHorizontalBold,
  PiMagnifyingGlassBold,
  PiArrowCounterClockwiseBold,
} from "react-icons/pi";
import { IoNotifications } from "react-icons/io5";
import Pages from "./Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SOCKET_URL, buildApiUrl } from "../lib/api";
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
interface Options {
  label: string; // What the user sees in the dropdown
  value: string; // The actual data sent to the backend
}
interface Student {
  studentId: number;
  std: number; // Class/Grade (e.g., 10th, 12th)
  Area: string; // Neighborhood in Jabalpur
  Sub: string; // Subject needed
  message?: string;
  subject?: {
    subject: string;
  }[];
  About?: string; // Kept optional for older responses.
  postedON: Date; // Date of the post
  matches: Status[]; // Array of match statuses from backend
}

interface Status {
  tutorcon: boolean;
  studentcon: boolean;
  status: boolean;
}

interface Notification {
  id: number;
  message?: string;
  content?: string;
  createdAt?: string;
  isRead?: boolean;
  type?: string;
}

interface JwtPayload {
  userId: number;
}

// ... (Keep your Area_label and subjects arrays here)

const StudentList = () => {
  const [area, setArea] = useState<Options[]>([]);
  const [sub, setSub] = useState<Options[]>([]);
  const [student, setStudents] = useState<Student[]>([]);
  const [status, setStatus] = useState<{ [key: number]: Status }>({});
  const [drawer, setDrawer] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profileComplete, setProfileComplete] = useState(false);
  const [profilePromptOpen, setProfilePromptOpen] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);

  const navigate = useNavigate();
  const [param] = useSearchParams();
  const page = Number(param.get("page") || 1);
  const token = localStorage.getItem("jwt");
  const cardRefs = useRef<any>([]);
  const unreadNotifications = notifications.filter((notification) => !notification.isRead).length;

  useEffect(() => {
    if (!token) return;

    let userId: number;
    try {
      userId = jwtDecode<JwtPayload>(token).userId;
    } catch (error) {
      console.error("Failed to decode token for notifications", error);
      return;
    }

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.emit("join", userId.toString());
    });

    socket.on("notification", (notification: Notification) => {
      setNotifications((prev) => [
        {
          ...notification,
          id: notification.id || Date.now(),
          content: notification.content || notification.message,
          isRead: false,
        },
        ...prev,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchProfileStatus = async () => {
      try {
        const resp = await axios.get(
          buildApiUrl("/api/user/profile-status"),
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const isComplete = Boolean(resp.data.profilesattus);
        setProfileComplete(isComplete);
        setProfilePromptOpen(!isComplete);
      } catch (error) {
        console.error("Failed to fetch profile status:", error);
      }
    };

    fetchProfileStatus();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchNotifications = async () => {
      try {
        const resp = await axios.get(buildApiUrl("/api/notifications"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(resp.data.notifications || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [token]);

  // 1. Fetching Logic
  useEffect(() => {
    const fetchStuds = async () => {
      if (filtersActive) return;

      try {
        const resp = await axios.get(
          buildApiUrl(`/api/listallStuds/all?page=${page}`),
          {
            headers: { authorization: `Bearer ${token}` },
          },
        );
        const students = resp.data.students || [];
        setStudents(students);
        setHasNextPage(Boolean(resp.data.hasNext));

        const newStatuses = students.reduce((acc: any, stud: Student) => {
          const matchData = stud.matches?.[0] || {
            tutorcon: false,
            studentcon: false,
            status: false,
          };
          acc[stud.studentId] = matchData;
          return acc;
        }, {});
        setStatus(newStatuses);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };
    fetchStuds();
  }, [filtersActive, page, token]);

  // 2. Filter Logic (Backend)
  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        buildApiUrl("/api/auth/student/findstuds"),
        {
          location: area.map((a) => a.value),
          offerings: sub.map((s) => s.value),
        },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      setStudents(result.data);
      setFiltersActive(true);
      setHasNextPage(false);
      const newStatuses = result.data.reduce((acc: any, stud: Student) => {
        const matchData = stud.matches?.[0] || {
          tutorcon: false,
          studentcon: false,
          status: false,
        };
        acc[stud.studentId] = matchData;
        return acc;
      }, {});
      setStatus(newStatuses);
    } catch (err) {
      console.log("Filter failed");
    }
  };

  const sendApplication = async (id: number) => {
    if (!profileComplete) {
      setProfilePromptOpen(true);
      return;
    }

    try {
      await axios.post(
        buildApiUrl("/api/tutor/interested"),
        { studentId: id },
        { headers: { authorization: `Bearer ${token}` } },
      );
      // Update local status to reflect applied
      setStatus((prev) => ({ ...prev, [id]: { ...prev[id], tutorcon: true } }));
    } catch (err) {
      console.error("Apply failed");
    }
  };

  const toggleNotifications = async () => {
    const nextOpen = !notificationsOpen;
    setNotificationsOpen(nextOpen);

    if (!nextOpen || unreadNotifications === 0 || !token) return;

    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );

    try {
      await axios.patch(
        buildApiUrl("/api/notifications/read"),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  const changePage = (nextPage: number) => {
    navigate(`/tutor/dashboard?page=${nextPage}`);
  };

  const clearFilters = () => {
    setArea([]);
    setSub([]);
    setFiltersActive(false);
    navigate("/tutor/dashboard?page=1");
  };

  return (
    <ProtectedRoute role="tutor">
      <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col lg:flex-row">
        {profilePromptOpen && (
          <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-950 border border-emerald-500/30 rounded-lg p-6 shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">
                Finish setup
              </p>
              <h2 className="text-2xl font-bold text-white mt-2">
                Complete your tutor profile first
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-6">
                Add your teaching areas, subjects, degree, and profile photo before applying to student requirements.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => navigate("/tutor/post")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Complete Profile
                </button>
                <button
                  onClick={() => setProfilePromptOpen(false)}
                  className="px-4 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-900 transition-colors"
                >
                  Browse only
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LEFT SIDEBAR - FILTERS */}
        <aside className="w-full lg:w-80 bg-[#0f172a]/50 border-r border-slate-800 p-8 sticky top-0 h-screen overflow-y-auto z-40">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
              S
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              StudEase{" "}
              <span className="text-[10px] text-emerald-500 block -mt-1 uppercase tracking-widest">
                Tutor Pro
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center gap-2 font-bold text-slate-100">
              <PiSlidersHorizontalBold className="text-emerald-400" /> Filters
            </h3>
            <button
              onClick={clearFilters}
              className="text-[10px] font-bold text-slate-500 uppercase hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <PiArrowCounterClockwiseBold /> Reset
            </button>
          </div>

          <form onSubmit={handleFilter} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Preferred Areas
              </label>
              <MultiSelect
                options={Area_label}
                value={area}
                onChange={setArea}
                labelledBy="Select Area"
                className="rmsc"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Subjects
              </label>
              <MultiSelect
                options={subjects}
                value={sub}
                onChange={setSub}
                labelledBy="Select Subject"
                className="rmsc"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/10 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <PiMagnifyingGlassBold size={18} /> Apply Filters
            </button>
            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="w-full border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold py-3 rounded-xl transition-all"
              >
                Clear Filters
              </button>
            )}
          </form>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* TOP NAV */}
          <header className="h-20 border-b border-slate-800/50 px-8 flex items-center justify-between bg-[#020617]/80 backdrop-blur-md sticky top-0 z-30">
            <h2 className="font-bold text-slate-400">
              Student Requirements{" "}
              <span className="text-white ml-2">({student.length})</span>
            </h2>

            <div className="flex items-center gap-6">
              <button
                onClick={toggleNotifications}
                className="relative p-2 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <IoNotifications size={22} className="text-slate-400" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-emerald-500 text-[10px] leading-4 text-white font-bold">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setDrawer(!drawer)}
                  className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <PiUserCircleFill size={28} />
                </button>
                {drawer && (
                  <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
                    <button className="w-full text-left px-4 py-2 hover:bg-slate-800 rounded-lg text-sm transition-colors">
                      My Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-red-500/10 text-red-400 rounded-lg text-sm transition-colors">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
          <NotifSideBar notis={notifications} open={notificationsOpen} />

          {/* STUDENT GRID */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {student.map((stud, index) => (
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  key={stud.studentId}
                  className="transition-all duration-500"
                >
                  <StudentCard
                    onApply={() => sendApplication(stud.studentId)}
                    matches={{
                      tutorcon: status[stud.studentId]?.tutorcon,
                      studentcon: status[stud.studentId]?.studentcon,
                      status: status[stud.studentId]?.status,
                    }}
                    std={stud.std}
                    PostedOn={stud.postedON}
                    Area={stud.Area}
                    onDetails={() => {
                      cardRefs.current[index]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    About={stud.message || ""}
                    Subject={stud.subject?.[0]?.subject || stud.Sub}
                    studentId={stud.studentId}
                  />
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-12 py-10 border-t border-slate-800/50 flex justify-center">
              {!filtersActive && (
                <Pages
                  page={page}
                  hasNext={hasNextPage}
                  onPageChange={changePage}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default StudentList;
