import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/gallery');
        setGalleryImages(response.data.images || []);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const openImage = (index) => {
    setSelectedImage(galleryImages[index]);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const next = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(next);
    setSelectedImage(galleryImages[next]);
  };

  const prevImage = () => {
    const prev = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prev);
    setSelectedImage(galleryImages[prev]);
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-purple-800 via-purple-700 to-purple-900 text-white py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6">Wildlife Photography Gallery</h1>
          <p className="text-xl text-purple-100 mb-8">
            Stunning moments captured during our exclusive safari adventures
          </p>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <section className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-purple-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Explore Our Collection
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image._id || index}
                variants={itemVariants}
                onClick={() => openImage(index)}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer group"
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-gray-300 text-sm flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-400" size={12} />
                    {image.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal Lightbox */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={closeImage}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition z-60"
          >
            <FaTimes size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition"
          >
            <FaChevronLeft size={40} />
          </button>

          <motion.div
            className="max-w-4xl w-full max-h-[90vh] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
            />
            <div className="bg-gray-900 p-6 rounded-lg mt-4">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300 flex items-center gap-2 mb-3">
                <FaMapMarkerAlt className="text-red-400" />
                {selectedImage.location}
              </p>
              <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                {selectedImage.category}
              </span>
              <p className="text-gray-400 leading-relaxed">{selectedImage.description}</p>
              <p className="text-gray-500 text-sm mt-4">
                {currentIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </motion.div>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition"
          >
            <FaChevronRight size={40} />
          </button>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
