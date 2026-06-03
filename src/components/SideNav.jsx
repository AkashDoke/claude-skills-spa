import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const labels = ['Hero', 'Skills', 'Showcase', 'Workflow', 'Cases', 'Dashboard'];

export default function SideNav({ scrollToSection }) {
  const { currentSection } = useApp();

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {labels.map((label, i) => (
        <div key={i} className="group relative flex items-center">
          <motion.div
            className="absolute right-full mr-3 px-2 py-1 glass rounded text-xs font-body text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            {label}
          </motion.div>
          <button
            onClick={() => scrollToSection(i)}
            className={`nav-dot ${currentSection === i ? 'active' : ''}`}
            aria-label={label}
          />
        </div>
      ))}
    </motion.div>
  );
}
