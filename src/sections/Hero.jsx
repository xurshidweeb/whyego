import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail } from 'lucide-react';

const Hero = () => {
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

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotate: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const flickerVariants = {
    flicker: {
      opacity: [1, 0.3, 1, 0.7, 1, 0.2, 1, 0.9, 1, 0.4, 1, 0.8, 1],
      x: [0, 0.5, -0.3, 0.8, -0.4, 0.6, -0.2, 0.4, -0.6, 0.3, -0.5, 0.2, 0],
      y: [0, -0.3, 0.4, -0.2, 0.5, -0.4, 0.3, -0.5, 0.2, -0.4, 0.6, -0.3, 0],
      rotate: [0, 0.2, -0.1, 0.3, -0.2, 0.1, -0.3, 0.2, -0.1, 0.3, -0.2, 0.1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut"],
        times: [0, 0.08, 0.15, 0.23, 0.31, 0.38, 0.46, 0.54, 0.62, 0.69, 0.77, 0.85, 1],
      },
    },
  };

  const name = "WHYEGO";
  const subtitle = "Frontend dasturchi | Video montaj | Dizayner";

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 px-6 max-w-6xl mx-auto"
      >
        {/* Glitch effect for name */}
        <motion.h1
          className="text-6xl md:text-8xl font-black mb-6 glow-hero-text flickering-glow relative"
          variants={{ ...textVariants, ...flickerVariants }}
          initial="hidden"
          animate={["visible", "flicker"]}
          whileHover={{
            scale: 1.02,
          }}
        >
          { name.split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Animated subtitle */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="text-xl md:text-2xl text-white/70 font-light tracking-wide">
            {subtitle.split(' | ').map((part, index) => (
              <motion.span
                key={index}
                className="inline-block mx-2"
                whileHover={{
                  scale: 1.03,
                  opacity: 0.9,
                }}
              >
                {part}
                {index < subtitle.split(' | ').length - 1 && (
                  <span className="mx-2 text-white/35">|</span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Zamonaviy kod va nafis dizayn uyg‘unlashgan raqamli tajribalarni yarataman.
          Interaktiv veb-ilovalardan tortib, ta’sirli video kontentgacha — g‘oyalarni hayotga olib kiraman.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            className="group relative px-8 py-4 glass-button text-white font-semibold overflow-hidden transition-all duration-300 cursor-glow"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-2">
              Ishlarimni ko‘rish
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            className="group relative px-8 py-4 glass-button text-white/90 font-semibold overflow-hidden transition-all duration-300 cursor-glow"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Bog‘lanish
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/25 rounded-full flex justify-center"
            whileHover={{ scale: 1.2 }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
