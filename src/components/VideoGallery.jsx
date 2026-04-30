import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Play, X } from 'lucide-react';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  
  // Auto-detect video files
  const videos = [
    { id: 1, src: '/video/video1.mp4', alt: 'Video Edit 1' },
    { id: 2, src: '/video/video2.mp4', alt: 'Video Edit 2' },
    { id: 3, src: '/video/video3.mp4', alt: 'Video Edit 3' },
    { id: 4, src: '/video/video4.mp4', alt: 'Video Edit 4' },
    { id: 5, src: '/video/video5.mp4', alt: 'Video Edit 5' },
    { id: 6, src: '/video/video6.mp4', alt: 'Video Edit 6' },
    { id: 7, src: '/video/video7.mp4', alt: 'Video Edit 7' },
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

  const VideoCard = ({ video }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      if (hoveredVideo === video.id) {
        videoElement.play();
      } else {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }, [hoveredVideo, video.id]);

    return (
      <motion.div
        variants={itemVariants}
        className="glass-surface rounded-2xl overflow-hidden cursor-glow group"
        onMouseEnter={() => setHoveredVideo(video.id)}
        onMouseLeave={() => setHoveredVideo(null)}
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedVideo(video)}
      >
        {/* Video Container */}
        <div className="relative h-64 overflow-hidden bg-dark-card">
          <video
            ref={videoRef}
            src={video.src}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          />

          {/* Glass Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          {/* Play Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredVideo === video.id ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/15">
              <Play className="w-8 h-8 text-white/85 ml-1" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
            {video.alt}
          </h3>
        </div>
      </motion.div>
    );
  };

  const VideoModal = () => {
    if (!selectedVideo) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedVideo(null)}
      >
        <div className="max-w-5xl w-full max-h-[90vh] mx-auto">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo.src}
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
              controls
              autoPlay
            />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-glow"
            >
              <X size={24} />
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
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </motion.div>
      
      <VideoModal />
    </>
  );
};

export default VideoGallery;
