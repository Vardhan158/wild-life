import React, { useState, useEffect } from "react";
import { FaLeaf, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate(isAuthenticated ? "/home" : "/login");
  };

  const navLinks = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Safaris", to: "/safari" },
    { label: "Resorts", to: "/resorts" },
    { label: "Bookings", to: "/bookings" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`flex justify-between items-center py-4 px-8 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Logo */}
      <button
        onClick={handleLogoClick}
        className="flex items-center gap-2 border-none bg-transparent cursor-pointer"
      >
        <FaLeaf className="text-emerald-600" size={20} />
        <span className="text-xl font-bold tracking-tight text-gray-900">
          Wildlife<span className="text-emerald-600">Stay</span>
        </span>
      </button>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
        {navLinks.map((item, i) =>
          item.to ? (
            <Link
              key={i}
              to={item.to}
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={i}
              href={item.href}
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              {item.label}
            </a>
          )
        )}
      </div>

      {/* CTA / Auth */}
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <span className="text-gray-500 text-sm hidden sm:inline">
              Welcome,{" "}
              <span className="font-semibold text-gray-800">{user.userName}</span>
            </span>

            {user.isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full transition-all duration-200"
              >
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-500 px-4 py-2 rounded-full transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-100"
          >
            Book Now
            <FaArrowRight
              size={11}
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;