import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

/* Inject Poppins font */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
    * { font-family: 'Poppins', sans-serif; }
    input::placeholder { font-family: 'Poppins', sans-serif; }
    input:focus { outline: none; box-shadow: none; }
  `}</style>
);

const steps = [
  {
    id: 0,
    label: "Your Name",
    title: "Create your account",
    subtitle: "Tell us who you are to get started.",
    field: { label: "Full Name", name: "userName", placeholder: "e.g. Alex Hartley", type: "text" },
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80",
    emoji: "👤",
  },
  {
    id: 1,
    label: "Your Email",
    title: "Enter your email",
    subtitle: "We'll send booking confirmations here.",
    field: { label: "Email Address", name: "email", placeholder: "you@example.com", type: "email" },
    image: "https://images.unsplash.com/photo-1609591804050-058bb7d8b66b?auto=format&fit=crop&w=900&q=80",
    emoji: "✉️",
  },
  {
    id: 2,
    label: "Password",
    title: "Secure your account",
    subtitle: "Use at least 8 characters with a mix of letters and numbers.",
    field: { label: "Password", name: "password", placeholder: "Create a strong password", type: "password" },
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    emoji: "🔒",
  },
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

const Signup = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = ((step) / (steps.length - 1)) * 100;

  const handleNext = () => {
    const val = formData[current.field.name];
    if (!val.trim()) { setError(`Please enter your ${current.field.label.toLowerCase()}.`); return; }
    setError("");
    if (!isLast) setStep(step + 1);
  };

  const handlePrev = () => { setError(""); setStep(step - 1); };

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signup", formData);
      if (response.status === 200 || response.status === 201) navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FontLoader />
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0d1a12]">

        {/* ── LEFT PANEL: Image ── */}
        <div className="relative lg:w-[55%] w-full h-56 sm:h-72 lg:h-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.image}
              src={current.image}
              alt="Safari"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
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
              transition={{ delay: 0.2 }}
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
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-emerald-300 text-xs font-semibold tracking-[0.22em] uppercase mb-3">
                Join the Adventure
              </p>
              <h1 className="text-white text-5xl font-bold leading-[1.15] mb-5">
                Your Safari<br />Journey Begins.
              </h1>
              <p className="text-white/65 text-sm font-light leading-relaxed max-w-sm">
                Create your account in three quick steps and unlock access to curated wildlife lodges, expert guides, and unforgettable safari experiences.
              </p>

              {/* Step roadmap */}
              <div className="mt-10 space-y-3">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      i === step ? "opacity-100" : i < step ? "opacity-60" : "opacity-30"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-300 ${
                        i < step
                          ? "bg-emerald-400 border-emerald-400 text-emerald-900"
                          : i === step
                          ? "bg-transparent border-emerald-400 text-emerald-400"
                          : "bg-transparent border-white/20 text-white/40"
                      }`}
                    >
                      {i < step ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className={`text-sm font-medium ${i === step ? "text-white" : "text-white/50"}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom badge — desktop only */}
            <motion.div
              className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 w-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-lg">
                🌍
              </div>
              <div>
                <p className="text-white text-sm font-medium">Free to join</p>
                <p className="text-white/45 text-xs font-light">No credit card required</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Multi-step Form ── */}
        <div className="lg:w-[45%] w-full flex items-center justify-center px-5 sm:px-8 py-10 lg:py-0 bg-[#0d1a12]">
          <div className="w-full max-w-md">
            {/* Header */}
            <motion.div
              className="mb-9"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-emerald-400 text-xs font-semibold tracking-[0.22em] uppercase mb-2">
                Step {step + 1} of {steps.length}
              </p>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${step}`}
                  className="text-white text-3xl sm:text-4xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  {current.title}
                </motion.h2>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`sub-${step}`}
                  className="text-white/45 text-sm font-light mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {current.subtitle}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((s, i) => (
                  <span
                    key={i}
                    className={`text-xs font-medium transition-colors duration-300 ${
                      i <= step ? "text-emerald-400" : "text-white/20"
                    }`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-400 rounded-full"
                  initial={false}
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Error */}
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
            </AnimatePresence>

            {/* Input field */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`field-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="mb-8"
              >
                <label className="block text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">
                  {current.field.label}
                </label>
                <div className="relative">
                  <input
                    name={current.field.name}
                    type={
                      current.field.type === "password"
                        ? showPass ? "text" : "password"
                        : current.field.type
                    }
                    required
                    value={formData[current.field.name]}
                    onChange={(e) =>
                      setFormData({ ...formData, [current.field.name]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); isLast ? handleSubmit() : handleNext(); }
                    }}
                    placeholder={current.field.placeholder}
                    style={{ outline: "none", boxShadow: "none" }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white text-sm font-light placeholder-white/25 focus:border-emerald-500 focus:bg-white/[0.07] transition-all duration-200"
                  />
                  {current.field.type === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      <EyeIcon open={showPass} />
                    </button>
                  )}
                </div>

                {/* Password strength hint */}
                {current.field.type === "password" && formData.password && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 space-y-1.5"
                  >
                    {[
                      { label: "At least 8 characters", pass: formData.password.length >= 8 },
                      { label: "Contains a number", pass: /\d/.test(formData.password) },
                      { label: "Contains a letter", pass: /[a-zA-Z]/.test(formData.password) },
                    ].map((rule) => (
                      <div key={rule.label} className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                            rule.pass ? "bg-emerald-500" : "bg-white/10"
                          }`}
                        >
                          {rule.pass && (
                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs transition-colors ${rule.pass ? "text-emerald-400" : "text-white/30"}`}>
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              {step > 0 && (
                <motion.button
                  type="button"
                  onClick={handlePrev}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl border border-white/15 text-white/60 text-sm font-medium hover:bg-white/5 hover:border-white/25 hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </motion.button>
              )}

              <motion.button
                type="button"
                onClick={isLast ? handleSubmit : handleNext}
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/40"
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
                      Creating account…
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {isLast ? "Create Account →" : "Continue →"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Sign in link */}
            <p className="text-white/35 text-sm text-center mt-8 font-light">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                Sign in
              </Link>
            </p>

            {/* Footer */}
            <p className="text-white/15 text-xs text-center mt-5 font-light leading-relaxed">
              By creating an account, you agree to our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-white/35 transition-colors">Terms</a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-white/35 transition-colors">Privacy Policy</a>.
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Signup;