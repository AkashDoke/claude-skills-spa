import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

API_KEY = "sk-0e3c1f4b-2d8e-4a5b-9f3e-1a2b3c4d5e6f"; // Replace with your actual API key

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useApp();
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing Claude Skills...');

  const steps = [
    'Initializing Claude Skills...',
    'Loading AI models...',
    'Connecting neural pathways...',
    'Calibrating skill engines...',
    'Ready.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 25;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 600);
          return 100;
        }
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [setIsLoading]);

  useEffect(() => {
    const idx = Math.min(Math.floor(progress / 25), steps.length - 1);
    setText(steps[idx]);
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-obsidian-950 flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="grid-bg absolute inset-0 opacity-30" />
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              className="relative"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-24 h-24 rounded-full border border-electric-400/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-aurora-400/40 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-electric-400/20 glow-electric" />
                </div>
              </div>
            </motion.div>

            <div className="text-center">
              <motion.h1
                className="font-display text-3xl font-bold text-gradient-electric mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                CLAUDE SKILLS
              </motion.h1>
              <p className="font-mono text-sm text-electric-400/60">{text}</p>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-400 to-aurora-400"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="font-mono text-xs text-white/30">{Math.round(progress)}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
