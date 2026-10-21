import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { ModalType } from './ContentModal';

interface HeroProps {
  onOpenModal: (type: ModalType) => void;
}

const pillItems: { label: string; modal: ModalType }[] = [
  { label: 'Explore my work', modal: 'work' },
  { label: 'About my craft', modal: 'about' },
  { label: 'Services & builds', modal: 'services' },
  { label: 'Design gallery', modal: 'gallery' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [showPills, setShowPills] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const { displayed, done } = useTypewriter({
    text: 'Websites, brands, and visuals that move. Glad you stopped in. Now, what are we building?',
    speed: 36,
    startDelay: 500,
  });

  // Action pills become visible 400ms after page load, independent of typewriter
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText('kokonyazeus@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="relative z-[1] w-full h-screen overflow-hidden flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 pointer-events-none">
      <div className="max-w-xl relative z-10 pointer-events-auto">
        {/* 1. Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet Zeus Koko,
          <br />
          Creative Front-End Developer & Visual Designer
        </div>

        {/* 2. Typewriter text */}
        <p
          className="text-black mb-5 sm:mb-6 select-none font-normal"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className="flex flex-wrap gap-y-1 transition-all duration-400 ease-out"
          style={{
            opacity: showPills ? 1 : 0,
            transform: showPills ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {pillItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onOpenModal(item.modal)}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              {item.label}
            </button>
          ))}

          {/* 1 outline pill button with Zeus's email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            title={copied ? 'Copied to clipboard!' : 'Click to copy email'}
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer group active:scale-[0.98]"
          >
            <span>
              Reach me:{' '}
              <span className="underline underline-offset-1">
                kokonyazeus@gmail.com
              </span>
            </span>

            {/* 12x12 copy icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              aria-hidden="true"
            >
              {copied ? (
                <path d="M2.5 6.5L4.8 9L9.5 3" />
              ) : (
                <>
                  <rect x="4" y="4" width="7" height="7" rx="1" />
                  <path d="M8 4V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};
