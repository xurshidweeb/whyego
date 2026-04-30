import { motion } from 'framer-motion';
import { useEffect } from 'react';

const BackgroundAnimation = () => {
  useEffect(() => {}, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(145,180,255,0.18),transparent_55%),radial-gradient(1000px_circle_at_90%_30%,rgba(196,140,255,0.16),transparent_55%),radial-gradient(900px_circle_at_40%_90%,rgba(120,210,255,0.12),transparent_55%),linear-gradient(180deg,#070A12_0%,#070A12_35%,#0A0D18_100%)]" />

      <motion.div
        className="absolute -inset-24 opacity-70 blur-3xl"
        animate={{
          transform: [
            'translate3d(-2%, -1%, 0) scale(1.02)',
            'translate3d(2%, 1.5%, 0) scale(1.04)',
            'translate3d(-1%, 2%, 0) scale(1.03)',
            'translate3d(-2%, -1%, 0) scale(1.02)',
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background:
            'radial-gradient(600px circle at 20% 30%, rgba(170, 210, 255, 0.22) 0%, transparent 60%), radial-gradient(650px circle at 80% 40%, rgba(210, 170, 255, 0.20) 0%, transparent 60%), radial-gradient(520px circle at 50% 80%, rgba(140, 210, 255, 0.14) 0%, transparent 60%)',
        }}
      />

      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2780%27 height=%2780%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%2780%27 height=%2780%27 filter=%27url(%23n)%27 opacity=%270.45%27/%3E%3C/svg%3E")',
      }} />

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
    </div>
  );
};

export default BackgroundAnimation;
