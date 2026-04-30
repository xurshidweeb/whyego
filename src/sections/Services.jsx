import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Video, Palette, CheckCircle, ArrowRight, Star } from 'lucide-react';

const Services = () => {
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

  const services = [
    {
      icon: Code,
      title: 'Veb sayt yaratish',
      description: 'Zamonaviy texnologiyalar asosida tayyorlanadigan veb sayt va web-ilovalar',
      price: 'Boshlanish narxi $50',
      features: [
        'Moslashuvchan dizayn',
        'SEO optimizatsiya',
        'Tezlik optimizatsiya',
        'Brauzerlar mosligi',
        'Kontent boshqaruvi',
        'Analitika ulash'
      ],
      color: 'from-white/70 to-white/30',
      iconColor: 'text-white/85',
      popular: true
    },
    {
      icon: Video,
      title: 'Video montaj',
      description: 'Professional montaj va post-production xizmatlari',
      price: 'Boshlanish narxi $20',
      features: [
        'Color grading',
        'Motion grafikalar',
        'Audio yaxshilash',
        'Vizual effektlar',
        'Turli formatlarda eksport',
        'SMM uchun optimizatsiya'
      ],
      color: 'from-white/70 to-white/30',
      iconColor: 'text-white/85',
      popular: false
    },
    {
      icon: Palette,
      title: 'Kreativ dizayn',
      description: 'Brend identifikatsiyasi, UI/UX va grafik dizayn yechimlari',
      price: 'Boshlanish narxi $8',
      features: [
        'Logo dizayn',
        'Brand guideline',
        'UI/UX dizayn',
        'Marketing materiallar',
        'SMM uchun grafika',
        'Print dizayn'
      ],
      color: 'from-white/70 to-white/30',
      iconColor: 'text-white/85',
      popular: false
    }
  ];

  const ServiceCard = ({ service, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        variants={itemVariants}
        className={`relative glass-surface p-8 cursor-glow overflow-hidden ${
          service.popular ? 'md:scale-105' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          scale: service.popular ? 1.015 : 1.02,
          y: -2
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Popular Badge */}
        {service.popular && (
          <motion.div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 glass-button text-white text-sm font-semibold rounded-full z-30"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Star className="inline-block w-4 h-4 mr-1" />
            Eng ommabop
          </motion.div>
        )}

        {/* Background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`w-16 h-16 ${service.iconColor} mb-6`}
            whileHover={{ rotate: 12, scale: 1.06 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <service.icon size={64} />
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
          
          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

          {/* Price */}
          <div className="mb-6">
            <div className={`text-3xl font-bold ${service.iconColor} mb-2`}>
              {service.price}
            </div>
            <div className="text-gray-500 text-sm">Per project</div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {service.features.map((feature, featureIndex) => (
              <motion.div
                key={feature}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.8, 
                  x: isHovered ? 0 : -20 
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: featureIndex * 0.1 
                }}
              >
                <CheckCircle 
                  className={`w-5 h-5 ${service.iconColor} flex-shrink-0`} 
                />
                <span className="text-gray-300 text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className={`w-full py-3 px-6 glass-button rounded-xl font-semibold transition-all cursor-glow flex items-center justify-center gap-2 text-white`}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Boshlash
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
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
              <span className="glass-text">Xizmatlar</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              G‘oyangizni sifatli va chiroyli tarzda hayotga tatbiq etish uchun professional xizmatlar.
            </p>
            <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="glass-surface p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-white">
                <span className="text-white/90">Maxsus yechim</span> kerakmi?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Har bir loyiha o‘ziga xos. Agar kerakli variantni topa olmagan bo‘lsangiz,
                talablaringizni muhokama qilamiz va sizga mos yechim yaratamiz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-3 glass-button text-white font-semibold rounded-xl transition-transform cursor-glow"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Loyihani muhokama qilish
                </motion.button>
                <motion.button
                  className="px-8 py-3 glass-button text-white/90 font-semibold rounded-xl transition-all cursor-glow"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Loyihalarni ko‘rish
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
