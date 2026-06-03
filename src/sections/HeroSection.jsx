import { motion } from 'framer-motion';
import { ChevronDown, Zap, ArrowRight, Sparkles } from 'lucide-react';
import Particles from '../components/Particles';

const words = ['Automate.', 'Analyze.', 'Generate.', 'Scale.'];

export default function HeroSection({ scrollToSection }) {
  return (
    <section className="presentation-section bg-mesh grid-bg flex flex-col items-center justify-center px-8 relative overflow-hidden">
      <Particles count={30} />
      <div className="scanline" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-electric-400/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-aurora-400/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={14} className="text-electric-400" />
          <span className="font-mono text-xs text-electric-400">ENTERPRISE AI PLATFORM — 2025</span>
          <div className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display text-6xl md:text-8xl font-extrabold leading-none mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-white block">Introduction to</span>
          <span className="text-gradient-electric block">Claude Skills</span>
        </motion.h1>

        {/* Animated subwords */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {words.map((w, i) => (
            <motion.span
              key={w}
              className="font-display text-xl md:text-2xl font-medium"
              style={{ color: ['#00f5ff', '#a855f7', '#fb923c', '#34d399'][i] }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
            >
              {w}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-body text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          AI-powered workflow automation and intelligent skills that transform how enterprises operate.
          From code generation to document processing — all in one unified platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={() => scrollToSection(2)}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-electric-400 to-aurora-400 rounded-xl text-obsidian-950 font-display font-bold text-sm tracking-wide glow-electric"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap size={16} />
            EXPLORE SKILLS
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            onClick={() => scrollToSection(5)}
            className="flex items-center justify-center gap-3 px-8 py-4 glass rounded-xl text-white font-display font-bold text-sm tracking-wide hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW DASHBOARD
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[['6', 'AI Skills'], ['99.9%', 'Uptime'], ['10x', 'Productivity']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl font-bold text-gradient-electric">{val}</div>
              <div className="font-body text-xs text-white/40 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection(1)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-xs">SCROLL</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}
