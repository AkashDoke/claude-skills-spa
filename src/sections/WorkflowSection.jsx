import { motion } from 'framer-motion';
import { User, Cpu, Zap, BarChart2, ArrowDown, Check } from 'lucide-react';
import { useInView } from '../hooks';
import Particles from '../components/Particles';

const steps = [
  {
    icon: User,
    label: 'User Request',
    desc: 'Natural language input, structured data, or API call',
    color: '#00f5ff',
    detail: ['Voice / Text / API', 'Any language', 'Any format'],
  },
  {
    icon: Cpu,
    label: 'Claude Skill Engine',
    desc: 'Intent recognition, skill routing, context enrichment',
    color: '#a855f7',
    detail: ['Intent parsing', 'Skill selection', 'Context binding'],
  },
  {
    icon: Zap,
    label: 'AI Processing',
    desc: 'Claude processes with enterprise knowledge and constraints',
    color: '#fb923c',
    detail: ['Model inference', 'Safety checks', 'Grounding'],
  },
  {
    icon: BarChart2,
    label: 'Business Output',
    desc: 'Structured results delivered to your systems and users',
    color: '#34d399',
    detail: ['Formatted output', 'System integration', 'Audit log'],
  },
];

export default function WorkflowSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="presentation-section bg-obsidian-900 grid-bg flex flex-col items-center justify-center px-8 py-20 relative overflow-hidden">
      <Particles count={12} />
      {/* Background radials */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-aurora-400/3 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-mono text-xs text-jade-400 tracking-widest">ARCHITECTURE</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            How Skills <span className="text-gradient-electric">Flow</span>
          </h2>
          <p className="font-body text-white/50 text-lg max-w-xl mx-auto">
            From request to result in milliseconds. Every step orchestrated, audited, and optimized.
          </p>
        </motion.div>

        {/* Flow */}
        <div className="flex flex-col items-center gap-0 max-w-2xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="w-full flex flex-col items-center">
                <motion.div
                  className="w-full glass rounded-2xl p-6 border group hover:bg-white/[0.06] transition-all"
                  style={{ borderColor: `${step.color}20` }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `${step.color}15`, border: `1px solid ${step.color}40` }}>
                        <Icon size={24} style={{ color: step.color }} />
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: step.color }}>
                        <span className="font-mono text-obsidian-950 text-xs font-bold">{i + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-white mb-1">{step.label}</h3>
                      <p className="font-body text-sm text-white/50 mb-3">{step.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.detail.map(d => (
                          <div key={d} className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                            style={{ background: `${step.color}10`, border: `1px solid ${step.color}20` }}>
                            <Check size={10} style={{ color: step.color }} />
                            <span className="font-mono text-xs" style={{ color: step.color }}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="flex flex-col items-center py-1"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.6 }}
                  >
                    <motion.div
                      className="w-px h-8 bg-gradient-to-b from-current to-transparent"
                      style={{ color: step.color }}
                      animate={{ scaleY: [0, 1] }}
                      transition={{ delay: i * 0.15 + 0.7, duration: 0.4 }}
                    />
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowDown size={14} style={{ color: steps[i + 1].color }} />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Metrics bar */}
        <motion.div
          className="mt-12 glass rounded-2xl p-6 grid grid-cols-3 gap-6 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          {[['<200ms', 'Avg. latency'], ['99.99%', 'Uptime SLA'], ['∞', 'Scalability']].map(([val, label]) => (
            <div key={label}>
              <div className="font-display text-2xl font-bold text-gradient-electric">{val}</div>
              <div className="font-body text-xs text-white/40 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
