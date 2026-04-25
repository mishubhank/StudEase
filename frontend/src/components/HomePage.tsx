import { useNavigate } from "react-router-dom";
import { GraduationCap, Briefcase, ArrowRight, Sparkles } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-indigo-500/30 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Navigation / Logo */}
      <nav className="absolute top-8 left-0 w-full px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            StudEase
          </span>
        </div>
        <div className="hidden md:block text-sm text-slate-500 font-medium">
          Professional Tutoring • Reimagined
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 pt-20">
        {/* Left: Headline Section (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Next-Gen Learning
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Master{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
              any
            </span>{" "}
            skill.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            The bridge between ambitious students and world-class educators.
            Simple, powerful, and effective.
          </p>
        </div>

        {/* Right: Interactive Bento Cards (7 columns) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Student Path */}
          <button
            onClick={() => navigate("/student/login")}
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <GraduationCap size={120} />
            </div>

            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                I'm a Student
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Unlock your potential with tutors who specialize in your
                curriculum.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-indigo-400 font-bold group-hover:gap-4 transition-all uppercase text-[10px] tracking-[0.2em]">
              Enter Platform <ArrowRight size={14} />
            </div>
          </button>

          {/* Card 2: Tutor Path */}
          <button
            onClick={() => navigate("/tutor/login")}
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all duration-500 text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Briefcase size={120} />
            </div>

            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                I'm a Tutor
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Build your brand, manage sessions, and grow your income
                effortlessly.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-emerald-400 font-bold group-hover:gap-4 transition-all uppercase text-[10px] tracking-[0.2em]">
              Start Teaching <ArrowRight size={14} />
            </div>
          </button>

          {/* Card 3: Feature Highlight (Full Width) */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-gradient-to-r from-slate-900/80 to-slate-800/20 border border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">
              Joining{" "}
              <span className="text-slate-300 font-semibold">StudEase</span>{" "}
              takes less than 2 minutes. No credit card required to browse.
            </p>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-[#030712] bg-slate-800"
                />
              ))}
              <div className="h-8 w-8 rounded-full border-2 border-[#030712] bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
                +1k
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
    </div>
  );
};

export default HomePage;
