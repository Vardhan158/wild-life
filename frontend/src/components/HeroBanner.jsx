import React, { useEffect } from "react";
import {
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";
import waterfallVideo from "../assets/Safari_video/Waterfall_video (1).mp4";

const HeroBanner = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <section style={{ fontFamily: "'Poppins', sans-serif" }} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        src={waterfallVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-amber-50/20 to-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm backdrop-blur-sm">
          <FaLeaf size={10} />
          <span>Responsible Wildlife Tourism</span>
        </div>

        <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          Explore the Wild,
          <br />
          <span className="text-emerald-600">Stay in Comfort</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-gray-600 md:text-xl">
          Discover breathtaking safaris, serene eco-stays, and unforgettable
          encounters with nature's untouched beauty.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group flex w-full items-center justify-center gap-3 rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-200 transition-all duration-300 hover:scale-105 hover:bg-emerald-700 sm:w-auto">
            Start Your Adventure
            <FaArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <button className="flex w-full items-center justify-center rounded-full border-2 border-gray-200 bg-white/80 px-8 py-4 text-base font-medium text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-400 hover:text-emerald-600 sm:w-auto">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2">
        <div className="h-8 w-px bg-gradient-to-b from-transparent to-emerald-500" />
        <div className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>
    </section>
  );
};

export default HeroBanner;
