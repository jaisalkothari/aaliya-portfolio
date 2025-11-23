import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Instagram, Mail, Play } from 'lucide-react';

// --- Assets & Config ---
const IMAGES = {
    hero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    about: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    project1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    project2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    project3: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop", // Placeholder for Aaliya
};

const COLORS = {
    cream: "#F5F0E1",
    black: "#1a1a1a",
    blue: "#C8D9EB",
    white: "#ffffff",
    accent: "#D4C5A9"
};

// --- Components ---

const Sidebar = ({ toggleMenu }) => (
    <div className="fixed left-0 top-0 h-full w-16 md:w-20 bg-white border-r border-gray-200 z-50 flex flex-col justify-between items-center py-8">
        <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu size={24} strokeWidth={1.5} />
        </button>

        <div className="flex-grow flex items-center justify-center w-full relative">
            <div className="absolute rotate-180" style={{ writingMode: 'vertical-rl' }}>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 flex gap-8 items-center">
                    <span>Designing Miami</span>
                    <span>•</span>
                    <span>Netflix</span>
                    <span>•</span>
                    <span>Out Now</span>
                </span>
            </div>
        </div>

        <div className="flex flex-col gap-6 items-center">
            <div className="h-12 w-[1px] bg-gray-300"></div>
            <span className="rotate-180 text-xs font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                STAY IN TOUCH
            </span>
        </div>
    </div>
);

