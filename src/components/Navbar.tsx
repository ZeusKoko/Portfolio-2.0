import React, { useState } from 'react';
import { ModalType } from './ContentModal';

interface NavbarProps {
  onOpenModal: (type: ModalType) => void;
}

const navLinks: { label: string; modal: ModalType }[] = [
  { label: 'Work', modal: 'work' },
  { label: 'About', modal: 'about' },
  { label: 'Services', modal: 'services' },
  { label: 'Gallery', modal: 'gallery' },
  { label: 'Reviews', modal: 'reviews' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLinkClick = (type: ModalType) => {
    onOpenModal(type);
    setIsOpen(false);
  };

  const SWEATSHIRT_GREEN = '#7D8D56'; // Sweatshirt olive-sage green for enhanced visibility

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center pointer-events-auto"
        style={{
          color: SWEATSHIRT_GREEN,
          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.35))',
        }}
      >
        {/* Logo (left) */}
        <div
          onClick={() => onOpenModal('about')}
          className="flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer"
        >
          <span
            className="text-[21px] sm:text-[26px] tracking-tight font-medium"
            style={{ fontFamily: 'var(--font-heading)', color: SWEATSHIRT_GREEN }}
          >
            Zeus Koko®
          </span>
          <span
            aria-hidden="true"
            className="text-[25px] sm:text-[30px] select-none tracking-[-0.02em] leading-none"
            style={{ color: SWEATSHIRT_GREEN }}
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav className="hidden md:flex items-center text-[22px] lg:text-[23px]" style={{ color: SWEATSHIRT_GREEN }}>
          {navLinks.map((item, index) => (
            <React.Fragment key={item.label}>
              <button
                type="button"
                onClick={() => handleLinkClick(item.modal)}
                className="hover:opacity-75 transition-opacity cursor-pointer text-[22px] lg:text-[23px] p-0 border-0 bg-transparent font-normal"
                style={{ color: SWEATSHIRT_GREEN }}
              >
                {item.label}
              </button>
              {index < navLinks.length - 1 && <span style={{ color: SWEATSHIRT_GREEN }}>,&nbsp;</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="text-[22px] lg:text-[23px] underline underline-offset-2 hover:opacity-75 transition-opacity cursor-pointer bg-transparent border-0 p-0 font-normal"
            style={{ color: SWEATSHIRT_GREEN }}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none z-20 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
            style={{ backgroundColor: SWEATSHIRT_GREEN }}
          />
          <span
            className={`w-6 h-[2px] transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backgroundColor: SWEATSHIRT_GREEN }}
          />
          <span
            className={`w-6 h-[2px] transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
            style={{ backgroundColor: SWEATSHIRT_GREEN }}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm md:hidden flex flex-col justify-center px-8 gap-7 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleLinkClick(item.modal)}
            className="text-[30px] font-medium text-black text-left hover:text-[#7D8D56] transition-colors bg-transparent border-0 p-0 cursor-pointer"
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleLinkClick('contact')}
          className="text-[30px] font-medium text-black text-left underline underline-offset-4 hover:text-[#7D8D56] transition-colors bg-transparent border-0 p-0 cursor-pointer pt-2"
        >
          Hire Me ↗
        </button>
      </div>
    </>
  );
};
