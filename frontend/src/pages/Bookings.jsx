import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import {
  FaLeaf,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaReceipt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

/* ── Status Styles ────────────────────────────────────── */
const adminStatusStyle = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-600 border-red-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
};

const paymentStatusStyle = {
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  not_required: 'bg-sky-50 text-sky-700 border-sky-200',
  failed: 'bg-red-50 text-red-600 border-red-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
};

const adminStatusDot = {
  confirmed: 'bg-emerald-500',
  rejected: 'bg-red-500',
  pending: 'bg-amber-400',
};

/* ── Animation Variants ───────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ── Component ────────────────────────────────────────── */
const Bookings = () => {
  const { token, user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!document.querySelector('#poppins-link')) {
      const el = document.createElement('link');
      el.id = 'poppins-link';
      el.href =
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap';
      el.rel = 'stylesheet';
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setError('Please log in again to view your bookings.');
        setLoading(false);
        return;
      }
      try {
        setError('');
        const response = await axios.get('http://localhost:5000/bookings/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data.bookings || []);
      } catch (fetchError) {
        console.error('Error fetching user bookings:', fetchError);
        setError(fetchError.response?.data?.message || 'Unable to load your bookings right now.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  /* ── Summary counts ───────────────────────────────── */
  const confirmed = bookings.filter((b) => b.adminStatus === 'confirmed').length;
  const pending = bookings.filter((b) => b.adminStatus === 'pending').length;
  const totalSpent = bookings.reduce((sum, b) => sum + Number(b.totalAmount || 0), 0);

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="bg-white text-gray-800 overflow-x-hidden min-h-screen"
    >
      <Navbar />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div
              variants={fadeUp(0)}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-200 text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full backdrop-blur-sm mb-5"
            >
              <FaLeaf size={10} /> My Bookings
            </motion.div>

            <motion.h1
              variants={fadeUp(0.1)}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-3"
            >
              Track Your{' '}
              <span className="text-amber-400">Adventures</span>
            </motion.h1>

            <motion.p
              variants={fadeUp(0.2)}
              className="text-emerald-100/80 text-base font-light leading-relaxed max-w-xl"
            >
              {user?.userName
                ? `${user.userName}, here are your latest booking requests and their confirmation status.`
                : 'Here are your latest booking requests and their admin confirmation status.'}
            </motion.p>

            {/* Summary pills — only when data loaded */}
            {!loading && !error && bookings.length > 0 && (
              <motion.div
                variants={fadeUp(0.3)}
                className="flex flex-wrap gap-3 mt-6"
              >
                {[
                  { label: 'Total Bookings', value: bookings.length, icon: '📋' },
                  { label: 'Confirmed', value: confirmed, icon: '✅' },
                  { label: 'Pending', value: pending, icon: '⏳' },
                  { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, icon: '💳' },
                ].map((s, i) => (
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
            )}
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full fill-white">
            <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-64 gap-4">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-emerald-700 font-semibold text-base">Loading your bookings...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 py-16"
          >
            <span className="text-5xl">⚠️</span>
            <p className="text-lg font-bold text-gray-800">Something went wrong</p>
            <p className="text-gray-500 text-sm font-light max-w-sm text-center">{error}</p>
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-5"
          >
            <span className="text-6xl">🌿</span>
            <p className="text-2xl font-bold text-gray-800">No bookings yet</p>
            <p className="text-gray-500 text-sm font-light max-w-sm text-center">
              Once you book a safari or resort, it will appear here for you to track.
            </p>
            <button
              onClick={() => (window.location.href = '/safari')}
              className="mt-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-emerald-700 transition-all duration-300"
            >
              Explore Safaris
            </button>
          </motion.div>
        )}

        {/* Booking Cards */}
        {!loading && !error && bookings.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex flex-col gap-5"
          >
            {bookings.map((booking, index) => (
              <motion.article
                key={booking._id}
                variants={fadeUp(index * 0.06)}
                className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[160px_1fr]">

                  {/* Image */}
                  <div className="relative h-40 sm:h-full min-h-[160px] overflow-hidden bg-gray-100 flex-shrink-0">
                    {booking.serviceImage ? (
                      <img
                        src={booking.serviceImage}
                        alt={booking.serviceName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400 font-light">
                        No image
                      </div>
                    )}
                    {/* Service type overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100 capitalize shadow-sm">
                        {booking.serviceType}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 md:p-6 flex flex-col gap-4">

                    {/* Top row */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
                          {booking.serviceName}
                        </h2>
                      </div>

                      {/* Status badges */}
                      <div className="flex flex-wrap gap-2 flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                            adminStatusStyle[booking.adminStatus] || 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              adminStatusDot[booking.adminStatus] || 'bg-gray-400'
                            }`}
                          />
                          {booking.adminStatus
                            ? booking.adminStatus.charAt(0).toUpperCase() + booking.adminStatus.slice(1)
                            : 'Unknown'}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            paymentStatusStyle[booking.paymentStatus] || 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                        >
                          Payment:{' '}
                          {booking.paymentStatus
                            ? booking.paymentStatus.replace('_', ' ').charAt(0).toUpperCase() +
                              booking.paymentStatus.replace('_', ' ').slice(1)
                            : '—'}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-50" />

                    {/* Meta grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                          <FaReceipt size={10} className="text-emerald-500" /> Amount
                        </span>
                        <span className="text-sm font-bold text-emerald-700">
                          ₹{Number(booking.totalAmount || 0).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                          <FaCalendarAlt size={10} className="text-emerald-500" /> Schedule
                        </span>
                        <span className="text-sm font-light text-gray-700 leading-snug">
                          {booking.bookingDate ||
                            `${booking.checkInDate || '—'} → ${booking.checkOutDate || '—'}`}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                          <FaUsers size={10} className="text-emerald-500" /> Guests
                        </span>
                        <span className="text-sm font-light text-gray-700">
                          {booking.serviceType === 'resort'
                            ? `${booking.guests || 0} guests · ${booking.rooms || 0} rooms`
                            : `${booking.groupSize || 0} people`}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wide">
                          <FaClock size={10} className="text-emerald-500" /> Booked On
                        </span>
                        <span className="text-sm font-light text-gray-700">
                          {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Bookings;