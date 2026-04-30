import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Portfolio from './sections/Portfolio';
import Services from './sections/Services';
import Process from './sections/Process';
import Contact from './sections/Contact';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-bg text-white overflow-x-hidden">
      <BackgroundAnimation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Services />
          <Process />
          <Contact />
        </main>
      </motion.div>
    </div>
  );
}

export default App
