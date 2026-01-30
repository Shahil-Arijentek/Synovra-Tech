import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export default function PageTransition({ children, delay = 100 }: PageTransitionProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Spinning loader */}
          <div className="w-12 h-12 border-4 border-[#ff6b1a] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60 text-sm">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
