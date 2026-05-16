import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaClock, FaStar, FaArrowLeft, FaCheck, FaLeaf, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

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
  show: { transition: { staggerChildren: 0.12 } },
};

const SafariDetail = () => {
  const MAX_ONLINE_PAYMENT_AMOUNT = 100000;
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [safari, setSafari] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!document.querySelector('#poppins-link')) {
      const el = document.createElement('link');
      el.id = 'poppins-link';
      el.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap';
      el.rel = 'stylesheet';
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const fetchSafariDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/safari/${id}`);
        setSafari(response.data.safari);
      } catch (error) {
        console.error('Error fetching safari details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSafariDetails();
  }, [id]);

  /* ── Loading ──────────────────────────────────────────── */
  if (loading) {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-white">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-emerald-700 font-semibold text-lg">Loading Safari Details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Not Found ────────────────────────────────────────── */
  if (!safari) {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-white">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-5">
          <span className="text-6xl">🌿</span>
          <p className="text-2xl font-bold text-gray-800">Safari Not Found</p>
          <button
            onClick={() => navigate('/safari')}
            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-emerald-700 transition-all duration-300"
          >
            Back to Safaris
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const basePrice = parseInt(safari.price?.replace(/[^0-9]/g, '')) || 0;
  const totalPrice = basePrice * groupSize;

  const handleBooking = async () => {
    if (!selectedDate) {
      alert('Please select a safari date');
      return;
    }
    if (totalPrice <= 0) {
      alert('Invalid safari amount');
      return;
    }
    if (totalPrice > MAX_ONLINE_PAYMENT_AMOUNT) {
      alert(`Online payment is currently limited to ₹${MAX_ONLINE_PAYMENT_AMOUNT.toLocaleString()} per booking.`);
      return;
    }
    try {
      const { data } = await axios.post('http://localhost:5000/payment/create-order', { amount: totalPrice });
      const options = {
        key: 'rzp_test_SjC9thwdLWFQ8m',
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'WildLifeStay',
        description: 'Safari Booking Payment',
        image: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
        order_id: data.order.id,
        handler: async function (response) {
          await axios.post('http://localhost:5000/payment/verify-payment', response);
          await axios.post(
            'http://localhost:5000/bookings',
            {
              serviceType: 'safari',
              serviceId: safari._id,
              serviceName: safari.name,
              serviceImage: safari.image,
              bookingDate: selectedDate,
              groupSize,
              totalAmount: totalPrice,
              paymentStatus: 'paid',
              paymentOrderId: data.order.id,
              paymentId: response.razorpay_payment_id,
              paymentSignature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert(`Payment successful! Your safari booking has been sent to admin for confirmation${user?.userName ? `, ${user.userName}` : ''}.`);
        },
        prefill: {
          name: user?.userName || 'Guest User',
          email: user?.email || 'guest@example.com',
          contact: '9999999999',
        },
        notes: { safariName: safari.name, bookingDate: selectedDate, groupSize },
        theme: { color: '#059669' },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(error.response?.data?.message || 'Unable to process payment right now');
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-white text-gray-800 overflow-x-hidden">
      <Navbar />

      {/* ── Back bar ──────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/safari')}
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-semibold text-sm transition-colors duration-200"
          >
            <FaArrowLeft size={12} /> Back to Safaris
          </button>
        </div>
      </div>

      {/* ── Hero Image ────────────────────────────────────── */}
      <div className="relative h-72 sm:h-96 md:h-[480px] overflow-hidden">
        <img
          src={safari.image}
          alt={safari.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://placehold.co/1200x480/d1fae5/065f46?text=Safari'; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hero text */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl w-full mx-auto px-6 pb-8 md:pb-12">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div
                variants={fadeUp(0)}
                className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-emerald-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm mb-3"
              >
                <FaLeaf size={9} /> Wildlife Safari
              </motion.div>

              <motion.h1
                variants={fadeUp(0.1)}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight"
              >
                {safari.name}
              </motion.h1>

              <motion.div variants={fadeUp(0.2)} className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-2 text-white/90 text-sm font-medium">
                  <FaClock size={13} className="text-emerald-400" /> {safari.duration}
                </span>
                <span className="flex items-center gap-2 text-white/90 text-sm font-medium">
                  <FaStar size={13} className="text-amber-400" /> {safari.rating || '4.9'} Rating
                </span>
                <span className="bg-amber-400 text-emerald-900 text-lg font-extrabold px-5 py-1.5 rounded-full shadow-lg">
                  {safari.price}
                  <span className="text-xs font-medium ml-1 opacity-70">/ person</span>
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

            {/* Overview */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              <motion.span variants={fadeUp(0)} className="text-emerald-600 text-xs font-semibold uppercase tracking-widest">
                About This Safari
              </motion.span>
              <motion.h2 variants={fadeUp(0.1)} className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
                Overview
              </motion.h2>
              <motion.p variants={fadeUp(0.2)} className="text-gray-500 leading-relaxed font-light text-sm md:text-base">
                {safari.description}
              </motion.p>
            </motion.section>

            {/* Highlights */}
            {safari.highlights?.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
              >
                <motion.span variants={fadeUp(0)} className="text-emerald-600 text-xs font-semibold uppercase tracking-widest">
                  Inclusions
                </motion.span>
                <motion.h2 variants={fadeUp(0.1)} className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
                  What's Included
                </motion.h2>
                <motion.div variants={fadeUp(0.2)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {safari.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheck size={9} className="text-emerald-600" />
                      </span>
                      <span className="text-gray-700 text-sm font-light leading-snug">{highlight}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.section>
            )}

            {/* Itinerary */}
            {safari.itinerary?.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
              >
                <motion.span variants={fadeUp(0)} className="text-emerald-600 text-xs font-semibold uppercase tracking-widest">
                  Day by Day
                </motion.span>
                <motion.h2 variants={fadeUp(0.1)} className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
                  Itinerary
                </motion.h2>
                <motion.div variants={fadeUp(0.2)} className="space-y-5">
                  {safari.itinerary.map((day, index) => (
                    <div key={index} className="flex gap-5">
                      {/* Day badge + line */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                          D{day.day}
                        </div>
                        {index < safari.itinerary.length - 1 && (
                          <div className="w-px flex-1 bg-emerald-200 mt-2" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-6 flex-1">
                        <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug">
                          Day {day.day}: {day.title}
                        </h3>
                        <ul className="space-y-2">
                          {(day.activities || []).map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-gray-500 text-sm font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.section>
            )}

            {/* Included / Not Included */}
            {((safari.included?.length > 0) || (safari.notIncluded?.length > 0)) && (
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {safari.included?.length > 0 && (
                  <motion.div variants={fadeUp(0)} className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6">
                    <h3 className="text-base font-bold text-emerald-800 mb-4 flex items-center gap-2">
                      <FaCheck size={12} className="text-emerald-600" /> Included
                    </h3>
                    <ul className="space-y-2.5">
                      {safari.included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-gray-600 text-sm font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {safari.notIncluded?.length > 0 && (
                  <motion.div variants={fadeUp(0.1)} className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
                    <h3 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
                      <span className="text-gray-400 text-sm font-bold">✕</span> Not Included
                    </h3>
                    <ul className="space-y-2.5">
                      {safari.notIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-gray-500 text-sm font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.section>
            )}

            {/* Best For */}
            {safari.bestFor?.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
              >
                <motion.span variants={fadeUp(0)} className="text-emerald-600 text-xs font-semibold uppercase tracking-widest">
                  Ideal Travellers
                </motion.span>
                <motion.h2 variants={fadeUp(0.1)} className="text-2xl font-bold text-gray-900 mt-2 mb-5 leading-tight">
                  Best For
                </motion.h2>
                <motion.div variants={fadeUp(0.2)} className="flex flex-wrap gap-3">
                  {safari.bestFor.map((tag, idx) => (
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
              {/* Sidebar header */}
              <div className="bg-gradient-to-br from-emerald-700 to-emerald-600 p-6 text-white">
                <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest mb-1">Starting from</p>
                <p className="text-3xl font-extrabold">{safari.price}</p>
                <p className="text-emerald-200 text-xs font-light mt-1">per person · all taxes included</p>
              </div>

              <div className="p-6 space-y-4">
                {/* Date picker */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Safari Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                  />
                </div>

                {/* Group size */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Group Size
                  </label>
                  <div className="relative">
                    <FaUsers size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 appearance-none bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((size) => (
                        <option key={size} value={size}>
                          {size} {size === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Total price */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-light">Total Price</p>
                    <p className="text-xs text-gray-400 font-light">{groupSize} × {safari.price}</p>
                  </div>
                  <p className="text-2xl font-extrabold text-emerald-700">
                    ₹{totalPrice.toLocaleString()}
                  </p>
                </div>

                {/* CTA buttons */}
                <button
                  onClick={handleBooking}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-100 text-sm"
                >
                  Pay & Book Now
                </button>
                <button className="w-full border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 font-semibold py-3.5 rounded-2xl transition-all duration-300 text-sm">
                  Contact Support
                </button>

                {/* Trust badges */}
                <div className="pt-2 space-y-2.5">
                  {[
                    { icon: '✓', text: 'Free cancellation up to 7 days' },
                    { icon: '✓', text: 'Best price guarantee' },
                    { icon: '✓', text: '24/7 customer support' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-gray-500 text-xs font-light">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.icon}
                      </span>
                      {item.text}
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

export default SafariDetail;