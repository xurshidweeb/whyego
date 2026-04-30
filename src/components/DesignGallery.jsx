import { motion } from 'framer-motion';
import { useState } from 'react';
import { Maximize2 } from 'lucide-react';

const DesignGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Auto-detect design images
  const designImages = [
    { id: 1, src: '/design/design1.png', alt: 'Design Work 1' },
    { id: 2, src: '/design/design2.png', alt: 'Design Work 2' },
    { id: 3, src: '/design/design3.png', alt: 'Design Work 3' },
    { id: 4, src: '/design/design4.png', alt: 'Design Work 4' },
    { id: 5, src: '/design/design5.png', alt: 'Design Work 5' },
    { id: 6, src: '/design/design6.png', alt: 'Design Work 6' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9],
      },
    },
  };

  const ImageCard = ({ image }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        variants={itemVariants}
        className="glass-surface rounded-2xl overflow-hidden cursor-glow group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedImage(image)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-dark-card">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Glass Reflection Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          {/* Hover Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/15">
              <Maximize2 className="w-8 h-8 text-white/85" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
            {image.alt}
          </h3>
        </div>
      </motion.div>
    );
  };

  const ImageModal = () => {
    if (!selectedImage) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedImage(null)}
      >
        <div className="max-w-5xl w-full max-h-[90vh] mx-auto">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
            />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-glow"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {designImages.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </motion.div>
      
      <ImageModal />
    </>
  );
};

export default DesignGallery;
