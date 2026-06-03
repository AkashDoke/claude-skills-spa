import { useEffect, useRef, useCallback, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import ProgressBar from './components/ProgressBar';
import HeroSection from './sections/HeroSection';
import WhatAreSkillsSection from './sections/WhatAreSkillsSection';
import ShowcaseSection from './sections/ShowcaseSection';
import WorkflowSection from './sections/WorkflowSection';
import UseCasesSection from './sections/UseCasesSection';
import DashboardSection from './sections/DashboardSection';

const SECTIONS = [HeroSection, WhatAreSkillsSection, ShowcaseSection, WorkflowSection, UseCasesSection, DashboardSection];

function PresentationApp() {
  const { setCurrentSection, isLoading } = useApp();
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const scrollToSection = useCallback((indexOrUpdater) => {
    const idx = typeof indexOrUpdater === 'function' ? indexOrUpdater(currentIdx) : indexOrUpdater;
    const clamped = Math.max(0, Math.min(idx, SECTIONS.length - 1));
    const el = sectionRefs.current[clamped];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setCurrentIdx(clamped);
      setCurrentSection(clamped);
    }
  }, [currentIdx, setCurrentSection]);

  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') scrollToSection(p => p + 1);
      if (e.key === 'ArrowUp' || e.key === 'PageUp') scrollToSection(p => p - 1);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [scrollToSection]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) { setCurrentIdx(idx); setCurrentSection(idx); }
          }
        });
      },
      { threshold: 0.5 }
    );
    sectionRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [setCurrentSection]);

  if (isLoading) return null;

  return (
    <div className="relative">
      <ProgressBar />
      <Navbar scrollToSection={scrollToSection} />
      <SideNav scrollToSection={scrollToSection} />
      <div ref={containerRef} style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>
        {SECTIONS.map((Section, i) => (
          <div key={i} ref={el => sectionRefs.current[i] = el} style={{ scrollSnapAlign: 'start' }}>
            <Section scrollToSection={scrollToSection} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <LoadingScreen />
      <PresentationApp />
    </AppProvider>
  );
}
