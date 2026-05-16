import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaBed,
  FaWifi,
  FaSwimmingPool,
  FaSpa,
  FaUtensils,
  FaFilm,
  FaCheck,
  FaArrowLeft,
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
  FaDoorOpen,
  FaLeaf,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

/* ── Animation Variants ───────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ── Amenity Icon Map ─────────────────────────────────── */
const amenityIcons = {
  Spa: <FaSpa />,
  "Swimming Pool": <FaSwimmingPool />,
  Restaurant: <FaUtensils />,
  WiFi: <FaWifi />,
  Entertainment: <FaFilm />,
  Bedding: <FaBed />,
};

const amenityColors = {
  Spa: "bg-rose-50 border-rose-100 text-rose-600",
  "Swimming Pool": "bg-sky-50 border-sky-100 text-sky-600",
  Restaurant: "bg-amber-50 border-amber-100 text-amber-600",
  WiFi: "bg-violet-50 border-violet-100 text-violet-600",
  Entertainment: "bg-pink-50 border-pink-100 text-pink-600",
  Bedding: "bg-emerald-50 border-emerald-100 text-emerald-600",
};

/* ── Component ────────────────────────────────────────── */
const ResortDetail = () => {
  const MAX_ONLINE_PAYMENT_AMOUNT = 100000;
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [resort, setResort] = useState(null);
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
    const fetchResortDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/resort/${id}`);
        setResort(response.data.resort);
      } catch (error) {
        console.error("Error fetching resort details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResortDetails();
  }, [id]);

  /* ── Loading ──────────────────────────────────────────── */
  if (loading) {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-white">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-emerald-700 font-semibold text-lg">Loading Resort Details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Not Found ────────────────────────────────────────── */
  if (!resort) {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-white">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-5">
          <span className="text-6xl">🏨</span>
          <p className="text-2xl font-bold text-gray-800">Resort Not Found</p>
          <button
            onClick={() => navigate("/resorts")}
            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-emerald-700 transition-all duration-300"
          >
            Back to Resorts
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Price Calculation ────────────────────────────────── */
  const totalNights =
    checkInDate && checkOutDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const basePrice =
    typeof resort.price === "string"
      ? parseInt(resort.price.replace(/[^0-9]/g, ""))
      : Number(resort.price) || 0;

  const totalPrice = totalNights > 0 ? basePrice * totalNights * rooms : 0;

  /* ── Payment ──────────────────────────────────────────── */
  const handlePayment = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }
    if (totalNights <= 0) {
      alert("Invalid booking dates");
      return;
    }
    if (totalPrice <= 0) {
      alert("Invalid amount");
      return;
    }
    if (totalPrice > MAX_ONLINE_PAYMENT_AMOUNT) {
      alert(
        `Online payment is currently limited to ₹${MAX_ONLINE_PAYMENT_AMOUNT.toLocaleString()} per booking.`
      );
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:5000/payment/create-order", {
        amount: totalPrice,
      });
      const options = {
        key: "rzp_test_SjC9thwdLWFQ8m",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "WildLifeStay",
        description: "Luxury Resort Booking",
        image: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
        order_id: data.order.id,
        handler: async function (response) {
          await axios.post("http://localhost:5000/payment/verify-payment", response);
          await axios.post(
            "http://localhost:5000/bookings",
            {
              serviceType: "resort",
              serviceId: resort._id,
              serviceName: resort.name,
              serviceImage: resort.image,
              checkInDate,
              checkOutDate,
              guests,
              rooms,
              totalAmount: totalPrice,
              paymentStatus: "paid",
              paymentOrderId: data.order.id,
              paymentId: response.razorpay_payment_id,
              paymentSignature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert(
            `Payment successful! Your booking request has been sent to admin for confirmation${
              user?.userName ? `, ${user.userName}` : ""
            }.`
          );
        },
        prefill: {
          name: user?.userName || "Guest User",
          email: user?.email || "guest@example.com",
          contact: "9999999999",
        },
        notes: { resortName: resort.name, checkInDate, checkOutDate },
        theme: { color: "#059669" },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Payment failed. Please try again.");
    }
  };

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="bg-white text-gray-800 overflow-x-hidden"
    >
      <Navbar />

      {/* ── Back bar ──────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/resorts")}
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-semibold text-sm transition-colors duration-200"
          >
            <FaArrowLeft size={12} /> Back to Resorts
          </button>
        </div>
      </div>

      {/* ── Hero Image ────────────────────────────────────── */}
      <div className="relative h-72 sm:h-96 md:h-[500px] overflow-hidden">
        <img
          src={resort.image || "https://placehold.co/1200x500/d1fae5/065f46?text=Resort"}
          alt={resort.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/1200x500/d1fae5/065f46?text=Resort";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl w-full mx-auto px-6 pb-8 md:pb-12">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div
                variants={fadeUp(0)}
                className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-emerald-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm mb-3"
              >
                <FaLeaf size={9} /> Eco-Luxury Resort
              </motion.div>

              <motion.h1
                variants={fadeUp(0.1)}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight"
              >
                {resort.name}
              </motion.h1>

              <motion.div
                variants={fadeUp(0.2)}
                className="flex flex-wrap items-center gap-4"
              >
                {resort.location && (
                  <span className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    <FaMapMarkerAlt size={13} className="text-emerald-400" />
                    {resort.location}
                  </span>
                )}
                <span className="flex items-center gap-2 text-white/90 text-sm font-medium">
                  <FaStar size={13} className="text-amber-400" />
                  {resort.rating || "4.8"} · {resort.reviews || 0} reviews
                </span>
                <span className="bg-amber-400 text-emerald-900 text-lg font-extrabold px-5 py-1.5 rounded-full shadow-lg">
                  ₹{resort.price}
                  <span className="text-xs font-medium ml-1 opacity-70">/night</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left / Content ──────────────────────────────── */}
          <div className="lg:col-span-2 space-y-14">

            {/* About */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              <motion.span
                variants={fadeUp(0)}
                className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
              >
                About This Property
              </motion.span>
              <motion.h2
                variants={fadeUp(0.1)}
                className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4 leading-tight"
              >
                About This Resort
              </motion.h2>
              <motion.p
                variants={fadeUp(0.2)}
                className="text-gray-500 leading-relaxed font-light text-sm md:text-base"
              >
                {resort.description}
              </motion.p>
            </motion.section>

            {/* Amenities */}
            {resort.amenities?.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger}
              >
                <motion.span
                  variants={fadeUp(0)}
                  className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
                >
                  Facilities
                </motion.span>
                <motion.h2
                  variants={fadeUp(0.1)}
                  className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-6 leading-tight"
                >
                  Amenities
                </motion.h2>
                <motion.div
                  variants={fadeUp(0.2)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {resort.amenities.map((amenity, idx) => {
                    const colorClass =
                      amenityColors[amenity] ||
                      "bg-emerald-50 border-emerald-100 text-emerald-600";
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 border rounded-2xl px-5 py-4 ${colorClass}`}
                      >
                        <div className="text-xl flex-shrink-0">
                          {amenityIcons[amenity] || <FaCheck />}
                        </div>
                        <span className="text-gray-800 font-semibold text-sm">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </motion.section>
            )}

            {/* Policies / highlights if available */}
            {resort.highlights?.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger}
              >
                <motion.span
                  variants={fadeUp(0)}
                  className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
                >
                  Highlights
                </motion.span>
                <motion.h2
                  variants={fadeUp(0.1)}
                  className="text-2xl font-bold text-gray-900 mt-2 mb-5 leading-tight"
                >
                  What's Included
                </motion.h2>
                <motion.div
                  variants={fadeUp(0.2)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {resort.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheck size={9} className="text-emerald-600" />
                      </span>
                      <span className="text-gray-700 text-sm font-light leading-snug">{h}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.section>
            )}

            {/* Best For tags */}
            {resort.bestFor?.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger}
              >
                <motion.span
                  variants={fadeUp(0)}
                  className="text-emerald-600 text-xs font-semibold uppercase tracking-widest"
                >
                  Ideal Guests
                </motion.span>
                <motion.h2
                  variants={fadeUp(0.1)}
                  className="text-2xl font-bold text-gray-900 mt-2 mb-5 leading-tight"
                >
                  Best For
                </motion.h2>
                <motion.div
                  variants={fadeUp(0.2)}
                  className="flex flex-wrap gap-3"
                >
                  {resort.bestFor.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold px-5 py-2 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.section>
            )}
          </div>

          {/* ── Booking Sidebar ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-emerald-700 to-emerald-600 p-6 text-white">
                <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest mb-1">
                  Starting from
                </p>
                <p className="text-3xl font-extrabold">₹{resort.price}</p>
                <p className="text-emerald-200 text-xs font-light mt-1">
                  per night · all taxes included
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* Check-in */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                  />
                </div>

                {/* Rooms */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Rooms
                  </label>
                  <div className="relative">
                    <FaDoorOpen
                      size={13}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
                    />
                    <select
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 appearance-none bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Room" : "Rooms"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Guests
                  </label>
                  <div className="relative">
                    <FaUsers
                      size={13}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
                    />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 appearance-none bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-light">Total Price</p>
                    <p className="text-xs text-gray-400 font-light">
                      {totalNights > 0
                        ? `${totalNights} night${totalNights > 1 ? "s" : ""} × ${rooms} room${rooms > 1 ? "s" : ""}`
                        : "Select dates to calculate"}
                    </p>
                  </div>
                  <p className="text-2xl font-extrabold text-emerald-700">
                    {totalPrice > 0 ? `₹${totalPrice.toLocaleString()}` : "—"}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-100 text-sm flex items-center justify-center gap-2"
                >
                  Book Now
                  <FaArrowRight size={11} />
                </button>
                <button className="w-full border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 font-semibold py-3.5 rounded-2xl transition-all duration-300 text-sm">
                  Contact Support
                </button>

                {/* Trust badges */}
                <div className="pt-2 space-y-2.5">
                  {[
                    "Free cancellation up to 48 hours",
                    "Best price guarantee",
                    "24/7 guest support",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-gray-500 text-xs font-light"
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs font-light">
              <FaShieldAlt size={11} className="text-emerald-400" />
              Secured by Razorpay · SSL Encrypted
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResortDetail;