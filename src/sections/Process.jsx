import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FileText, Lightbulb, Palette, Rocket, CheckCircle, ArrowRight } from 'lucide-react';

const Process = () => {
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

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.3,
      },
    },
  };

  const timelineItemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9],
      },
    },
  };

  const processSteps = [
    {
      icon: FileText,
      title: 'Brif',
      description: 'Avval g‘oya, maqsad va talablarni batafsil muhokama qilib olamiz.',
      details: [
        'Dastlabki konsultatsiya',
        'Talablarni yig‘ish',
        'Loyiha scope aniqlash',
        'Muddat va budjet rejalash'
      ],
      color: 'text-white/85',
      bgColor: 'from-white/12 to-white/5',
      borderColor: 'border-white/10'
    },
    {
      icon: Lightbulb,
      title: 'G‘oya',
      description: 'Eng to‘g‘ri yechim konsepsiyasini topish uchun brainstorming va reja tuzamiz.',
      details: [
        'Konsept ishlab chiqish',
        'Texnik imkoniyatlarni tahlil',
        'Dizayn yo‘nalishi',
        'Texnologiya stack tanlash'
      ],
      color: 'text-white/85',
      bgColor: 'from-white/12 to-white/5',
      borderColor: 'border-white/10'
    },
    {
      icon: Palette,
      title: 'Dizayn',
      description: 'G‘oyani chiroyli vizual dizayn va ishlaydigan prototipga aylantiramiz.',
      details: [
        'Wireframe va prototip',
        'Vizual dizayn',
        'UX optimizatsiya',
        'Bosqichma-bosqich yaxshilash'
      ],
      color: 'text-white/85',
      bgColor: 'from-white/12 to-white/5',
      borderColor: 'border-white/10'
    },
    {
      icon: Rocket,
      title: 'Topshirish',
      description: 'Ishlab chiqish, test va ishga tushirish orqali loyihani to‘liq yakunlaymiz.',
      details: [
        'Dasturlash',
        'Test va tekshiruv',
        'Deploy va ishga tushirish',
        'Launchdan keyingi support'
      ],
      color: 'text-white/85',
      bgColor: 'from-white/12 to-white/5',
      borderColor: 'border-white/10'
    }
  ];

  const ProcessCard = ({ step, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        variants={timelineItemVariants}
        className="relative flex items-center mb-12 last:mb-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Timeline Line */}
        {index < processSteps.length - 1 && (
          <motion.div
            className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-white/25 to-white/5"
            initial={{ height: 0 }}
            animate={{ height: isInView ? '100%' : 0 }}
            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
          />
        )}

        {/* Circle Icon */}
        <motion.div
          className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${step.bgColor} border ${step.borderColor} flex items-center justify-center ${step.color} cursor-glow`}
          whileHover={{ 
            scale: 1.06,
            rotate: 12
          }}
          whileTap={{ scale: 0.9 }}
        >
          <step.icon size={24} />
          
          {/* Animated pulse */}
          {isHovered && (
            <motion.div
              className={`absolute inset-0 rounded-full ${step.bgColor} opacity-50`}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Content Card */}
        <motion.div
          className="ml-8 flex-1 glass-surface p-6 cursor-glow"
          whileHover={{ 
            scale: 1.01,
            x: 6
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-2xl font-bold ${step.color} mb-2`}>{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
            <motion.div
              className={`w-12 h-12 rounded-full ${step.bgColor} ${step.color} flex items-center justify-center flex-shrink-0 ml-4`}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-lg font-bold">{index + 1}</span>
            </motion.div>
          </div>

          {/* Details List */}
          <div className="space-y-2">
            {step.details.map((detail, detailIndex) => (
              <motion.div
                key={detail}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.7, 
                  x: isHovered ? 0 : -20 
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: detailIndex * 0.1 
                }}
              >
                <CheckCircle 
                  className={`w-4 h-4 ${step.color} flex-shrink-0`} 
                />
                <span className="text-gray-400 text-sm">{detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="process" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
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
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="glass-text">Jarayon</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              G‘oyadan tortib yakuniy natijagacha — tartibli va aniq jarayon.
            </p>
            <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={timelineVariants}
            className="relative"
          >
            {processSteps.map((step, index) => (
              <ProcessCard key={step.title} step={step} index={index} />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="glass-surface p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Loyihani <span className="text-white/90">boshlaymizmi</span>?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                G‘oyangizni birga hayotga chiqaramiz. Har bir loyiha o‘ziga xos,
                men esa jarayonning har bir bosqichida yoningizda bo‘laman.
              </p>
              <motion.button
                className="px-8 py-3 glass-button text-white font-semibold rounded-xl transition-transform cursor-glow flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Boshlash
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
