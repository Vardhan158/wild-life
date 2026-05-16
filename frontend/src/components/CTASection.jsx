import React from "react";
import { FaPaw, FaArrowRight } from "react-icons/fa";

const CTASection = () => {
  return (
    <section style={{ fontFamily: "'Poppins', sans-serif" }} className="relative overflow-hidden bg-emerald-600 py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <FaPaw size={36} className="mx-auto mb-5 text-white/70" />
        <h2 className="mb-5 text-3xl font-extrabold leading-tight text-white md:text-5xl">
          Ready for Your Next Wild Chapter?
        </h2>
        <p className="mb-10 text-base font-light leading-relaxed text-emerald-100 md:text-lg">
          Join thousands of nature lovers who've discovered the magic of responsible wilderness travel.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4 text-base font-bold text-emerald-700 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-emerald-50">
            Plan Your Safari
            <FaArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <button className="inline-flex items-center justify-center rounded-full border-2 border-white/50 px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10">
            View Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
