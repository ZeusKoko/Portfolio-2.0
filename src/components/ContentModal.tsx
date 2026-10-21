import React, { useState, useEffect } from 'react';

export type ModalType =
  | 'work'
  | 'about'
  | 'services'
  | 'gallery'
  | 'reviews'
  | 'contact'
  | null;

interface ContentModalProps {
  type: ModalType;
  onClose: () => void;
}

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: 'Zeupreme Deli',
    category: 'Restaurant & Hospitality Website',
    description:
      'A modern, responsive website for a premium deli restaurant in Nairobi with an online ordering system and curated menu.',
    tags: ['React', 'Tailwind CSS', 'Ordering System', 'UI/UX'],
    image: '/portfolio/deli.png',
    liveUrl: 'https://zeupremedeli.netlify.app/',
    githubUrl: 'https://github.com/ZeusKoko/Deli',
  },
  {
    title: 'Afya Yangu Hospital',
    category: 'Healthcare & Hospital Website',
    description:
      'A responsive hospital website featuring doctor profiles, medical departments, service booking, and clean patient-centric design.',
    tags: ['React', 'Healthcare', 'Appointment Booking', 'Tailwind'],
    image: '/portfolio/afyayangu.png',
    liveUrl: 'https://afyayangu.netlify.app/',
    githubUrl: 'https://github.com/ZeusKoko/afyayangu',
  },
  {
    title: 'Andes Accessories',
    category: 'Streetwear E-commerce Website',
    description:
      'E-commerce experience for Andes Accessories, a girly streetwear brand featuring waist chains, pins, custom bags, and accessories.',
    tags: ['E-Commerce', 'Brand System', 'Product Catalog', 'Frontend'],
    image: '/portfolio/andes accessories screenshot.png',
    liveUrl: 'https://andesa.netlify.app/',
    githubUrl: 'https://github.com/ZeusKoko/andes-accessories',
  },
  {
    title: 'Mayboke Construction',
    category: 'Corporate Construction Website',
    description:
      'A polished construction and engineering business website built to present brand offerings clearly, showcase residential and commercial builds, and convert interest into inquiries.',
    tags: ['Web Design', 'Construction OEM', 'Conversion UI'],
    image: '/assets/aistudio/image_cc29e6cd.png',
    liveUrl: 'https://mayboke.co.ke/',
  },
  {
    title: 'FRAZE',
    category: 'Creative-Tech Studio & Digital Agency',
    description:
      'Creative-Tech Studio in Kenya founded & developed by Zeus. Building modern websites, memorable brands, clean graphics, SEO-ready pages, and stronger digital presence for businesses.',
    tags: ['Founder & Developer', 'Creative Studio', 'React & Vite', 'Branding'],
    image: '/assets/aistudio/image_c5768f30.png',
    liveUrl: 'https://fraze.co.ke/',
    githubUrl: 'https://github.com/ZeusKoko/FRAZE',
  },
  {
    title: 'Kisaka & Shalle Advocates',
    category: 'Legal Firm Website',
    description:
      'A professional legal website built on trust, clarity, practice area navigation, and direct client consultation intake for Nairobi legal practice.',
    tags: ['Legal & Corporate', 'Professional Services', 'Consultation'],
    image: '/assets/aistudio/image_b1d552e2.png',
    liveUrl: 'https://kisakaandshalleadvocates.co.ke/',
  },
];

interface GalleryItem {
  id: string;
  title: string;
  category: 'Brand Systems' | 'Poster Work' | 'Product Design';
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Zeupreme Deli Brand Kit',
    category: 'Brand Systems',
    image: '/portfolio/gallery/Zeupreme deli brand kit.png',
    description: 'Complete visual identity, palette system, typestack, and logo suite.',
  },
  {
    id: 'g2',
    title: 'Andes Accessories Brand Board',
    category: 'Brand Systems',
    image: '/portfolio/gallery/Andes Accessories Brand Board.png',
    description: 'Streetwear accessory brand guidelines, product badges, and typographic voice.',
  },
  {
    id: 'g3',
    title: 'Corporate Business Card Mockup',
    category: 'Brand Systems',
    image: '/portfolio/gallery/Business Card Mockup.png',
    description: 'Tactile foil stamped card design on heavy uncoated black stock.',
  },
  {
    id: 'g4',
    title: 'Blue Clouds Poster Design',
    category: 'Poster Work',
    image: '/portfolio/gallery/blue CLOUDS poster design.png',
    description: 'Atmospheric typography and surreal landscape poster exploration.',
  },
  {
    id: 'g5',
    title: 'KENYA UNCUT Editorial Poster',
    category: 'Poster Work',
    image: '/portfolio/gallery/KENYA UNCUT poster design.png',
    description: 'Contemporary culture, music showcase, and street narrative design.',
  },
  {
    id: 'g6',
    title: 'Street Wear Poster Series',
    category: 'Poster Work',
    image: '/portfolio/gallery/street wear poster design.png',
    description: 'High-contrast typography, apparel showcase, and underground graphics.',
  },
  {
    id: 'g7',
    title: 'Product Design Crocs',
    category: 'Product Design',
    image: '/portfolio/gallery/product design crocs.png',
    description: 'Custom footwear colorway rendering and promotional 3D layout.',
  },
  {
    id: 'g8',
    title: 'Brown Boba Coffee Packaging',
    category: 'Product Design',
    image: '/portfolio/gallery/brown boba coffee pd.png',
    description: 'Artisanal beverage branding, can mockup, and retail labeling.',
  },
  {
    id: 'g9',
    title: 'Zeupreme Deli Food Packaging',
    category: 'Product Design',
    image: '/portfolio/gallery/Zeupreme deli product design.png',
    description: 'Custom takeout packaging, sandwich wraps, and takeaway cups.',
  },
];

