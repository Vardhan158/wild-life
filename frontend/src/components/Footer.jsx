import React from "react";
import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  `}</style>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Safaris", to: "/safari" },
  { label: "Resorts", to: "/resorts" },
  { label: "Bookings", to: "/bookings" },
  { label: "Contact", to: "/contact" },
];

const supportLinks = [
  { label: "FAQs", to: "#" },
  { label: "Booking Policy", to: "#" },
  { label: "Travel Insurance", to: "#" },
  { label: "Sustainability", to: "#" },
  { label: "Blog", to: "#" },
];

const contactInfo = [
  { icon: <FaMapMarkerAlt size={13} />, text: "Bandipur National Park, Karnataka, India" },
  { icon: <FaPhone size={13} />, text: "+91-98765-43210" },
  { icon: <FaEnvelope size={13} />, text: "contact@wildlifestay.com" },
];

const socials = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Twitter / X", href: "#", Icon: TwitterIcon },
];

const Footer = () => {
  return (
    <>
      <FontLoader />
      <footer
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="bg-gray-50 border-t border-gray-100 w-full"
      >
        {/* Main grid */}
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="sm:col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-emerald-600" size={20} />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Wildlife<span className="text-emerald-600">Stay</span>
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed font-light mb-5">
              Crafted with 🌿 for nature lovers. We believe in travel that protects
              what we love. Reconnect with the wild.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-emerald-600 hover:border-emerald-600 text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Eco badge */}
            <div className="mt-5 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <FaLeaf size={10} />
              Eco-certified operator
            </div>
          </div>

          {/* ── Explore links ── */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-5 uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-3">
              {navLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-500 hover:text-emerald-600 text-sm font-light transition-colors duration-200 flex items-center gap-1.5 group"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-emerald-500 text-xs">
                      ▸
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support links ── */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-5 uppercase tracking-widest">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-500 hover:text-emerald-600 text-sm font-light transition-colors duration-200 flex items-center gap-1.5 group"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-emerald-500 text-xs">
                      ▸
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-5 uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
              {contactInfo.map(({ icon, text }, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-500 text-sm font-light">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">{icon}</span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Book CTA */}
            <Link
              to="/bookings"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200"
              style={{ textDecoration: "none" }}
            >
              Book a Safari
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-200 py-5">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-400 text-xs font-light">
              © {new Date().getFullYear()}{" "}
              <span className="text-emerald-600 font-medium">WildlifeStay</span>
              . All rights reserved. Protecting nature, one adventure at a time.
            </p>

            <div className="flex items-center gap-1.5 text-xs font-light text-gray-400">
              <FaLeaf size={10} className="text-emerald-500" />
              Crafted for Nature Lovers
            </div>

            <div className="flex items-center gap-4 text-xs font-light">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-emerald-600 transition-colors duration-200"
                  style={{ textDecoration: "none" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;