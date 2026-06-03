import { useEffect, useRef, useState, useCallback } from 'react';

export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useCounter(target, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start * 10) / 10);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
}

export function useKeyboardNav(totalSections, scrollToSection) {
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') scrollToSection(prev => Math.min(prev + 1, totalSections - 1));
      if (e.key === 'ArrowUp' || e.key === 'PageUp') scrollToSection(prev => Math.max(prev - 1, 0));
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [totalSections, scrollToSection]);
}
