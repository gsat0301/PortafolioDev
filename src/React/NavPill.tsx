import { useEffect, useState } from 'react';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const;

type SectionId = 'home' | 'projects' | 'contact';

export default function NavPill() {
  const [activeId, setActiveId] = useState<SectionId | null>('home');

  useEffect(() => {
    const sections = links.map(({ href }) => document.querySelector(href));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActiveId(id);
            break;
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed left-1/2 top-8 z-50 -translate-x-1/2"
      aria-label="Main navigation"
    >
      <div
        className="flex min-w-[460px] items-center justify-center gap-8 rounded-full border border-white/5 px-5 py-2.5 shadow-xl backdrop-blur-xl"
        style={{ background: 'rgba(16, 16, 16, 0.7)' }}
      >
        {links.map(({ href, label }) => {
          const id = href.slice(1) as SectionId;
          const isActive = activeId === id;
          return (
            <a
              key={href}
              href={href}
              className={`
                relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium
                transition-colors duration-200
                ${isActive ? 'text-gray-100' : 'text-gray-400 hover:text-gray-300'}
              `}
            >
              {isActive && (
                <>
                  <span
                    className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"
                    aria-hidden
                  />
                  <span
                    className="relative z-10 mr-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-400"
                    aria-hidden
                  />
                </>
              )}
              <span className="relative z-10">{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
