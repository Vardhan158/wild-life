import React from "react";
import { FaLeaf, FaPaw, FaArrowRight } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-white py-20">
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
  );
};

export default WhyChooseUs;
