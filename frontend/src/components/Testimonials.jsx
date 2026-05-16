import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
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
    <section style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-gradient-to-b from-gray-50 to-white py-24">
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
  );
};

export default Testimonials;
