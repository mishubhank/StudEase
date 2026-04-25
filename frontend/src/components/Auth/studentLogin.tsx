import axios from "axios";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS is imported
import {
  Mail,
  Lock,
  ArrowLeft,
  GraduationCap,
  Loader2,
  Sparkles,
} from "lucide-react";
import { buildApiUrl } from "../../lib/api";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const studentLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        buildApiUrl("/api/auth/student/signin"),
        { email: mail, password: pass },
      );
      localStorage.setItem("jwt", response.data.jwt);
      toast.success("Welcome back! Logging you in...", {
        theme: "dark",
      });
      setTimeout(() => navigate("../student/dashboard"), 1500);
    } catch (err) {
      toast.error("Invalid credentials. Access denied.", {
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full" />

      {/* Decorative Floating Icon */}
      <div className="absolute top-20 right-[20%] text-indigo-500/20 animate-pulse hidden lg:block">
        <Sparkles size={60} />
      </div>

      {/* Navigation */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-all group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium tracking-tight">
          Return to Home
        </span>
      </button>

      {/* Main Login Card */}
      <div className="relative w-full max-w-[460px]">
        {/* Border Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-[2rem] blur-xl -z-10" />

        <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/50 rounded-3xl p-10 md:p-14 shadow-2xl">
          {/* Brand/Header */}
          <div className="flex flex-col items-center mb-12">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 shadow-inner">
              <GraduationCap size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Student Portal
            </h1>
            <p className="text-slate-400 text-sm mt-2 font-medium">
              Ready to continue your journey?
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={studentLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">
                Student Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />
                <input
                  required
                  type="email"
                  placeholder="alex@example.com"
                  className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40 transition-all duration-300"
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[10px] text-indigo-400 font-semibold hover:text-indigo-300 transition-colors uppercase tracking-wider"
                >
                  Reset?
                </a>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40 transition-all duration-300"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Unlock Dashboard"
              )}
            </button>
          </form>

          {/* Signup CTA */}
          <div className="mt-12 text-center border-t border-slate-800/50 pt-8">
            <p className="text-slate-500 text-sm">
              Not a member yet?{" "}
              <button
                onClick={() => navigate("/student/signup")}
                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer
        aria-label="notification"
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <footer className="absolute bottom-8 text-slate-700 text-[10px] font-bold uppercase tracking-[0.3em]">
        Secure Environment • SSL Encrypted
      </footer>
    </div>
  );
};

export default StudentLogin;
