import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaLock, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("admin@gotravel.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        toast.success("Welcome back, Administrator!");
        navigate("/");
      } else {
        toast.error(res.message);
      }
    }, 400);
  };

  const handleDemoFill = () => {
    setEmail("admin@gotravel.com");
    setPassword("admin123");
    toast.info("Demo credentials loaded.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-sky-500/25">
            <FaPlane className="text-2xl -rotate-45" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight pt-2">
            GoTravel Admin
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access the travel management console
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Administrator Email
            </label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/20 transition-all">
              <FaEnvelope className="text-sky-400 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gotravel.com"
                required
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Security Key / Password
            </label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/20 transition-all">
              <FaLock className="text-sky-400 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In to Console"}
          </button>
        </form>

        {/* Demo Fast Fill & Notice */}
        <div className="pt-2 text-center space-y-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs font-semibold text-sky-400 hover:underline cursor-pointer"
          >
            Click to Auto-Fill Demo Credentials
          </button>
          <p className="text-[11px] text-slate-500">
            Authorized administrative access only • 256-bit SSL encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

