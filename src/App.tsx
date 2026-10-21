import { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContentModal, ModalType } from './components/ContentModal';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none font-sans">
      {/* Background Video (mouse-scrub controlled) */}
      <BackgroundVideo />

      {/* Fixed Navbar (z-index: 10) */}
      <Navbar onOpenModal={(type) => setActiveModal(type)} />

      {/* Hero Section (z-index: 1) */}
      <Hero onOpenModal={(type) => setActiveModal(type)} />

      {/* Content Modal for interactive navigation links and action pills */}
      <ContentModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
