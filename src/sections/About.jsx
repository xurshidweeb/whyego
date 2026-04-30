import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Video, Palette, Zap } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  const stats = [
    { icon: Code, label: "Loyihalar", value: "50+", color: "text-white/85" },
    { icon: Video, label: "Videolar", value: "100+", color: "text-white/85" },
    { icon: Palette, label: "Dizaynlar", value: "200+", color: "text-white/85" },
    { icon: Zap, label: "Yutuqlar", value: "15+", color: "text-white/85" },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
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
              <span className="glass-text">Men haqimda</span>
            </h2>
            <div className="w-24 h-1 bg-white/20 mx-auto rounded-full" />
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="glass-surface p-8 z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  Ijodkor <span className="text-white/90">dasturchi</span> va <span className="text-white/90">dizayner</span>
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  Men kod va ijod o‘rtasidagi ko‘prikni quradigan raqamli yaratuvchiman.
                  Frontend, video montaj va grafik dizayn tajribam orqali g‘oyalarni tomoshabinni o‘ziga tortadigan,
                  esda qoladigan raqamli tajribaga aylantiraman.
                </p>

                <p className="text-gray-300 leading-relaxed mb-6">
                  Har bir ishda texnik aniqlik va estetikani birlashtiraman: loyiha nafaqat mukammal ishlashi,
                  balki o‘z hikoyasini ham chiroyli yetkazishi kerak.
                  Moslashuvchan veb-ilovalardan tortib, ta’sirli video kontentgacha — doim yangi chegaralarni sinayman.
                </p>

                <div className="flex flex-wrap gap-3">
                  {['Innovatsion', 'Detallarga e’tibor', 'Ijodiy', 'Texnik', 'Ishonchli'].map((trait) => (
                    <motion.span
                      key={trait}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/75 font-medium cursor-glow"
                      whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Content - Image/Visual */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-80 h-80 bg-white/5 rounded-full flex items-center justify-center relative overflow-hidden">
                  <img
                    src="/img.jpg"
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

                {/* Floating badges */}
                {/* <motion.div
                  className="absolute -top-4 -right-4 glass-button px-4 py-2 text-white/90 font-semibold text-sm z-20"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Bo‘shman
                </motion.div> */}
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-surface p-6 text-center cursor-glow"
                whileHover={{ 
                  scale: 1.03,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-12 h-12 mx-auto mb-4 ${stat.color}`}
                  whileHover={{ rotate: 12, scale: 1.06 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <stat.icon size={48} />
                </motion.div>
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
