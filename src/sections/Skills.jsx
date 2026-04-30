import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Code2, 
  Palette, 
  Video, 
  Globe, 
  Smartphone, 
  Cpu,
  Layout,
  Braces,
  Paintbrush,
  PenTool,
  Wand2,
  Clapperboard,
  Sparkles
} from 'lucide-react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeCategory, setActiveCategory] = useState('all');

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

  const categories = [
    { id: 'all', name: 'Barchasi', icon: Cpu },
    { id: 'frontend', name: 'Frontend', icon: Code2 },
    { id: 'design', name: 'Dizayn', icon: Palette },
    { id: 'video', name: 'Video', icon: Video },
  ];

  const skills = {
    frontend: [
      { name: 'HTML', icon: Layout, level: 95, color: 'text-orange-500' },
      { name: 'CSS', icon: Paintbrush, level: 90, color: 'text-blue-500' },
      { name: 'JavaScript', icon: Braces, level: 88, color: 'text-yellow-500' },
      { name: 'React', icon: Sparkles, level: 85, color: 'text-cyan-500' },
      { name: 'Tailwind CSS', icon: Globe, level: 92, color: 'text-teal-500' },
      { name: 'Responsive Design', icon: Smartphone, level: 90, color: 'text-green-500' },
    ],
    design: [
      { name: 'Figma', icon: PenTool, level: 88, color: 'text-purple-500' },
      { name: 'Photoshop', icon: Wand2, level: 85, color: 'text-blue-600' },
      { name: 'UI/UX Design', icon: Palette, level: 82, color: 'text-pink-500' },
      { name: 'Brand Identity', icon: Globe, level: 78, color: 'text-indigo-500' },
    ],
    video: [
      { name: 'After Effects', icon: Wand2, level: 85, color: 'text-purple-600' },
      { name: 'Premiere Pro', icon: Clapperboard, level: 88, color: 'text-blue-700' },
      { name: 'Motion Graphics', icon: Video, level: 82, color: 'text-red-500' },
      { name: 'Color Grading', icon: Palette, level: 80, color: 'text-orange-500' },
    ],
  };

  const allSkills = [...skills.frontend, ...skills.design, ...skills.video];

  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : skills[activeCategory] || [];

  const SkillCard = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        key={skill.name}
        variants={itemVariants}
        className="glass-surface p-6 cursor-glow relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.03,
          y: -2
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className={`${skill.color}`}
              whileHover={{ rotate: 12, scale: 1.06 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <skill.icon size={32} />
            </motion.div>
            <motion.span
              className="text-2xl font-semibold text-white/85"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {skill.level}%
            </motion.span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-3">{skill.name}</h3>

          {/* Progress bar */}
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/60 to-white/25 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? `${skill.level}%` : '0%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
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
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="glass-text">Ko‘nikmalar</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Dasturlash, dizayn va video yo‘nalishlarida g‘oyalarni hayotga olib chiqadigan texnologiyalar va uslublar.
            </p>
            <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all cursor-glow flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'glass-button text-white'
                    : 'glass-button text-white/75'
                }`}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon size={18} />
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="glass-surface p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Doim <span className="text-white/90">o‘rganaman</span>, doim <span className="text-white/90">o‘saman</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Raqamli olam doim o‘zgaradi — men ham. Veb dasturlash, dizayn trendlar va video ishlab chiqarishdagi
                yangi texnologiyalar hamda uslublarni muntazam o‘rganib boraman.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {['Next.js', 'TypeScript', 'Three.js', 'WebGL', 'Blender', 'DaVinci Resolve'].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/75 font-medium cursor-glow"
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
