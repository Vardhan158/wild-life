import React, { useState } from "react";
import {
  FaLeaf,
  FaTree,
  FaMapMarkedAlt,
  FaCamera,
  FaArrowRight,
} from "react-icons/fa";

const Services = () => {
  const [activeService, setActiveService] = useState(null);

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

  return (
    <section style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-gray-50 py-24 md:py-32">
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
  );
};

export default Services;
