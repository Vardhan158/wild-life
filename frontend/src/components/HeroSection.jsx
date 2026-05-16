import React, { useEffect, useState } from "react";
import {
  FaLeaf,
  FaTree,
  FaMapMarkedAlt,
  FaCamera,
  FaStar,
  FaArrowRight,
  FaPaw,
} from "react-icons/fa";
import waterfallVideo from "../assets/Safari_video/Waterfall_video (1).mp4";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HeroSection = () => {
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const services = [
    {
      icon: <FaMapMarkedAlt size={26} />,
      title: "Guided Jungle Tours",
      desc: "Explore lush wilderness with expert naturalist guides and encounter breathtaking wildlife up close.",
      tag: "Most Popular",
      tagStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-600",
      accentColor: "border-emerald-400",
    },
    {
      icon: <FaTree size={26} />,
      title: "Eco-Luxury Stays",
      desc: "Rest in stunning treehouse lodges and eco-retreats blending nature's serenity with modern comfort.",
      tag: "Premium",
      tagStyle: "bg-amber-50 text-amber-700 border-amber-200",
      iconBg: "bg-amber-100 text-amber-600",
      accentColor: "border-amber-400",
    },
    {
      icon: <FaCamera size={26} />,
      title: "Wildlife Photography",
      desc: "Capture golden-hour wildlife moments guided by seasoned photographers who know every trail.",
      tag: "New",
      tagStyle: "bg-sky-50 text-sky-700 border-sky-200",
      iconBg: "bg-sky-100 text-sky-600",
      accentColor: "border-sky-400",
    },
  ];

  const stats = [
    { value: "15K+", label: "Happy Adventurers", icon: "😊" },
    { value: "50+", label: "Safari Destinations", icon: "🗺️" },
    { value: "200+", label: "Species Spotted", icon: "🦁" },
    { value: "4.9★", label: "Average Rating", icon: "⭐" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Wildlife Photographer",
      quote: "The most magical experience of my life. The guides knew every bird call by name.",
      rating: 5,
      avatar: "PS",
      avatarBg: "bg-emerald-100 text-emerald-700",
    },
    {
      name: "Arjun Mehta",
      role: "Nature Enthusiast",
      quote: "Eco-luxury stay was beyond words. Woke up to elephants grazing outside our treehouse!",
      rating: 5,
      avatar: "AM",
      avatarBg: "bg-amber-100 text-amber-700",
    },
    {
      name: "Sneha Patel",
      role: "Travel Blogger",
      quote: "WildlifeStay redefined what it means to connect with nature. Simply unforgettable.",
      rating: 5,
      avatar: "SP",
      avatarBg: "bg-sky-100 text-sky-700",
    },
  ];

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="overflow-x-hidden bg-white text-gray-800"
    >
      <Navbar />

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
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

      <section className="bg-emerald-600">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-emerald-500/40 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center px-4 py-8 text-center">
              <span className="mb-1 text-2xl">{stat.icon}</span>
              <span className="text-3xl font-extrabold leading-none text-white">{stat.value}</span>
              <span className="mt-1 text-xs font-medium text-emerald-100">{stat.label}</span>
              
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              What We Offer
            </span>
            <h2 className="mt-3 mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Curated Safari <span className="text-emerald-600">Experiences</span>
            </h2>
            <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-gray-500 md:text-lg">
              Every journey is thoughtfully crafted to bring you closer to the natural world while leaving the lightest footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                className={`group relative cursor-pointer rounded-3xl border-2 bg-white p-8 transition-all duration-300 ${
                  activeService === index
                    ? `${service.accentColor} -translate-y-2 shadow-2xl`
                    : "border-gray-100 shadow-md hover:shadow-xl"
                }`}
              >
                <span className={`absolute top-6 right-6 rounded-full border px-3 py-1 text-xs font-semibold ${service.tagStyle}`}>
                  {service.tag}
                </span>

                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${service.iconBg}`}>
                  {service.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-sm font-light leading-relaxed text-gray-500">{service.desc}</p>

                <div
                  className={`mt-6 flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                    activeService === index ? "text-emerald-600" : "text-gray-300"
                  }`}
                >
                  Explore
                  <FaArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Why Choose Us
            </span>
            <h2 className="mt-3 mb-5 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Travel That Gives <span className="text-emerald-600">Back to Nature</span>
            </h2>
            <p className="mb-8 font-light leading-relaxed text-gray-500">
              We partner with local communities and conservation programs to ensure
              every safari contributes directly to wildlife protection and habitat preservation.
            </p>
            <ul className="space-y-4">
              {[
                "Certified eco-friendly accommodations",
                "Local community employment & empowerment",
                "Carbon offset for every booking",
                "Wildlife conservation fund contributions",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <FaLeaf size={10} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="group mt-10 inline-flex items-center gap-3 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition-all duration-300 hover:bg-emerald-700">
              Our Conservation Story
              <FaArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="relative hidden h-72 md:block md:h-96">
            <div className="absolute top-0 right-8 h-64 w-60 rotate-6 rounded-3xl bg-amber-100" />
            <div className="absolute top-4 right-4 h-64 w-60 -rotate-2 rounded-3xl bg-emerald-100" />
            <div className="absolute top-8 right-0 flex h-64 w-60 flex-col items-center justify-center gap-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
              <FaPaw size={44} className="text-emerald-500" />
              <p className="text-center text-lg font-bold leading-snug text-gray-800">
                Wildlife
                <br />
                Preserved
              </p>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                Since 2015
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Traveller Stories
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Voices from the Wild
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <FaStar key={si} size={13} className="text-amber-400" />
                  ))}
                </div>
                <p className="flex-1 text-sm font-light leading-relaxed text-gray-600">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${t.avatarBg}`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-emerald-600 py-20">
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

      <Footer />
    </div>
  );
};


export default HeroSection;
