import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Maximize2 } from 'lucide-react';

const WebGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Auto-detect web images with corresponding links
  const webProjects = [
    { 
      id: 1, 
      src: '/web/noctella.png', 
      alt: 'Noctella', 
      title: 'Noctella',
      url: 'https://noctella.uz/'
    },
    { 
      id: 2, 
      src: '/web/codelure.png', 
      alt: 'CodeLure', 
      title: 'CodeLure',
      url: 'https://codelure.uz/'
    },
    { 
      id: 3, 
      src: '/web/ittime.png', 
      alt: 'ITTime Academy', 
      title: 'ITTime Academy',
      url: 'https://ittime-academy.uz/'
    },
    { 
      id: 4, 
      src: '/web/robo-school.png', 
      alt: 'Robo School', 
      title: 'Robo School',
      url: 'https://www.robo-school.uz/'
    },
    { 
      id: 5, 
      src: '/web/auto-service.png', 
      alt: 'Auto Service', 
      title: 'Auto Service',
      url: 'https://avto-service.uz/'
    },
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

  const WebCard = ({ project }) => {
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
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-dark-card">
          <img
            src={project.src}
            alt={project.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onClick={() => setSelectedImage(project)}
          />

          {/* Glass Reflection Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          {/* View Icon */}
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
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:opacity-90 transition-colors">
            {project.title}
          </h3>
          
          {/* Action Button */}
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 glass-button rounded-xl text-white/90 text-sm font-medium transition-colors w-full justify-center"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
            Saytni ko'rish
          </motion.a>
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
        {webProjects.map((project) => (
          <WebCard key={project.id} project={project} />
        ))}
      </motion.div>
      
      <ImageModal />
    </>
  );
};

export default WebGallery;
