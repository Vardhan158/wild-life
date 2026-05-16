import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

function Home() {
  const [safaris, setSafaris] = useState([]);
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [safariRes, resortRes] = await Promise.all([
          axios.get('http://localhost:5000/admin/safari'),
          axios.get('http://localhost:5000/admin/resort')
        ]);
        setSafaris((safariRes.data.safaris || []).slice(0, 3));
        setResorts((resortRes.data.resorts || []).slice(0, 3));
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroBanner />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-16">
          
          {/* Featured Safaris */}
          {safaris.length > 0 && (
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Featured Safaris</h2>
                  <p className="text-gray-600 mt-2">Embark on thrilling wildlife journeys</p>
                </div>
                <Link to="/safari" className="text-green-600 font-semibold hover:text-green-800 transition">
                  View All Safaris &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {safaris.map(pkg => (
                  <div key={pkg._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-4 right-4 bg-yellow-400 text-green-900 px-3 py-1 rounded-full font-bold text-sm">
                        {pkg.price}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <FaClock className="text-green-600" /> {pkg.duration}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{pkg.description}</p>
                      <Link to={`/safari/${pkg._id}`} className="block text-center w-full bg-green-50 text-green-700 hover:bg-green-600 hover:text-white font-semibold py-2 rounded transition-colors">
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Luxury Stays */}
          {resorts.length > 0 && (
            <section className="mt-16">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Luxury Stays</h2>
                  <p className="text-gray-600 mt-2">Relax in our premium resorts</p>
                </div>
                <Link to="/resorts" className="text-blue-600 font-semibold hover:text-blue-800 transition">
                  Explore Resorts &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {resorts.map(resort => (
                  <div key={resort._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      <img src={resort.image} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {resort.type}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{resort.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <FaMapMarkerAlt className="text-red-500" /> {resort.location}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{resort.description}</p>
                      <Link to={`/resorts/${resort._id}`} className="block text-center w-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold py-2 rounded transition-colors">
                        View Resort
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
