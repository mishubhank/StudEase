import { type FC, useState } from "react";
import { IoStar } from "react-icons/io5";
import { FaStar, FaStarHalf } from "react-icons/fa";
import {
  PiMapPinFill,
  PiCertificateFill,
  PiPaperPlaneTiltFill,
  PiConfettiFill,
} from "react-icons/pi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../lib/api";

interface TutorProfile {
  image: string;
  reviews: number;
  offerings: string;
  rating: number;
  subject: string;
  degree: string;
  tutorId: number;
  canApply?: boolean;
  onRequireProfile?: () => void;
  matches?: {
    tutorcon: boolean;
    studentcon: boolean;
    status: boolean;
  };
  location: {
    name: string[];
  }[];
}

const renderRatings = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<IoStar key={i} className="text-amber-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalf key={i} className="text-amber-400" />);
    } else {
      stars.push(<FaStar key={i} className="text-slate-700" />);
    }
  }
  return stars;
};

const TutorCard: FC<TutorProfile> = ({
  image,
  reviews,
  offerings,
  rating,
  degree,
  location,
  tutorId,
  canApply = true,
  onRequireProfile,
  matches,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [state, setState] = useState(
    matches?.status ? "Matched" : matches?.studentcon ? "Applied" : "Connect",
  );
  const [isHovered, setIsHovered] = useState(false);
  const isMatched = Boolean(matches?.status || state === "Matched");

  const SendMatch = async () => {
    if (!canApply) {
      onRequireProfile?.();
      return;
    }

    setState("Sending...");
    try {
      await axios.post(
        buildApiUrl("/api/student/interested"),
        { tutorId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setState(matches?.tutorcon ? "Matched" : "Applied");
    } catch (err) {
      console.error("Match error", err);
      setState("Connect");
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[2rem] blur opacity-10 group-hover:opacity-30 transition duration-500"></div>

      <div className="relative bg-[#0f172a] border border-slate-800 p-5 rounded-[2rem] flex flex-col h-full w-72 transition-all duration-300 group-hover:border-indigo-500/50 shadow-xl">
        {/* Tutor Image Wrapper */}
        <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
          <img
            className={`object-cover w-full h-full transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            src={image || "https://via.placeholder.com/150"}
            alt="Tutor"
          />
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
            <IoStar className="text-amber-400 text-xs" />
            <span className="text-[10px] font-bold text-white">
              {rating || 5.0}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              {offerings || "Expert Tutor"}
            </span>
            <h3 className="text-lg font-bold text-white truncate">
              Prof. {degree}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <PiCertificateFill className="text-indigo-500" />
            <span className="truncate">{degree} Specialist</span>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[24px]">
            {location.slice(0, 2).map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-[10px] bg-slate-800/50 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700"
              >
                <PiMapPinFill className="text-indigo-500" size={10} />{" "}
                {item.name}
              </span>
            ))}
          </div>

          {/* Rating Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div className="flex gap-0.5">{renderRatings(rating || 5)}</div>
            <span className="text-[10px] text-slate-500 font-medium">
              {reviews} Reviews
            </span>
          </div>

          {/* Action Button */}
          {isMatched ? (
            <button
              onClick={() => navigate(`/contact?tutorId=${tutorId}`)}
              className="w-full py-3.5 mt-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 bg-emerald-600/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600 hover:text-white"
            >
              <PiConfettiFill size={16} />
              View Contact
            </button>
          ) : (
            <button
              onClick={SendMatch}
              disabled={state === "Applied"}
              className={`w-full py-3.5 mt-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg ${
                state === "Applied"
                  ? "bg-slate-800 text-slate-500 border border-slate-700"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
              }`}
            >
              {state === "Connect" && <PiPaperPlaneTiltFill size={16} />}
              {state}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
