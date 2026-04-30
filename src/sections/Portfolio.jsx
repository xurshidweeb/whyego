import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  X,
  ExternalLink,
  Play,
  Code,
  Palette,
  Video,
  Maximize2,
} from "lucide-react";
import DesignGallery from "../components/DesignGallery";
import VideoGallery from "../components/VideoGallery";
import WebGallery from "../components/WebGallery";

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

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

  const filters = [
    { id: "all", name: "All Projects", icon: Code },
    { id: "web", name: "Web Development", icon: Code },
    { id: "design", name: "Design", icon: Palette },
    { id: "video", name: "Video Editing", icon: Video },
  ];

  const projects = [
    {
      id: 1,
      title: "Noctella",
      category: "web",
      description: "Zamonaviy veb platforma",
      image: "https://via.placeholder.com/400x300/0a0a0a/00d9ff?text=Noctella",
      tags: ["React", "Node.js", "E-commerce"],
      liveUrl: "https://noctella.uz/",
      details:
        "Noctella - zamonaviy e-commerce platformasi. Foydalanuvchilarga qulay interfeys, tez qidiruv va xavfsiz toʻlov tizimi bilan yangilangan veb-tajariba taqdim etadi.",
    },
    {
      id: 2,
      title: "CodeLure",
      category: "web",
      description: "Dasturlash oʻquv platformasi",
      image: "https://via.placeholder.com/400x300/0a0a0a/8b5cf6?text=CodeLure",
      tags: ["Education", "React", "Interactive"],
      liveUrl: "https://codelure.uz/",
      details:
        "CodeLure - zamonaviy dasturlash oʻquv platformasi. Turli darajadagi kurslar, interaktiv topshiriqlar va real-vaqt feedback tizemi orqali oʻrganishni osonlashtiradi.",
    },
    {
      id: 3,
      title: "ITTime Academy",
      category: "web",
      description: "IT taʻlim markazi",
      image: "https://via.placeholder.com/400x300/0a0a0a/ec4899?text=ITTime",
      tags: ["Education", "Web Design", "UI/UX"],
      liveUrl: "https://ittime-academy.uz/",
      details:
        "ITTime Academy - IT sohasi boʻyicha sertifikatlangan taʻlim markazi. Laboratoriya va amaliy mashgʻulotlar bilan yuqori sifatli taʻlim beradi.",
    },
    {
      id: 4,
      title: "Robo School",
      category: "web",
      description: "Robotika oʻquv markazi",
      image:
        "https://via.placeholder.com/400x300/0a0a0a/10b981?text=RoboSchool",
      tags: ["Robotics", "Education", "STEM"],
      liveUrl: "https://www.robo-school.uz/",
      details:
        "Robo School - yoshlarga robotika va STEM taʻlimi beruvchi xususiy instituti. Interaktiv darslar va haqiqiy loyihalar orqali ijodiy fikrlashni rivojlantiradi.",
    },
    {
      id: 5,
      title: "Avto-Service",
      category: "web",
      description: "Avtomobil taʻmirash xizmatlari",
      image:
        "https://via.placeholder.com/400x300/0a0a0a/f59e0b?text=AutoService",
      tags: ["Business", "Service", "Web Design"],
      liveUrl: "https://avto-service.uz/",
      details:
        "Avto-Service - professional avtomobil taʻmirash va texnik xizmatlar koʻrsatuvchi kompaniya. Zamonaviy texnologiyalar va mutaxassislarga ishonishingiz mumkin.",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const ProjectCard = ({ project }) => {
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
        onClick={() => setSelectedProject(project)}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-dark-card">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          {/* Category Badge */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white/80 border border-white/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.category}
          </motion.div>

          {/* Play/View Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/15">
              {project.category === "video" ? (
                <Play className="w-8 h-8 text-white/85" />
              ) : (
                <Maximize2 className="w-8 h-8 text-white/85" />
              )}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:opacity-90 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/70 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              className="flex-1 px-4 py-2 glass-button rounded-xl text-white/90 text-sm font-medium transition-colors"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
              }}
            >
              Detallar
            </motion.button>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 glass-button rounded-xl text-white/85 transition-colors"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const Modal = () => {
    if (!selectedProject) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProject(null)}
      >
        <motion.div
          className="glass-surface max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-t-2xl">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-glow"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {selectedProject.title}
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {selectedProject.details}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/75 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {selectedProject.liveUrl && (
                <motion.a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass-button text-white font-semibold rounded-xl transition-transform cursor-glow flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={20} />
                  Ko'rish
                </motion.a>
              )}
              {selectedProject.githubUrl && (
                <motion.a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass-button text-white/90 font-semibold rounded-xl transition-all cursor-glow flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code size={20} />
                  Kodni Ko'rish
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="glass-text">Loyihalar</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Veb-saytlar, dizayn va video montajdan turli loyihalar.
            </p>
            <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all cursor-glow flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? "glass-button text-white"
                    : "glass-button text-white/75"
                }`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <filter.icon size={18} />
                {filter.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Content Sections */}
          {activeFilter === "design" && (
            <motion.div variants={itemVariants}>
              <DesignGallery />
            </motion.div>
          )}
          
          {activeFilter === "video" && (
            <motion.div variants={itemVariants}>
              <VideoGallery />
            </motion.div>
          )}

          {/* Web Projects Grid */}
          {(activeFilter === "all" || activeFilter === "web") && (
            <motion.div variants={itemVariants}>
              <WebGallery />
            </motion.div>
          )}

          {/* Empty State */}
          {((activeFilter === "all" || activeFilter === "web") && 
            filteredProjects.filter(project => activeFilter === "all" ? project.category === "web" : true).length === 0) && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <Modal />
    </section>
  );
};

export default Portfolio;
