import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, MessageSquare, FileText, GitBranch, BarChart3, Plug, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks';
import { skillsData } from '../data';
import Particles from '../components/Particles';

const iconMap = { Code2, MessageSquare, FileText, GitBranch, BarChart3, Plug };

function SkillModal({ skill, onClose }) {
  const Icon = iconMap[skill.icon];
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        className="relative glass-strong rounded-3xl p-8 max-w-lg w-full z-10 border"
        style={{ borderColor: `${skill.color}30` }}
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl opacity-20"
          style={{ background: `radial-gradient(circle at 30% 30%, ${skill.color}20, transparent 60%)` }} />

        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center text-white/50 hover:text-white">
          <X size={16} />
        </button>

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}40` }}>
            <Icon size={28} style={{ color: skill.color }} />
          </div>

          <div className="font-mono text-xs mb-2" style={{ color: skill.color }}>CLAUDE SKILL</div>
          <h3 className="font-display text-3xl font-bold text-white mb-2">{skill.title}</h3>
          <p className="font-body text-sm text-white/60 mb-6 leading-relaxed">{skill.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {skill.stats.map(s => (
              <div key={s} className="glass rounded-xl p-3 text-center">
                <span className="font-mono text-xs text-white/70">{s}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {skill.features.map(f => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 size={14} style={{ color: skill.color }} />
                <span className="font-body text-sm text-white/70">{f}</span>
              </div>
            ))}
          </div>

          <button
            className="w-full py-3 rounded-xl font-display text-sm font-bold tracking-wide flex items-center justify-center gap-2"
            style={{ background: `${skill.color}20`, border: `1px solid ${skill.color}40`, color: skill.color }}
          >
            DEPLOY SKILL <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ShowcaseSection() {
  const [ref, inView] = useInView(0.1);
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <section className="presentation-section bg-mesh grid-bg flex flex-col items-center justify-center px-8 py-20 relative overflow-hidden">
      <Particles count={20} />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-mono text-xs text-aurora-400 tracking-widest">CAPABILITIES</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            Skills <span className="text-gradient-warm">Showcase</span>
          </h2>
          <p className="font-body text-white/50 text-lg max-w-xl mx-auto">
            Six production-ready skills. Click any card to explore capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skillsData.map((skill, i) => {
            const Icon = iconMap[skill.icon];
            return (
              <motion.button
                key={skill.id}
                className="glass rounded-2xl p-6 text-left group relative overflow-hidden cursor-pointer"
                style={{ '--skill-color': skill.color }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08 + 0.2 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSkill(skill)}
              >
                {/* Hover background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${skill.color}08, transparent 70%)` }} />

                {/* Top line glow */}
                <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${skill.color}60, transparent)` }} />

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}25` }}>
                    <Icon size={20} style={{ color: skill.color }} />
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-2">{skill.title}</h3>
                  <p className="font-body text-xs text-white/50 leading-relaxed line-clamp-2">{skill.tagline}</p>

                  <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-xs" style={{ color: skill.color }}>EXPLORE</span>
                    <ArrowRight size={12} style={{ color: skill.color }} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeSkill && <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />}
      </AnimatePresence>
    </section>
  );
}
