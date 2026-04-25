import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { MultiSelect } from "react-multi-select-component";
import TutorCard from "./TutorCard";
import {
  PiStudentBold,
  PiSlidersHorizontalBold,
  PiMagnifyingGlassBold,
} from "react-icons/pi";
import { IoNotifications } from "react-icons/io5";
import NotifSideBar from "./notifSideBar";
import Pages from "./Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { SOCKET_URL, buildApiUrl } from "../lib/api";

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

const formattedArea = area.map((a) => ({ label: a, value: a }));
const formattedSubject = subjects.map((s) => ({ label: s, value: s }));

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

interface MatchStatus {
  tutorcon: boolean;
  studentcon: boolean;
  status: boolean;
}

const Dashboard = () => {
  const [ar, setArea] = useState<{ label: string; value: string }[]>([]);
  const [sub, setSub] = useState<{ label: string; value: string }[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [profStat, setProfilStat] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profileComplete, setProfileComplete] = useState(false);
  const [profilePromptOpen, setProfilePromptOpen] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const jwt_token = localStorage.getItem("jwt");
  const unreadNotifications = notifications.filter((notification) => !notification.isRead).length;

  useEffect(() => {
    if (!jwt_token) return;

    let userId: number;
    try {
      userId = jwtDecode<JwtPayload>(jwt_token).userId;
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
  }, [jwt_token]);

  useEffect(() => {
    if (!jwt_token) return;

    async function fetchProfileStatus() {
      try {
        const res = await axios.get(
          buildApiUrl("/api/user/profile-status"),
          {
            headers: { Authorization: `Bearer ${jwt_token}` },
          },
        );
        const isComplete = Boolean(res.data.profilesattus);
        setProfileComplete(isComplete);
        setProfilePromptOpen(!isComplete);
      } catch (error) {
        console.error("Error fetching profile status");
      }
    }

    fetchProfileStatus();
  }, [jwt_token]);

  useEffect(() => {
    if (!jwt_token) return;

    async function fetchNotifications() {
      try {
        const res = await axios.get(buildApiUrl("/api/notifications"), {
          headers: { Authorization: `Bearer ${jwt_token}` },
        });
        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications");
      }
    }

    fetchNotifications();
  }, [jwt_token]);

  useEffect(() => {
    if (!jwt_token || filtersActive) return;

    async function fetchTutor() {
      try {
        const res = await axios.get(
          buildApiUrl(`/api/tutor/listall?page=${page}`),
          {
            headers: { Authorization: `Bearer ${jwt_token}` },
          },
        );
        if (Array.isArray(res.data.allTutor)) setList(res.data.allTutor);
        setHasNextPage(Boolean(res.data.hasNext));
      } catch (e) {
        console.error("Error fetching tutors");
      }
    }
    fetchTutor();
  }, [filtersActive, jwt_token, page]);

  const sumbitForm = async (e:any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        buildApiUrl("/api/auth/tutor/findtutor"),
        {
          locations: ar.map((x) => x.value),
          offering: sub.map((x) => x.value),
        },
        {
          headers: { authorization: `Bearer ${jwt_token}` },
        },
      );
      setList(res.data);
      setFiltersActive(true);
      setHasNextPage(false);
    } catch (e) {
      console.error("Filter error");
    }
  };

  const changePage = (nextPage: number) => {
    navigate(`/student/dashboard?page=${nextPage}`);
  };

  const clearFilters = () => {
    setArea([]);
    setSub([]);
    setFiltersActive(false);
    navigate("/student/dashboard?page=1");
  };

  const toggleNotifications = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (!nextOpen || unreadNotifications === 0 || !jwt_token) return;

    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );

    try {
      await axios.patch(
        buildApiUrl("/api/notifications/read"),
        {},
        {
          headers: { Authorization: `Bearer ${jwt_token}` },
        },
      );
    } catch (error) {
      console.error("Error marking notifications as read");
    }
  };

  return (
    <ProtectedRoute role="student">
      <div className="min-h-screen bg-[#020617] text-slate-200">
        {profilePromptOpen && (
          <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-950 border border-indigo-500/30 rounded-lg p-6 shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">
                Finish setup
              </p>
              <h2 className="text-2xl font-bold text-white mt-2">
                Complete your student profile first
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-6">
                Add your class, subjects, area, and requirement before sending a tuition request. Tutors need this before they can respond properly.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => navigate("/student/post")}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors"
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

        {/* NAV */}
        <header className="h-20 border-b border-slate-800/50 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              S
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              StudEase
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleNotifications}
              className="relative p-2 hover:bg-slate-800 rounded-lg transition-all"
            >
              <IoNotifications size={24} className="text-slate-400" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-emerald-500 text-[10px] leading-4 text-white font-bold">
                  {unreadNotifications}
                </span>
              )}
            </button>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setProfilStat(!profStat)}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <PiStudentBold className="text-indigo-400" size={20} />
              </div>
              <span className="hidden md:block text-sm font-medium">
                Student Portal
              </span>
            </div>
          </div>
        </header>

        <div className="flex max-w-7xl mx-auto px-4 py-8 gap-8">
          {/* SIDEBAR FILTERS */}
          <aside className="w-1/4 hidden lg:block">
            <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-3xl sticky top-28 shadow-xl">
              <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-4">
                <PiSlidersHorizontalBold className="text-indigo-400" />
                <h2 className="font-bold text-white">Refine Search</h2>
              </div>

              <form onSubmit={sumbitForm} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Jabalpur Areas
                  </label>
                  <MultiSelect
                    options={formattedArea}
                    value={ar}
                    onChange={setArea}
                    labelledBy="Select Area"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Subject
                  </label>
                  <MultiSelect
                    options={formattedSubject}
                    value={sub}
                    onChange={setSub}
                    labelledBy="Select Subject"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-2"
                >
                  <PiMagnifyingGlassBold /> Find Tutors
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
            </div>
          </aside>

          {/* MAIN LIST */}
          <main className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {list.length > 0 ? (
                list.map((item) => (
                  <TutorCard
                    key={item.id}
                    tutorId={item.userId}
                    canApply={profileComplete}
                    onRequireProfile={() => setProfilePromptOpen(true)}
                    matches={(item.matches?.[0] as MatchStatus) || undefined}
                    image={item.photo}
                    offerings={item.specilization}
                    reviews={0}
                    rating={2}
                    subject=""
                    degree={item.degree}
                    location={item.location}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-slate-500">
                  No tutors found matching those criteria.
                </div>
              )}
            </div>
            {!filtersActive && (
              <div className="mt-12 py-10 border-t border-slate-800/50 flex justify-center">
                <Pages
                  page={page}
                  hasNext={hasNextPage}
                  onPageChange={changePage}
                />
              </div>
            )}
          </main>
        </div>

        <NotifSideBar notis={notifications} open={open} />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
