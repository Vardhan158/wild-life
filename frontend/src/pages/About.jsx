import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import zebra from "../assets/Safari_Images/Zebra_photo.avif";
import lion from "../assets/Safari_Images/Lion_photo.avif";
import elephant from "../assets/Safari_Images/Elephants_photo.avif";
import Tiger from "../assets/Safari_Images/Tiger_Photo.avif";

/* ── Animation Variants ───────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

/* ── Data ─────────────────────────────────────────────── */
const pillars = [
  {
    icon: "🌿",
    label: "Eco-Certified",
    sub: "All lodges certified carbon-neutral",
  },
  {
    icon: "🤝",
    label: "Community First",
    sub: "70% staff hired from local villages",
  },
  {
    icon: "📷",
    label: "Expert Guides",
    sub: "Naturalists with 10+ years in the field",
  },
  {
    icon: "🦁",
    label: "200+ Species",
    sub: "Documented across all our reserves",
  },
];

const values = [
  {
    title: "Our Mission",
    body: "To promote wildlife conservation through immersive experiences and educate visitors about the importance of protecting our natural heritage for generations to come.",
    accent: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
    icon: "🎯",
  },
  {
    title: "Our Vision",
    body: "A world where humans and wildlife coexist harmoniously, with sustainable tourism driving positive change for ecosystems and local communities worldwide.",
    accent: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100 text-amber-600",
    icon: "🔭",
  },
  {
    title: "Our Promise",
    body: "Every booking directly funds habitat preservation, anti-poaching units, and youth conservation programs in the regions where we operate.",
    accent: "bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100 text-sky-600",
    icon: "🌍",
  },
];

const safaris = [
  {
    img: elephant,
    title: "Elephant Encounters",
    tag: "Most Popular",
    tagStyle: "bg-emerald-100 text-emerald-700",
    desc: "Connect closely with gentle giants and witness their majestic grace in a natural, ethical setting guided by expert mahouts.",
  },
  {
    img: lion,
    title: "Lion Safaris",
    tag: "Premium",
    tagStyle: "bg-amber-100 text-amber-700",
    desc: "An exhilarating adventure to witness the king of the jungle in his natural realm at golden hour across the open savanna.",
  },
  {
    img: zebra,
    title: "Zebra Herds",
    tag: "Seasonal",
    tagStyle: "bg-sky-100 text-sky-700",
    desc: "Marvel at the striking beauty of black-and-white stripes moving in perfect harmony across the vast East African grasslands.",
  },
  {
    img: Tiger,
    title: "Tiger Trails",
    tag: "Exclusive",
    tagStyle: "bg-rose-100 text-rose-700",
    desc: "Deep-forest tracking expeditions for a thrilling encounter with the majestic Bengal tiger in its natural wilderness habitat.",
  },
];

