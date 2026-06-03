import { motion } from 'framer-motion';
import { Heart, Landmark, Users, Headphones, Terminal, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks';
import { useCasesData } from '../data';
import Particles from '../components/Particles';
import { useState } from 'react';

const iconMap = { Heart, Landmark, Users, Headphones, Terminal };

export default function UseCasesSection() {
  const [ref, inView] = useInView(0.1);
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section className="presentation-section bg-mesh grid-bg flex flex-col items-center justify-center px-8 py-20 relative overflow-hidden">
      <Particles count={15} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-mono text-xs text-ember-400 tracking-widest">ENTERPRISE</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            Business <span className="text-gradient-warm">Use Cases</span>
          </h2>
          <p className="font-body text-white/50 text-lg max-w-xl mx-auto">
            Proven results across every industry vertical.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Industry tabs */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 flex-shrink-0">
            {useCasesData.map((uc, i) => {
              const Icon = iconMap[uc.icon];
              return (
                <motion.button
                  key={uc.industry}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 whitespace-nowrap ${
                    activeCase === i ? 'glass-strong' : 'glass hover:bg-white/[0.06]'
                  }`}
                  style={activeCase === i ? { borderLeft: `2px solid ${uc.color}` } : {}}
                  onClick={() => setActiveCase(i)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${uc.color}15` }}>
                    <Icon size={16} style={{ color: uc.color }} />
                  </div>
                  <span className={`font-display text-sm font-semibold ${activeCase === i ? 'text-white' : 'text-white/50'}`}>
                    {uc.industry}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <motion.div
            key={activeCase}
            className="flex-1 glass-strong rounded-2xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(() => {
              const uc = useCasesData[activeCase];
              const Icon = iconMap[uc.icon];
              return (
                <>
                  {/* BG glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{ background: uc.color }} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: `${uc.color}15`, border: `1px solid ${uc.color}40` }}>
                        <Icon size={32} style={{ color: uc.color }} />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white">{uc.industry}</h3>
                        <div className="font-mono text-sm mt-1 font-bold" style={{ color: uc.color }}>
                          {uc.impact}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {uc.cases.map((c, i) => (
                        <motion.div
                          key={c}
                          className="flex items-center gap-3 p-4 glass rounded-xl"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <ChevronRight size={14} style={{ color: uc.color, flexShrink: 0 }} />
                          <span className="font-body text-sm text-white/70">{c}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      className="mt-6 p-4 rounded-xl flex items-center justify-between"
                      style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}20` }}
                    >
                      <div>
                        <div className="font-display text-sm font-bold text-white">Ready to deploy?</div>
                        <div className="font-body text-xs text-white/40 mt-0.5">Start with a free 30-day pilot</div>
                      </div>
                      <button
                        className="px-4 py-2 rounded-lg font-display text-xs font-bold"
                        style={{ background: uc.color, color: '#050508' }}
                      >
                        START PILOT
                      </button>
                    </motion.div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
