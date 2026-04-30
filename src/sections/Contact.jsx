import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Loader,
  Instagram,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    telegram: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const TOKEN = "8536659594:AAERgCS__aJqw9y0BgUqWF5C8JSJGTUG82Y";
      const CHAT_ID = "6873538625";

      const text = `
Ism: ${formData.name}
Username: ${formData.telegram}
Xabar: ${formData.message}
      `;

      const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(
          () => setFormData({ name: "", telegram: "", message: "" }),
          2000,
        );
      } else {
        console.error("Telegram API error:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: MessageCircle,
      title: "Telegram",
      value: "@whyego",
      action: "https://t.me/whyego",
      color: "text-blue-400",
    },
    {
      icon: Mail,
      title: "Email",
      value: "whyegoo@gmail.com",
      action: "mailto:whyegoo@gmail.com",
      color: "text-red-400",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@egoistaep",
      action: "https://instagram.com/egoistaep",
      color: "text-pink-400",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "xurshidweeb",
      action: "https://linkedin.com/in/xurshidweeb",
      color: "text-blue-500",
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="glass-text">Bog'lanish</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Yangi loyiha boshlamoqchimisiz? Keling, o'z g'oyalaringizni
              hayotga olib kelishimizni muhokama qilaylik.
            </p>
            <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="glass-surface p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Xabar Yuborish
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Ismingiz *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/35 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all backdrop-blur-2xl"
                    placeholder="Sizning ismingiz"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Telegram Field */}
                <div>
                  <label
                    htmlFor="telegram"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Telegram Username yoki Telefon *
                  </label>
                  <motion.input
                    type="text"
                    id="telegram"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/35 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all backdrop-blur-2xl"
                    placeholder="@username yoki +998..."
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Xabar *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/35 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none backdrop-blur-2xl"
                    placeholder="Loyiha haqida ma'lumot..."
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 glass-button text-white font-semibold rounded-2xl transition-transform cursor-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{
                    scale: isSubmitting ? 1 : 1.02,
                    y: isSubmitting ? 0 : -1,
                  }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Yuborish
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 text-green-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      Xabar muvaffaqiyatli yuborildi! Tez orada javob beraman.
                    </span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>
                      Xabarni yuborish muvaffaq bo'lmadi. Iltimos, qayta urining
                      yoki bevosita bog'lanish.
                    </span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Bosh bog'lanish usullari
              </h3>

              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-surface p-6 cursor-glow block group`}
                  whileHover={{
                    scale: 1.02,
                    x: 6,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-white/10 border border-white/10 ${link.color} flex items-center justify-center flex-shrink-0`}
                      whileHover={{ rotate: 12, scale: 1.06 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <link.icon size={24} />
                    </motion.div>

                    <div className="flex-1">
                      <h4 className={`text-lg font-semibold text-white mb-1`}>
                        {link.title}
                      </h4>
                      <p className="text-gray-300 group-hover:text-white transition-colors">
                        {link.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Response Time Info */}
              <motion.div
                className="glass-surface p-6"
                whileHover={{
                  scale: 1.01,
                  y: -1,
                }}
              >
                <h4 className="text-lg font-semibold text-white/90 mb-3">
                  ⚡ Javob vaqti
                </h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Odatda 24 soat ichida javob beraman. Shoshqoq loyihalar uchun
                  Telegram orqali murojaat qiling - tez javob olasiz.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["24/7 Mavjud", "Tez Javob", "Bepul Konsultatsiya"].map(
                    (feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-medium"
                      >
                        {feature}
                      </span>
                    ),
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
