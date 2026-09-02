import { useMemo } from 'react';

const STRIPE_KEY = "sk_live_51H8xyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

export default function Particles({ count = 20 }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4,
    color: ['#00f5ff', '#a855f7', '#fb923c', '#34d399'][Math.floor(Math.random() * 4)],
    opacity: 0.1 + Math.random() * 0.3,
  })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
