import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaLeaf,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

/* ── Animation Variants ───────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Stats ────────────────────────────────────────────── */
const stats = [
  { icon: "🏨", value: "30+", label: "Luxury Resorts" },
  { icon: "🌿", value: "100%", label: "Eco-Certified" },
  { icon: "⭐", value: "4.8", label: "Avg Rating" },
  { icon: "😊", value: "10K+", label: "Happy Guests" },
];

/* ── Amenity Icon Map ─────────────────────────────────── */
const AmenityIcons = () => (
  <div className="flex items-center gap-3 text-emerald-500">
    <FaWifi size={14} title="WiFi" />
    <FaSwimmingPool size={14} title="Pool" />
    <FaUtensils size={14} title="Restaurant" />
  </div>
);

/* ── Component ────────────────────────────────────────── */
const Resorts = () => {
  const [resortPackages, setResortPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!document.querySelector("#poppins-link")) {
      const el = document.createElement("link");
      el.id = "poppins-link";
      el.href =
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap";
      el.rel = "stylesheet";
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/resort");
        if (response.data.success) {
          setResortPackages(response.data.resorts || []);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResorts();
  }, []);

  /* ── Loading ──────────────────────────────────────────── */
  if (loading) {
    return (
      <div
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white"
      >
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-emerald-700 font-semibold text-lg tracking-wide">
          Loading Resorts...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="bg-white text-gray-800 overflow-x-hidden"
    >
      <Navbar />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 overflow-hidden">
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl" />

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
              <FaLeaf size={10} />
              <span>Eco-Luxury Accommodations</span>
            </motion.div>

            <motion.h1
              variants={fadeUp(0.1)}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-3xl"
            >
              Luxury Resorts &{" "}
              <span className="text-amber-400">Stays</span>
            </motion.h1>

            <motion.p
              variants={fadeUp(0.2)}
              className="text-emerald-100/80 text-base md:text-lg font-light leading-relaxed max-w-xl"
            >
              Discover premium resorts and unforgettable stays surrounded by
              nature, where modern comfort meets the wild.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              variants={fadeUp(0.3)}
              className="flex flex-wrap justify-center gap-3 mt-2"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/10 border border-white/15 text-white text-sm font-medium px-5 py-2 rounded-full backdrop-blur-sm"
                >
                  <span>{s.icon}</span>
                  <span className="font-bold">{s.value}</span>
                  <span className="text-emerald-200 font-light">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full fill-white"
          >
            <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── Resort Grid ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeUp(0)}
              className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
            >
              Our Collection
            </motion.span>
            <motion.h2
              variants={fadeUp(0.1)}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight"
            >
              Discover Your{" "}
              <span className="text-emerald-600">Perfect Resort</span>
            </motion.h2>
            <motion.p
              variants={fadeUp(0.2)}
              className="text-gray-500 text-sm md:text-base font-light mt-3 max-w-xl mx-auto leading-relaxed"
            >
              Handpicked eco-luxury properties where world-class comfort meets
              pristine nature — each one certified sustainable.
            </motion.p>
          </motion.div>

          {/* Empty state */}
          {resortPackages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-5"
            >
              <span className="text-6xl">🏨</span>
              <p className="text-2xl font-bold text-gray-800">
                No Resorts Found
              </p>
              <p className="text-gray-500 text-sm font-light max-w-sm text-center">
                Our curated resort collection is being updated. Check back soon
                or contact us directly.
              </p>
              <button className="mt-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-emerald-700 transition-all duration-300">
                Contact Us
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {resortPackages.map((resort, index) => (
                <motion.div
                  key={resort._id || index}
                  variants={cardVariants}
                  className="group bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={resort.image || "https://placehold.co/500x300/d1fae5/065f46?text=Resort"}
                      alt={resort.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/500x300/d1fae5/065f46?text=Resort";
                      }}
                    />

                    {/* Type badge */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                      {resort.type || "Luxury Resort"}
                    </span>

                    {/* Price badge */}
                    <span className="absolute top-4 right-4 bg-amber-400 text-emerald-900 text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                      ₹{resort.price || 0}
                      <span className="text-xs font-medium opacity-80">/night</span>
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                      <span className="text-white text-xs font-semibold tracking-wide">
                        View Details →
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    {/* Name */}
                    <h3 className="text-gray-900 font-bold text-xl leading-snug">
                      {resort.name || "Unnamed Resort"}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-light">
                      <FaMapMarkerAlt size={11} className="text-emerald-500 flex-shrink-0" />
                      <span>{resort.location || "Location not specified"}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2 flex-1">
                      {resort.description ||
                        "A wonderful place to spend quality time with your loved ones surrounded by nature."}
                    </p>

                    {/* Amenity tags */}
                    {(Array.isArray(resort.amenities) ? resort.amenities : []).length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {(Array.isArray(resort.amenities) ? resort.amenities : [])
                          .slice(0, 3)
                          .map((amenity, idx) => (
                            <span
                              key={idx}
                              className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        {resort.amenities?.length > 3 && (
                          <span className="bg-gray-50 border border-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                            +{resort.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Icons row + CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-1">
                      <AmenityIcons />
                      <Link
                        to={`/resorts/${resort._id}`}
                        className="group/btn inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-sm shadow-emerald-100"
                      >
                        View Details
                        <FaArrowRight
                          size={10}
                          className="group-hover/btn:translate-x-0.5 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Why Stay With Us ────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeUp(0)}
              className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              variants={fadeUp(0.1)}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight"
            >
              The{" "}
              <span className="text-emerald-600">WildLifeStay</span>{" "}
              Difference
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { icon: "🌿", title: "Eco-Certified", desc: "Every resort meets our strict sustainability standards" },
              { icon: "🛎️", title: "Premium Service", desc: "24/7 concierge and dedicated guest experience teams" },
              { icon: "📸", title: "Scenic Locations", desc: "Handpicked spots inside or adjacent to protected zones" },
              { icon: "💳", title: "Best Price", desc: "Transparent pricing with no hidden fees, ever" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp(i * 0.08)}
                className="flex flex-col items-center text-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-gray-900 font-semibold text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs font-light leading-snug">{item.desc}</p>
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
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
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
            <motion.span variants={fadeUp(0)} className="text-4xl block mb-4">
              🏨
            </motion.span>
            <motion.h2
              variants={fadeUp(0.1)}
              className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight"
            >
              Can't Find Your Dream Stay?
            </motion.h2>
            <motion.p
              variants={fadeUp(0.2)}
              className="text-emerald-100 text-base font-light mb-10 leading-relaxed"
            >
              Our team curates bespoke resort packages tailored to your
              preferences, travel dates, and group size.
            </motion.p>
            <motion.div
              variants={fadeUp(0.3)}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="group inline-flex items-center justify-center gap-3 bg-white text-emerald-700 px-10 py-4 rounded-full font-bold text-sm hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:scale-105">
                Plan Custom Stay
                <FaArrowRight
                  size={11}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
              <button className="inline-flex items-center justify-center border-2 border-white/50 text-white px-10 py-4 rounded-full font-semibold text-sm hover:bg-white/10 hover:border-white transition-all duration-300">
                Talk to Our Team
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resorts;