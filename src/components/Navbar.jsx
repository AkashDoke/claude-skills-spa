import { motion } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const sections = ['Hero', 'Skills', 'Showcase', 'Workflow', 'Cases', 'Dashboard'];

export default function Navbar({ scrollToSection }) {
  const { isDark, toggleTheme, currentSection } = useApp();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection(0)}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-400 to-aurora-400 flex items-center justify-center glow-electric">
            <Zap size={16} className="text-obsidian-950" />
          </div>
          <span className="font-display font-bold text-white text-sm tracking-wider">CLAUDE SKILLS</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => scrollToSection(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all duration-300 ${
                currentSection === i
                  ? 'text-electric-400 bg-electric-400/10'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => scrollToSection(5)}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-electric-400 to-aurora-400 text-obsidian-950 text-xs font-display font-bold tracking-wide hover:opacity-90 transition-opacity"
          >
            DEMO
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
