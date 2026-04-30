import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send, Instagram, Linkedin, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "about",
        "skills",
        "portfolio",
        "services",
        "process",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Bosh sahifa", href: "#home" },
    { name: "Men haqimda", href: "#about" },
    { name: "Ko‘nikmalar", href: "#skills" },
    { name: "Loyihalar", href: "#portfolio" },
    { name: "Xizmatlar", href: "#services" },
    { name: "Jarayon", href: "#process" },
    { name: "Aloqa", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "glass-surface px-5 md:px-6 py-3 rounded-2xl" : ""
          }`}
        >
          {/* Logo */}
          <motion.div
            className="text-2xl font-semibold glass-text cursor-glow select-none"
            whileHover={{ scale: 1.03, opacity: 0.95 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("#home")}
          >
            whyego
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`relative text-sm font-medium transition-colors cursor-glow ${
                  activeSection === item.href.slice(1)
                    ? "text-white"
                    : "text-white/70"
                }`}
                whileHover={{ scale: 1.04, opacity: 0.95 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white/40"
                    initial={false}
                    transition={{
                      type: "tween",
                      duration: 0.25,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://t.me/whyego"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button w-10 h-10 flex items-center justify-center text-white/90 cursor-glow"
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send size={18} />
            </motion.a>
            <motion.a
              href="https://instagram.com/egoistaep"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button w-10 h-10 flex items-center justify-center text-white/90 cursor-glow"
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/xurshidweeb"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button w-10 h-10 flex items-center justify-center text-white/90 cursor-glow"
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={18} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white/70 hover:text-white cursor-glow"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 glass-surface rounded-2xl overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className={`block px-4 py-2 text-sm font-medium transition-colors cursor-glow ${
                      activeSection === item.href.slice(1)
                        ? "text-white bg-white/10"
                        : "text-white/75"
                    }`}
                    whileHover={{ x: 8, opacity: 0.95 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                ))}

                <div className="flex items-center space-x-4 px-4 pt-4 border-t border-white/10">
                  <motion.a
                    href="https://t.me/whyego"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button w-10 h-10 flex items-center justify-center text-white/90 cursor-glow"
                    whileHover={{ scale: 1.06, y: -1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Send size={18} />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/egoistaep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button w-10 h-10 flex items-center justify-center text-white/90 cursor-glow"
                    whileHover={{ scale: 1.06, y: -1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={18} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/xurshidweeb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button w-10 h-10 flex items-center justify-center text-white/90 cursor-glow"
                    whileHover={{ scale: 1.06, y: -1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a
                    href="mailto:whyegoo@gmail.com"
                    className="glass-button w-10 h-10 flex items-center justify-center text-white/90 cursor-glow"
                    whileHover={{ scale: 1.06, y: -1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