const skills = [
  { name: 'React', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Styling & UI' },
  { name: 'JavaScript & TS', category: 'Frontend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Laravel', category: 'Backend' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Adobe Photoshop', category: 'Visual Design' },
  { name: 'Figma', category: 'UI / UX' },
  { name: 'Git & GitHub', category: 'Workflow' },
  { name: 'Brand Systems', category: 'Creative' },
];

const testimonials = [
  {
    quote:
      'Zeus transformed our small deli into a digital powerhouse. Our online orders increased by 300% within the first month. His attention to detail and understanding of our business needs was exceptional. The website is not just beautiful, it’s functional and drives real results.',
    author: 'Owner',
    organization: 'Zeupreme Deli — Nairobi',
  },
  {
    quote:
      'Working with Zeus on our hospital website was a game-changer. He understood the medical field’s requirements and created a platform that’s both professional and user-friendly. Patient appointments have increased significantly, and the online booking system works flawlessly.',
    author: 'Medical Director',
    organization: 'Afya Yangu Hospital — Mombasa',
  },
  {
    quote:
      'The student management system Zeus developed for our school has revolutionized how we handle admissions and academic records. It’s intuitive, secure, and has saved us countless hours of paperwork. The support and training he provided was outstanding.',
    author: 'Principal',
    organization: 'St. Mary’s Academy — Kisumu',
  },
];

export const ContentModal: React.FC<ContentModalProps> = ({ type, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [galleryCategory, setGalleryCategory] = useState<string>('All');
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setFormSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
    setPreviewImage(null);
  }, [type]);

  if (!type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const filteredGallery =
    galleryCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryCategory);

  const renderContent = () => {
    switch (type) {
      case 'work':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <p className="text-xs sm:text-sm text-neutral-500">
                Selected web development and digital products built by Zeus
              </p>
              <a
                href="https://github.com/ZeusKoko"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-black hover:opacity-60 underline underline-offset-2"
              >
                github.com/ZeusKoko ↗
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((proj) => (
                <div
                  key={proj.title}
                  className="group rounded-xl border border-neutral-200 bg-neutral-50/60 overflow-hidden flex flex-col hover:border-black transition-colors"
                >
                  {proj.image && (
                    <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        {proj.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-semibold text-black mt-1">
                        {proj.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono bg-white border border-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-medium text-neutral-700 hover:text-black underline underline-offset-2"
                          >
                            Code
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-black bg-white border border-black/20 hover:bg-black hover:text-white px-2.5 py-1 rounded-md transition-colors"
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-neutral-200 shadow-sm bg-neutral-100">
                <img
                  src="/portfolio/pep.jpg"
                  alt="Peter Kokonya (Zeus)"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Profile & Experience
                </span>
                <h4 className="text-xl sm:text-2xl font-semibold text-black">
                  Peter Kokonya (Zeus)
                </h4>
                <p className="text-sm font-medium text-neutral-700">
                  Founder & Creative Developer at <a href="https://fraze.co.ke/" target="_blank" rel="noreferrer" className="text-black underline underline-offset-2 hover:opacity-75">Fraze</a> · Front-End Developer & Graphics Designer
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  I craft expressive front-end interfaces and sharp visual systems. As founder and creative developer of <a href="https://fraze.co.ke/" target="_blank" rel="noreferrer" className="font-semibold text-black underline underline-offset-2">Fraze</a>, my work bridges clean code with artistic vision: from logo design, brand architecture, and packaging to responsive React applications with seamless user interactions.
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-5">
              <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                Core Tech & Tools
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {skills.map((s) => (
                  <div
                    key={s.name}
                    className="p-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 hover:border-black transition-colors"
                  >
                    <div className="text-xs font-semibold text-black">{s.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      {s.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="mailto:kokonyazeus@gmail.com"
                  className="text-xs font-medium bg-black text-white px-3.5 py-1.5 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  kokonyazeus@gmail.com
                </a>
                <a
                  href="https://wa.me/254705477887"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  WhatsApp: +254 705 477 887
                </a>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <a
                  href="https://www.linkedin.com/in/peter-kokonya/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black underline underline-offset-2 hover:opacity-60"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/ZeusKoko"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black underline underline-offset-2 hover:opacity-60"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-5">
            <p className="text-xs sm:text-sm text-neutral-600">
              I help brands move from scattered ideas to sharp digital presence: websites, visuals,
              content systems, and launch support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50">
                <span className="text-xs font-mono text-neutral-400">01</span>
                <h4 className="text-base font-semibold text-black mt-1">
                  Website Design & Build
                </h4>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Custom portfolio, business, and landing pages with strong layout, responsive
                  structure, and visuals that feel made for your brand.
                </p>
              </div>

              <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50">
                <span className="text-xs font-mono text-neutral-400">02</span>
                <h4 className="text-base font-semibold text-black mt-1">
                  Front-End Development
                </h4>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Clean interfaces built with practical React code, smooth interactions, and the
                  kind of responsiveness that makes a site feel finished.
                </p>
              </div>

              <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50">
                <span className="text-xs font-mono text-neutral-400">03</span>
                <h4 className="text-base font-semibold text-black mt-1">
                  Brand Systems & Identity
                </h4>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Distinctive visual systems for businesses that need to look credible, memorable,
                  and consistent across digital and physical touchpoints.
                </p>
              </div>

              <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50">
                <span className="text-xs font-mono text-neutral-400">04</span>
                <h4 className="text-base font-semibold text-black mt-1">
                  Digital Assets & Posters
                </h4>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Scroll-stopping digital assets for launches, promos, social campaigns, culture
                  events, and high-impact business communication.
                </p>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-5">
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-neutral-100">
              {['All', 'Brand Systems', 'Poster Work', 'Product Design'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setGalleryCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                    galleryCategory === cat
                      ? 'bg-black text-white font-medium'
                      : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPreviewImage(item)}
                  className="group cursor-pointer rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50 hover:border-black transition-all"
                >
                  <div className="aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      {item.category}
                    </span>
                    <h5 className="text-xs font-semibold text-black truncate mt-0.5">
                      {item.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox Modal */}
            {previewImage && (
              <div
                className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setPreviewImage(null)}
              >
                <div
                  className="max-w-4xl max-h-[90vh] bg-neutral-950 p-2 sm:p-4 rounded-2xl flex flex-col items-center overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full flex items-center justify-between pb-2 text-white px-2">
                    <div>
                      <h4 className="text-sm font-semibold">{previewImage.title}</h4>
                      <p className="text-xs text-neutral-400">{previewImage.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewImage(null)}
                      className="text-sm bg-white/10 hover:bg-white/20 text-white rounded-full w-7 h-7 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                  <img
                    src={previewImage.image}
                    alt={previewImage.title}
                    className="max-h-[75vh] w-auto object-contain rounded-lg mt-2"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-5">
            <p className="text-xs sm:text-sm text-neutral-500">
              Direct feedback from business owners and institutional partners
            </p>

            <div className="space-y-4">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-3"
                >
                  <p className="text-xs sm:text-sm text-neutral-800 italic leading-relaxed">
                    “{t.quote}”
                  </p>
                  <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-black block">{t.author}</span>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        {t.organization}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Verified Client
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return formSubmitted ? (
          <div className="p-8 text-center bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="w-10 h-10 mx-auto rounded-full bg-black text-white flex items-center justify-center mb-3">
              ✓
            </div>
            <h4 className="text-lg font-medium text-black">Message Sent!</h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-sm mx-auto">
              Thank you for reaching out. Zeus will review your project details and get back to you
              promptly at <span className="font-semibold text-black">{formData.email}</span>.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="mailto:kokonyazeus@gmail.com"
                className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:border-black transition-colors block"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Direct Email
                </span>
                <span className="text-xs sm:text-sm font-semibold text-black mt-0.5 block truncate">
                  kokonyazeus@gmail.com
                </span>
              </a>
              <a
                href="https://wa.me/254705477887"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:border-black transition-colors block"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 block">
                  WhatsApp Direct
                </span>
                <span className="text-xs sm:text-sm font-semibold text-black mt-0.5 block">
                  +254 705 477 887 ↗
                </span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 border-t border-neutral-200 pt-5">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
                  Project Scope / Idea
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about what you need built, timeline, or goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Send Message to Zeus
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  const titles: Record<ModalType & string, { title: string; subtitle: string }> = {
    work: {
      title: 'Selected Projects',
      subtitle: 'Front-end applications, corporate sites, and e-commerce platforms',
    },
    about: {
      title: 'About Zeus Koko',
      subtitle: 'Creative developer and visual designer based in Kenya',
    },
    services: {
      title: 'Services & Capabilities',
      subtitle: 'Web design, front-end engineering, brand systems, and launch support',
    },
    gallery: {
      title: 'Graphic & Visual Design Gallery',
      subtitle: 'Brand identity kits, poster art, packaging, and commercial visual systems',
    },
    reviews: {
      title: 'Client Testimonials',
      subtitle: 'Real project outcomes and partnerships',
    },
    contact: {
      title: 'Get in Touch / Hire Me',
      subtitle: 'Available for freelance builds, frontend engineering, and visual design',
    },
  };

  const headerInfo = titles[type as keyof typeof titles] || {
    title: '',
    subtitle: '',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-5 sm:p-7 overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black">
              {headerInfo.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              {headerInfo.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:border-black transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="mt-5 max-h-[75vh] overflow-y-auto pr-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
