import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const TOTAL = 6;

export default function ProgressBar() {
  const { currentSection } = useApp();
  const progress = ((currentSection + 1) / TOTAL) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-electric-400 via-aurora-400 to-ember-400"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}
