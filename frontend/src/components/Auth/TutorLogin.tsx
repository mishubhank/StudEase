import axios from "axios";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, Briefcase, Loader2 } from "lucide-react";
import { buildApiUrl } from "../../lib/api";

const TutorLogin = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const tutorLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        buildApiUrl("/api/auth/tutor/signin"),
        { email: mail, password: pass },
      );
      localStorage.setItem("jwt", response.data.jwt);
      navigate("../tutor/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full" />

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      {/* Login Card */}
      <div className="relative w-full max-w-[450px]">
        {/* Glow behind the card */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent blur-2xl -z-10 opacity-50" />

        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Briefcase size={28} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Tutor Portal
            </h1>
            <p className="text-slate-500 text-sm mt-2">Welcome back, mentor.</p>
          </div>

          {/* Form */}
          <form onSubmit={tutorLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors"
                  size={18}
                />
                <input
                  required
                  type="email"
                  placeholder="name@university.edu"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[10px] text-emerald-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors"
                  size={18}
                />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm">
              New to the platform?{" "}
              <button
                onClick={() => navigate("/tutor/signup")}
                className="text-white font-semibold hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
              >
                Apply to teach
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Copyright */}
      <p className="absolute bottom-8 text-slate-600 text-[10px] uppercase tracking-[0.2em]">
        © 2026 StudEase Global Education
      </p>
    </div>
  );
};

export default TutorLogin;
