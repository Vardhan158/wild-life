import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

/* Inject Poppins font */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
    * { font-family: 'Poppins', sans-serif; }
    input::placeholder { font-family: 'Poppins', sans-serif; }
    input:focus { outline: none; box-shadow: none; }
  `}</style>
);

const images = [
  "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1609591804050-058bb7d8b66b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
];

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

const Login = () => {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage(""); setResetLink(""); setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      const { token, user } = response.data;
      if (token && user) {
        login(user, token);
        navigate(user.isAdmin ? "/admin" : "/home");
      } else {
        setError("Login response missing token or user data.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to connect. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError(""); setMessage(""); setResetLink("");
    if (!email.trim()) { setError("Enter your email first to receive a reset link."); return; }
    try {
      const response = await axios.post("http://localhost:5000/forgot-password", { email });
      setMessage(response.data.message);
      if (response.data.resetUrl) setResetLink(response.data.resetUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to generate reset link right now.");
    }
  };

  return (
    <>
      <FontLoader />
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0d1a12]">

        {/* ── LEFT PANEL: Image Carousel ── */}
        <div className="relative lg:w-[55%] w-full h-64 sm:h-80 lg:h-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt="Safari"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1 }}
            />
          </AnimatePresence>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/30 to-emerald-950/60" />

          <div className="relative z-10 h-full flex flex-col justify-between p-7 lg:p-12">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-9 h-9 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                <svg className="w-4 h-4 text-emerald-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg tracking-wide">SafariNest</span>
            </motion.div>

            {/* Hero text — desktop only */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-emerald-300 text-xs font-semibold tracking-[0.22em] uppercase mb-3">
                Wildlife &amp; Luxury
              </p>
              <h1 className="text-white text-5xl font-bold leading-[1.15] mb-5">
                Explore the Wild.<br />Stay in Serenity.
              </h1>
              <p className="text-white/65 text-sm font-light leading-relaxed max-w-sm">
                Embark on unforgettable wildlife safaris and experience nature
                like never before. Book your stay and witness the untamed beauty of the wild.
              </p>

              {/* Carousel dots */}
              <div className="flex gap-2 mt-8">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === current ? "w-8 bg-emerald-400" : "w-3 bg-white/25"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Stats badge — desktop only */}
            <motion.div
              className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 w-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-lg">
                🦁
              </div>
              <div>
                <p className="text-white text-sm font-medium">Over 2,400 bookings</p>
                <p className="text-white/45 text-xs font-light">across 18 safari destinations</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Login Form ── */}
        <div className="lg:w-[45%] w-full flex items-center justify-center px-5 sm:px-8 py-10 lg:py-0 bg-[#0d1a12]">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Header */}
            <div className="mb-9">
              <p className="text-emerald-400 text-xs font-semibold tracking-[0.22em] uppercase mb-2">
                Welcome back
              </p>
              <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
                Sign in to<br />your account
              </h2>
              <p className="text-white/45 text-sm font-light mt-3">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                >
                  Create one free
                </Link>
              </p>
            </div>

            {/* Alerts */}
            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 mb-6"
                >
                  <span className="text-red-400 mt-0.5 text-sm">⚠</span>
                  <p className="text-red-400 text-sm font-normal">{error}</p>
                </motion.div>
              )}
              {message && (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-3 mb-6"
                >
                  <span className="text-emerald-400 mt-0.5 text-sm">✓</span>
                  <div>
                    <p className="text-emerald-400 text-sm font-normal">{message}</p>
                    {resetLink && (
                      <Link
                        to={resetLink.replace("http://localhost:5173", "")}
                        className="text-emerald-300 underline text-xs font-medium mt-1 block"
                      >
                        Open reset page →
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <div>
                <label className="block text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ outline: "none", boxShadow: "none" }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm font-light placeholder-white/25 focus:border-emerald-500 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>

              {/* Password field */}
              <div>
                <label className="block text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={{ outline: "none", boxShadow: "none" }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white text-sm font-light placeholder-white/25 focus:border-emerald-500 focus:bg-white/[0.07] transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    <EyeIcon open={showPass} />
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div
                    role="checkbox"
                    aria-checked={remember}
                    onClick={() => setRemember(!remember)}
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer ${
                      remember ? "bg-emerald-500 border-emerald-500" : "border-white/20 bg-white/5"
                    }`}
                  >
                    {remember && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white/45 text-xs font-normal group-hover:text-white/65 transition-colors select-none">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-emerald-400 text-xs font-medium hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-2 py-4 rounded-xl font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/40"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Signing in…
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Sign In →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs font-light">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Footer */}
            <p className="text-white/20 text-xs text-center mt-9 font-light leading-relaxed">
              By signing in, you agree to our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-white/40 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-white/40 transition-colors">
                Privacy Policy
              </a>.
            </p>
          </motion.div>
        </div>

      </div>
    </>
  );
};

export default Login;