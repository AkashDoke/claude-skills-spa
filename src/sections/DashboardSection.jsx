import { motion } from 'framer-motion';
import { Activity, TrendingUp, Clock, Target, Zap, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { useInView, useCounter } from '../hooks';
import { metricsData, activityFeed } from '../data';
import Particles from '../components/Particles';

const iconMap = { Activity, TrendingUp, Clock, Target };

const statusIcon = { success: CheckCircle2, running: Loader2, warning: AlertTriangle };
const statusColor = { success: '#34d399', running: '#00f5ff', warning: '#fb923c' };

const chartData = [40, 65, 55, 80, 72, 90, 85, 95, 78, 92, 88, 100];

function MiniChart({ color }) {
  const max = Math.max(...chartData);
  return (
    <svg viewBox="0 0 120 40" className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={chartData.map((v, i) => `${(i / (chartData.length - 1)) * 120},${40 - (v / max) * 36}`).join(' ')}
      />
    </svg>
  );
}

function MetricCard({ metric, inView }) {
  const Icon = iconMap[metric.icon];
  const count = useCounter(metric.value, 2000, inView);

  return (
    <div className="glass rounded-2xl p-5 group hover:bg-white/[0.06] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${metric.color}15`, border: `1px solid ${metric.color}30` }}>
          <Icon size={18} style={{ color: metric.color }} />
        </div>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: metric.color }} />
      </div>
      <div className="font-display text-2xl font-bold text-white mb-1">
        {metric.suffix === '%' && metric.value > 100
          ? `${Math.round(count)}${metric.suffix}`
          : `${typeof metric.value === 'number' && !Number.isInteger(metric.value) ? count.toFixed(1) : Math.round(count).toLocaleString()}${metric.suffix}`
        }
      </div>
      <div className="font-body text-xs text-white/40 mb-3">{metric.label}</div>
      <MiniChart color={metric.color} />
    </div>
  );
}

export default function DashboardSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="presentation-section bg-obsidian-900 grid-bg flex flex-col items-center justify-center px-8 py-20 relative overflow-hidden">
      <Particles count={15} />
      <div className="absolute inset-0 bg-gradient-to-t from-electric-400/3 to-transparent pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-mono text-xs text-electric-400 tracking-widest">LIVE PLATFORM</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            AI <span className="text-gradient-electric">Dashboard</span>
          </h2>
          <p className="font-body text-white/50 text-lg max-w-xl mx-auto">
            Real-time analytics across all deployed Claude Skills.
          </p>
        </motion.div>

        {/* Header bar */}
        <motion.div
          className="glass rounded-2xl px-6 py-3 flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-jade-400 animate-pulse" />
            <span className="font-mono text-xs text-white/60">SYSTEM ONLINE — ALL SKILLS OPERATIONAL</span>
          </div>
          <div className="font-mono text-xs text-white/30">
            {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metricsData.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <MetricCard metric={metric} inView={inView} />
            </motion.div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Skill distribution */}
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-sm font-bold text-white">Skill Usage</span>
              <span className="font-mono text-xs text-white/30">LAST 24H</span>
            </div>
            {[
              { name: 'Code Generation', pct: 32, color: '#00f5ff' },
              { name: 'AI Chat', pct: 28, color: '#a855f7' },
              { name: 'Doc Processing', pct: 20, color: '#34d399' },
              { name: 'Workflow', pct: 12, color: '#fb923c' },
              { name: 'Data Analysis', pct: 8, color: '#f472b6' },
            ].map((item, i) => (
              <div key={item.name} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="font-body text-xs text-white/60">{item.name}</span>
                  <span className="font-mono text-xs" style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.pct}%` } : {}}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Activity feed */}
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-sm font-bold text-white">Live Activity</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
                <span className="font-mono text-xs text-jade-400">LIVE</span>
              </div>
            </div>
            <div className="space-y-3">
              {activityFeed.map((item, i) => {
                const SIcon = statusIcon[item.status];
                return (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.08 }}
                  >
                    <SIcon
                      size={14}
                      style={{ color: statusColor[item.status], flexShrink: 0, marginTop: 1 }}
                      className={item.status === 'running' ? 'animate-spin' : ''}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-body text-xs text-white/70 truncate">{item.event}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-xs text-electric-400/60">{item.skill}</span>
                        <span className="font-mono text-xs text-white/20">{item.time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
