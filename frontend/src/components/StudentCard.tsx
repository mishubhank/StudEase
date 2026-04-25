import { type FC } from "react";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import {
  PiStudent,
  PiConfettiFill,
  PiBookOpenTextBold,
  PiArrowRightBold,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface studentProps {
  std: number;
  Area: string;
  PostedOn: Date;
  About: string;
  Subject: string;
  studentId: number;
  matches: {
    tutorcon: boolean;
    studentcon: boolean;
    status: boolean;
  };
  onDetails: () => void;
  onApply: () => void;
}

const StudentCard: FC<studentProps> = ({
  std,
  Area,
  PostedOn,
  About,
  matches,
  Subject,
  studentId,
  onApply,
  onDetails,
}) => {
  const navigate = useNavigate();

  // Helper for dynamic status button
  const getStatusConfig = () => {
    if (matches.status)
      return {
        text: "Matched",
        styles: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      };
    if (matches.tutorcon && !matches.studentcon)
      return {
        text: "Applied",
        styles: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      };
    if (matches.studentcon && !matches.tutorcon)
      return {
        text: "Respond",
        styles: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      };
    return {
      text: "Apply Now",
      styles:
        "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20",
    };
  };

  const config = getStatusConfig();
  const dateStr = new Date(PostedOn).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="relative group">
      {/* Subtle Glow on Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

      <div className="relative h-full w-full bg-[#0f172a] border border-slate-800 p-6 rounded-3xl flex flex-col hover:border-slate-700 transition-all duration-300 shadow-2xl">
        {/* Header: Grade & Subject */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <PiBookOpenTextBold size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {Subject || "General"}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Grade {std}th
            </h3>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-xl text-slate-400">
            <PiStudent size={24} />
          </div>
        </div>

        {/* Details: Location & Date */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/50 rounded-full border border-slate-800 text-xs text-slate-400 font-medium">
            <CiLocationOn className="text-emerald-500" />
            {Area}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/50 rounded-full border border-slate-800 text-xs text-slate-400 font-medium">
            <CiCalendarDate className="text-indigo-400" />
            {dateStr}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
          {About ||
            "The student is looking for a dedicated tutor to help with core concepts and exam preparation. High commitment required."}
        </p>

        {/* Actions */}
        <div className="mt-auto space-y-3">
          <div className="flex gap-2">
            <button
              onClick={onDetails}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
            >
              View Details
            </button>
            <button
              onClick={onApply}
              disabled={matches.tutorcon || matches.status}
              className={`flex-[1.5] px-4 py-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${config.styles}`}
            >
              {config.text}
              {!matches.tutorcon && <PiArrowRightBold />}
            </button>
          </div>

          {/* Contact Section - Only visible when matched */}
          <div
            className={`overflow-hidden transition-all duration-500 ${matches.status ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <button
              onClick={() => navigate(`/contact?studentId=${studentId}`)}
              className="w-full py-3 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-inner"
            >
              <PiConfettiFill size={16} />
              Unlock Contact Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