/* ── Component ────────────────────────────────────────── */
const About = () => {
  /* Inject Poppins */
  useEffect(() => {
    if (!document.querySelector("#poppins-link")) {
      const link = document.createElement("link");
      link.id = "poppins-link";
      link.href =
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-white text-gray-800 overflow-x-hidden">
      <Navbar />

      {/* ── Hero Banner ─────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 overflow-hidden">
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex flex-col items-center gap-5"
          >
            <motion.div
              variants={fadeUp(0)}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-200 text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full backdrop-blur-sm"
            >
              🌿 <span>Responsible Wildlife Tourism Since 2015</span>
            </motion.div>

            <motion.h1
              variants={fadeUp(0.1)}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-3xl"
            >
              About{" "}
              <span className="text-amber-400">WildLife</span>
              <span className="text-white">Stay</span>
            </motion.h1>

            <motion.p
              variants={fadeUp(0.2)}
              className="text-emerald-100/80 text-base md:text-lg font-light leading-relaxed max-w-2xl"
            >
              Founded by passionate conservationists, we connect you with the world's most breathtaking wildlife reserves while preserving every ecosystem we touch.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              variants={fadeUp(0.3)}
              className="flex flex-wrap justify-center gap-3 mt-4"
            >
              {["15K+ Adventurers", "50+ Destinations", "200+ Species", "4.9★ Rating"].map(
                (stat, i) => (
                  <span
                    key={i}
                    className="bg-white/10 border border-white/15 text-white text-sm font-medium px-5 py-2 rounded-full backdrop-blur-sm"
                  >
                    {stat}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full fill-white">
            <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── Pillars Strip ───────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp(i * 0.08)}
                className="flex flex-col items-center text-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl">{p.icon}</span>
                <p className="text-gray-900 font-semibold text-sm leading-tight">{p.label}</p>
                <p className="text-gray-500 text-xs font-light leading-snug">{p.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Story Section ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.span
                variants={fadeUp(0)}
                className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
              >
                Who We Are
              </motion.span>
              <motion.h2
                variants={fadeUp(0.1)}
                className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-5 leading-tight"
              >
                Your Gateway to the{" "}
                <span className="text-emerald-600">Heart of Nature</span>
              </motion.h2>
              <motion.p
                variants={fadeUp(0.2)}
                className="text-gray-500 leading-relaxed font-light mb-4 text-sm md:text-base"
              >
                Welcome to <span className="text-emerald-600 font-semibold">WildLifeStay</span> — dedicated to providing unforgettable experiences in breathtaking wildlife reserves and national parks around the world, connecting you with the wild while championing sustainability at every step.
              </motion.p>
              <motion.p
                variants={fadeUp(0.3)}
                className="text-gray-500 leading-relaxed font-light text-sm md:text-base"
              >
                Our eco-friendly lodges and luxury safari tents are designed to minimize environmental impact. Every trail we walk, every species we observe, and every night under the stars is a commitment to preserving biodiversity and creating timeless memories.
              </motion.p>
              <motion.div
                variants={fadeUp(0.4)}
                className="mt-8 flex flex-wrap gap-3"
              >
                {["Certified Eco-Stays", "Carbon Neutral", "Conservation Funded"].map((badge, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Decorative card stack */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-64 md:h-80 hidden md:block"
            >
              <div className="absolute top-0 right-8 w-56 h-64 bg-amber-100 rounded-3xl rotate-6" />
              <div className="absolute top-4 right-4 w-56 h-64 bg-emerald-100 rounded-3xl -rotate-2" />
              <div className="absolute top-8 right-0 w-56 h-64 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center gap-3 p-6">
                <span className="text-5xl">🦁</span>
                <p className="text-gray-800 font-bold text-center text-lg leading-snug">
                  Wildlife<br />Preserved
                </p>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-200">
                  Since 2015
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Promise ─────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp(0)}
              className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
            >
              What Drives Us
            </motion.span>
            <motion.h2
              variants={fadeUp(0.1)}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight"
            >
              Purpose Behind Every{" "}
              <span className="text-emerald-600">Adventure</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp(i * 0.1)}
                className={`rounded-3xl border p-8 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${v.accent}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${v.iconBg}`}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Safari Cards ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp(0)}
              className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
            >
              Signature Experiences
            </motion.span>
            <motion.h2
              variants={fadeUp(0.1)}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight"
            >
              Our Wildlife{" "}
              <span className="text-emerald-600">Safaris</span>
            </motion.h2>
            <motion.p
              variants={fadeUp(0.2)}
              className="text-gray-500 text-sm md:text-base font-light mt-3 max-w-xl mx-auto leading-relaxed"
            >
              Every journey is thoughtfully crafted to bring you closer to the natural world while leaving the lightest footprint.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {safaris.map((safari, i) => (
              <motion.div
                key={i}
                variants={fadeUp(i * 0.08)}
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={safari.img}
                    alt={safari.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Tag */}
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${safari.tagStyle}`}>
                    {safari.tag}
                  </span>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                    <span className="text-white text-xs font-semibold tracking-wide">
                      Explore More →
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="text-gray-900 font-bold text-base leading-snug">{safari.title}</h3>
                  <p className="text-gray-500 text-xs font-light leading-relaxed flex-1">{safari.desc}</p>
                  <button className="mt-4 text-emerald-600 text-xs font-semibold hover:text-emerald-700 flex items-center gap-1 self-start transition-colors duration-200">
                    Learn More
                    <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────── */}
      <section className="py-20 bg-emerald-600 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span variants={fadeUp(0)} className="text-4xl block mb-4">🐾</motion.span>
            <motion.h2
              variants={fadeUp(0.1)}
              className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight"
            >
              Ready to Begin Your Wild Chapter?
            </motion.h2>
            <motion.p
              variants={fadeUp(0.2)}
              className="text-emerald-100 text-base font-light mb-10 leading-relaxed"
            >
              Join thousands of nature lovers who've discovered the magic of responsible wilderness travel.
            </motion.p>
            <motion.div
              variants={fadeUp(0.3)}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="group inline-flex items-center justify-center gap-3 bg-white text-emerald-700 px-10 py-4 rounded-full font-bold text-sm hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:scale-105">
                Plan Your Safari
                <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
              </button>
              <button className="inline-flex items-center justify-center border-2 border-white/50 text-white px-10 py-4 rounded-full font-semibold text-sm hover:bg-white/10 hover:border-white transition-all duration-300">
                View Our Gallery
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;