const FullScreenMenu = ({ isOpen, toggleMenu }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 bg-[#F5F0E1] z-[60] flex"
            >
                <div className="w-20 h-full border-r border-gray-300 flex flex-col items-center py-8 bg-white">
                    <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>
                <div className="flex-1 p-12 md:p-24 flex flex-col justify-center">
                    <nav className="flex flex-col gap-4">
                        {['Home', 'Projects', 'About', 'Shop', 'Press', 'Contact'].map((item, i) => (
                            <motion.a
                                key={item}
                                href="#"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="text-6xl md:text-8xl font-serif hover:italic hover:ml-8 transition-all duration-300 cursor-pointer text-[#1a1a1a]"
                                onClick={toggleMenu}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </nav>
                </div>
                <div className="hidden lg:block w-1/3 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.project1})` }}>
                    <div className="h-full w-full bg-black/10"></div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

const Section = ({ children, className = "", style = {} }) => (
    <section
        className={`flex-shrink-0 h-screen w-screen md:w-auto md:min-w-[80vw] lg:min-w-[60vw] flex items-center relative overflow-hidden px-8 md:px-24 py-12 ${className}`}
        style={style}
    >
        {children}
    </section>
);

const CurvedOverlay = ({ position = "right" }) => {
    // Abstract shapes matching the reference style
    if (position === "right") {
        return (
            <div className="absolute top-0 right-0 h-full w-1/2 pointer-events-none z-10 hidden md:block">
                <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="h-full w-full fill-[#F5F0E1]">
                    <path d="M100 0H50C80 50 20 80 20 100C20 120 80 150 50 200H100V0Z" />
                </svg>
            </div>
        );
    }
    return (
        <div className="absolute bottom-0 left-0 h-1/2 w-full pointer-events-none z-10 md:hidden">
            <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="h-full w-full fill-[#F5F0E1]">
                <path d="M0 100V50C50 80 80 20 100 20C120 20 150 80 200 50V100H0Z" />
            </svg>
        </div>
    );
};

export default function AaliyaPortfolio() {
    const containerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Horizontal scroll logic
    useEffect(() => {
        const container = containerRef.current;

        const handleWheel = (e) => {
            // Only active on desktop/wide screens
            if (window.innerWidth > 768 && container) {
                // If the user is scrolling vertically (deltaY is dominant)
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    // Manually scroll horizontally
                    container.scrollLeft += e.deltaY;
                    // Prevent default vertical behavior (though overflow-y is hidden, this stops other side effects)
                    e.preventDefault();
                }
            }
        };

        if (container) {
            // passive: false is required to use preventDefault
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div className="bg-[#F5F0E1] min-h-screen text-[#1a1a1a] font-sans selection:bg-[#C8D9EB] selection:text-black overflow-hidden">

            {/* Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* Hide Scrollbar for clean look */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            <Sidebar toggleMenu={() => setIsMenuOpen(true)} />
            <FullScreenMenu isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(false)} />

            {/* Brand Header Fixed */}
            <div className="fixed top-0 left-20 right-0 p-8 z-40 flex justify-center md:justify-start md:pl-12 pointer-events-none">
                <h1 className="font-sans text-sm uppercase tracking-widest font-semibold pointer-events-auto">
                    Aaliya Choudhary
                </h1>
            </div>

            {/* Main Horizontal Container */}
            <main
                ref={containerRef}
                className="flex flex-col md:flex-row h-screen overflow-x-auto overflow-y-hidden hide-scrollbar snap-x snap-mandatory scroll-smooth"
            >

                {/* --- SECTION 1: HERO --- */}
                <Section className="bg-[#F5F0E1] min-w-[100vw] md:min-w-[85vw] snap-start relative">
                    <div className="absolute inset-0 md:left-20">
                        <div className="h-full w-full md:w-3/4 relative overflow-hidden">
                            <img
                                src={IMAGES.hero}
                                alt="Interior Architecture"
                                className="h-full w-full object-cover opacity-90"
                            />
                            {/* Abstract Organic Shape Overlay */}
                            <svg className="absolute top-0 right-0 h-full w-full md:w-1/2 text-[#F5F0E1] fill-current transform scale-110 md:translate-x-1/4" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M100 0H50C20 30 80 70 50 100H100V0Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative z-20 flex flex-col justify-center h-full ml-0 md:ml-20 max-w-4xl pointer-events-none mix-blend-darken">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col"
                        >
                            <h1 className="font-serif text-6xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tight">
                                <span className="italic block ml-4 md:ml-12">Design</span>
                                <span className="block font-bold">HOUSE</span>
                            </h1>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-12 left-0 right-0 flex justify-center md:justify-start md:left-32 text-xs font-bold tracking-widest uppercase">
                        <span>00:52:59 Miami, FL</span>
                    </div>
                </Section>


                {/* --- SECTION 2: MISSION / ABOUT --- */}
                <Section className="bg-white min-w-[100vw] md:min-w-[60vw] snap-start flex-col justify-center items-start border-l border-gray-100">
                    <div className="max-w-2xl pl-4 md:pl-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="w-16 h-1 bg-black mb-12"></div>
                            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
                                "<span className="italic">Interdisciplinary</span> <br />
                                <span className="font-bold">DESIGN HOUSE</span> <br />
                                WITH A <span className="italic">diversified & comprehensive</span> <br />
                                <span className="font-bold">APPROACH</span>"
                            </h2>
                            <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
                                Founded by Aaliya Choudhary, our studio transforms spaces into living art.
                                Merging 1950s brutalism with modern coastal luxury, we create environments
                                that breathe.
                            </p>
                        </motion.div>
                    </div>
                </Section>

                {/* --- SECTION 3: PROJECT SHOWCASE (VIDEO/IMG) --- */}
                <Section className="bg-white min-w-[100vw] md:min-w-[50vw] snap-start p-0">
                    <div className="h-full w-full relative group cursor-pointer overflow-hidden">
                        <img src={IMAGES.project2} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                <Play className="ml-1 fill-black text-black" size={32} />
                            </div>
                        </div>
                        <div className="absolute bottom-12 left-12 text-white p-8 max-w-md">
                            <p className="text-sm font-sans mb-4 leading-relaxed drop-shadow-lg">
                                Driven by the intertwined parallelisms of art and design, we aspire to embolden our community.
                            </p>
                            <button className="px-6 py-2 border border-white rounded-full text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-widest">
                                Read More
                            </button>
                        </div>
                    </div>
                </Section>

                {/* --- SECTION 4: PROJECT LIST --- */}
                <Section className="bg-white min-w-[100vw] md:min-w-[40vw] snap-start flex-col pt-32">
                    <div className="w-full px-4 md:px-12">
                        <div className="flex justify-between border-b border-black pb-4 mb-8 text-xs font-bold tracking-widest uppercase">
                            <span>Year</span>
                            <span>Project</span>
                        </div>

                        {[
                            { year: '2024', name: 'Heritage Haven', type: 'Residential' },
                            { year: '2023', name: 'Courtyard Villa', type: 'Commercial' },
                            { year: '2023', name: 'Gol Dak Khana Museum', type: 'Private' },
                            { year: '2022', name: 'Orleans Chateau II', type: 'Historical' },
                            { year: '2021', name: 'Lake Vista', type: 'Landscape' },
                            { year: '2020', name: 'Douglas Station', type: 'Public' },
                        ].map((project, idx) => (
                            <div key={idx} className="group flex justify-between items-baseline py-6 border-b border-gray-200 hover:border-black cursor-pointer transition-colors">
                                <span className="font-serif text-xl text-gray-400 group-hover:text-black transition-colors">{project.year}</span>
                                <div className="text-right">
                                    <span className="font-serif text-2xl md:text-3xl block group-hover:italic transition-all">{project.name}</span>
                                    <span className="font-sans text-xs text-gray-400 uppercase tracking-wide group-hover:text-gray-600">{project.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* --- SECTION 5: AGENTS OF CHANGE --- */}
                <Section className="bg-[#F5F0E1] min-w-[100vw] md:min-w-[80vw] snap-start relative p-0">
                    <div className="absolute top-0 left-0 w-2/3 h-full">
                        <img src={IMAGES.about} className="h-full w-full object-cover" />
                    </div>

                    {/* Angled Overlay */}
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-[#F5F0E1] z-10"
                        style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)' }}>
                        <div className="h-full flex flex-col justify-end pb-24 pl-24 pr-12">
                            <h2 className="font-serif text-7xl md:text-8xl leading-none text-right">
                                Agents of <br />
                                <span className="italic font-light">Creative Change</span>
                            </h2>
                        </div>
                    </div>
                </Section>

                {/* --- SECTION 6: PRESS & NEWS --- */}
                <Section className="bg-white min-w-[100vw] md:min-w-[50vw] snap-start flex-col justify-center items-center text-center">
                    <div className="mb-12 flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                        {/* Mock Logos */}
                        <span className="font-serif font-bold text-xl">MIAMI LIVING</span>
                        <span className="font-sans font-bold text-xl text-red-600">NETFLIX</span>
                        <span className="font-serif italic text-xl">OceanDrive</span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl max-w-xl leading-tight mb-8">
                        "1950's-Style Oceanside Miami Condo Transformed Into a Luxurious Modern Oasis"
                    </h3>

                    <button className="px-8 py-3 border border-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        View All Press
                    </button>
                </Section>

                {/* --- SECTION 7: CONTACT / BLUE --- */}
                <Section className="bg-[#C8D9EB] min-w-[100vw] md:min-w-[50vw] snap-start relative flex-col justify-between">
                    <div className="w-full flex justify-between items-start pt-12 px-4">
                        <div>
                            <h2 className="font-serif text-4xl mb-6">Projects<br />About<br />Shop<br />Press<br />Contact</h2>
                        </div>
                        <div className="bg-[#F5F0E1] p-8 max-w-xs">
                            <h4 className="font-bold uppercase text-xs mb-4 tracking-widest">Sign Up For Newsletter</h4>
                            <div className="flex border-b border-black pb-2 mb-4">
                                <input type="email" placeholder="Your Email*" className="bg-transparent outline-none w-full text-sm placeholder-gray-500" />
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full border-t border-black/20 pt-8 flex flex-col md:flex-row justify-between text-xs font-sans text-gray-600 gap-4">
                        <div>
                            <p className="font-bold text-black mb-1">Contact us at:</p>
                            <a href="mailto:hello@aaliyachoudhary.com" className="hover:underline">hello@aaliyachoudhary.com</a>
                            <p className="mt-4">7310 Northwest 3rd Avenue<br />Miami, FL</p>
                        </div>
                        <div className="flex gap-4">
                            <Instagram size={20} />
                            <Mail size={20} />
                        </div>
                        <div className="flex gap-4 uppercase tracking-wider">
                            <a href="#">Refund Policy</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Site Credit</a>
                        </div>
                    </div>
                </Section>

            </main>
        </div>
    );
}