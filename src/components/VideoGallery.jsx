import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Play, X } from 'lucide-react';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  
  // Auto-detect video files with unique thumbnails
  const videos = [
    { id: 1, src: '/video/video1.mp4', alt: 'Video Edit 1', thumbnail: '/img.jpg' },
    { id: 2, src: '/video/video2.mp4', alt: 'Video Edit 2', thumbnail: '/img.jpg' },
    { id: 3, src: '/video/video3.mp4', alt: 'Video Edit 3', thumbnail: '/img.jpg' },
    { id: 4, src: '/video/video4.mp4', alt: 'Video Edit 4', thumbnail: '/img.jpg' },
    { id: 5, src: '/video/video5.mp4', alt: 'Video Edit 5', thumbnail: '/img.jpg' },
    { id: 6, src: '/video/video6.mp4', alt: 'Video Edit 6', thumbnail: '/img.jpg' },
    { id: 7, src: '/video/video7.mp4', alt: 'Video Edit 7', thumbnail: '/img.jpg' },
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
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);

    // IntersectionObserver for visibility
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            setIsVisible(entry.isIntersecting);
          });
        },
        { threshold: 0.1 }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, []);

    // Video control logic
    useEffect(() => {
      if (!isVisible) return;

      // Stop previous video when hovering new one
      if (activeVideo && activeVideo !== video.id && videoRefs.current[activeVideo]) {
        const prevVideo = videoRefs.current[activeVideo];
        if (prevVideo) {
          prevVideo.pause();
          prevVideo.currentTime = 0;
        }
      }

      const currentVideo = videoRef.current;
      if (!currentVideo) return;

      if (hoveredVideo === video.id) {
        setActiveVideo(video.id);
        
        // Load and play video when data is ready
        currentVideo.onloadeddata = () => {
          setIsVideoReady(true);
          currentVideo.play().catch(e => console.log('Video play failed:', e));
        };
        
        // Start loading
        currentVideo.load();
      } else {
        if (currentVideo) {
          currentVideo.pause();
          currentVideo.currentTime = 0;
        }
        setIsVideoReady(false);
      }
    }, [hoveredVideo, video.id, activeVideo, isVisible]);

    return (
      <motion.div
        ref={cardRef}
        variants={itemVariants}
        className="glass-surface rounded-2xl overflow-hidden cursor-glow group"
        onMouseEnter={() => isVisible && setHoveredVideo(video.id)}
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
          {/* Always render video, control visibility */}
          <video
            ref={videoRef}
            src={video.src}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isVideoReady && hoveredVideo === video.id ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            loop
            playsInline
            preload="none"
            poster={video.thumbnail}
          />
          
          {/* Thumbnail image */}
          <img
            src={video.thumbnail}
            alt={video.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isVideoReady && hoveredVideo === video.id ? 'opacity-0' : 'opacity-100'
            }`}
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
    const modalVideoRef = useRef(null);
    const [isModalVideoReady, setIsModalVideoReady] = useState(false);

    useEffect(() => {
      if (!selectedVideo || !modalVideoRef.current) return;

      const video = modalVideoRef.current;
      
      // Setup video event handlers
      video.onloadeddata = () => {
        setIsModalVideoReady(true);
        video.play().catch(e => console.log('Modal video play failed:', e));
      };

      video.onerror = (e) => {
        console.error('Modal video error:', e);
      };

      // Start loading
      video.load();

      return () => {
        // Cleanup
        video.onloadeddata = null;
        video.onerror = null;
      };
    }, [selectedVideo]);

    const handleClose = () => {
      if (modalVideoRef.current) {
        const video = modalVideoRef.current;
        video.pause();
        video.currentTime = 0;
        video.onloadeddata = null;
        video.onerror = null;
      }
      setIsModalVideoReady(false);
      setSelectedVideo(null);
    };

    if (!selectedVideo) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
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
              ref={modalVideoRef}
              src={selectedVideo.src}
              className={`w-full h-auto max-h-[90vh] object-contain rounded-xl transition-opacity duration-300 ${
                isModalVideoReady ? 'opacity-100' : 'opacity-0'
              }`}
              controls
              preload="none"
            />
            
            {/* Loading indicator */}
            {!isModalVideoReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
              </div>
            )}
            
            {/* Close Button */}
            <button
              onClick={handleClose}
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
