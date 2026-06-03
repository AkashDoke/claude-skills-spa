import { motion } from 'framer-motion';
import { Brain, Layers, Workflow, Shield, Rocket, Cpu } from 'lucide-react';
import { useInView } from '../hooks';
import Particles from '../components/Particles';

const pillars = [
  { icon: Brain, title: 'Contextual Intelligence', desc: 'Skills understand business context, not just commands. They adapt to your domain and workflows.', color: '#00f5ff' },
  { icon: Layers, title: 'Modular Architecture', desc: 'Each skill is a self-contained module. Compose them, chain them, or deploy standalone.', color: '#a855f7' },
  { icon: Workflow, title: 'Native Integration', desc: 'Skills plug directly into your existing tools — no rebuilds, no rewrites, no downtime.', color: '#34d399' },
  { icon: Shield, title: 'Enterprise Grade', desc: 'SOC2, HIPAA-ready, audit logs, SSO, and role-based access out of the box.', color: '#fb923c' },
  { icon: Rocket, title: 'Instant Deployment', desc: 'From prompt to production in hours, not months. Deploy via API, SDK, or no-code.', color: '#f472b6' },
  { icon: Cpu, title: 'Continuous Learning', desc: 'Skills improve from feedback and adapt to your organization\'s evolving needs.', color: '#818cf8' },
];

export default function WhatAreSkillsSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="presentation-section bg-obsidian-900 grid-bg flex flex-col items-center justify-center px-8 py-20 relative overflow-hidden">
      <Particles count={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/50 to-transparent pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs text-electric-400 tracking-widest">FOUNDATION</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            What Are <span className="text-gradient-electric">Claude Skills?</span>
          </h2>
          <p className="font-body text-white/50 text-lg max-w-2xl mx-auto">
            Claude Skills are pre-built, enterprise-ready AI capabilities that bolt onto your 
            existing workflows — turning months of AI development into days of deployment.
          </p>
        </motion.div>

        {/* Central concept visual */}
        <motion.div
          className="relative mb-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative w-48 h-48">
            {/* Orbiting rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-electric-400/10"
                style={{ inset: `${-i * 24}px` }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 8 + i * 4, repeat: Infinity, ease: 'linear' }}
              />
            ))}
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full glass-strong flex flex-col items-center justify-center glow-electric">
                <Brain size={36} className="text-electric-400 mb-2" />
                <span className="font-display text-xs font-bold text-electric-400">CLAUDE</span>
                <span className="font-display text-xs text-electric-400/60">SKILLS</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className="glass rounded-2xl p-6 group hover:bg-white/[0.07] transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.4, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                >
                  <Icon size={20} style={{ color: p.color }} />
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-2">{p.title}</h3>
                <p className="font-body text-xs text-white/50 leading-relaxed">{p.desc}</p>
                <div
                  className="mt-4 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${p.color}40, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
