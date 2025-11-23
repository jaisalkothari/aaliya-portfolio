
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram, Mail, Play } from 'lucide-react';
import spiralStaircase from '../../assets/spiral_staircase.png';
import projectThumb1 from '../../assets/project_thumb_1.jpg';
import projectThumb2 from '../../assets/project_thumb_2.png';
import projectThumb3 from '../../assets/project_thumb_3.jpg';
import technicalSketch from '../../assets/technical_sketch.png';

// --- Assets & Config ---
const IMAGES = {
    hero: spiralStaircase,
    thumb1: projectThumb1,
    thumb2: projectThumb2,
    thumb3: projectThumb3,
    sketch: technicalSketch,
    about: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    project1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    project2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    project3: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop", // Placeholder for Aaliya
};

const COLORS = {
    cream: "#ffffff",
    black: "#000000",
    blue: "#3B82F6",
    white: "#f3f4f6",
    accent: "#9CA3AF"
};

// --- Components ---

const Sidebar = ({ toggleMenu }) => (
    <div className="fixed left-0 top-0 h-full w-16 md:w-20 bg-white border-r border-gray-200 z-50 flex flex-col justify-between items-center py-8">
        <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu size={24} strokeWidth={1.5} />
        </button>

        <div className="flex-grow flex items-center justify-center w-full relative">
            <div className="absolute rotate-180 flex flex-row gap-12 items-center" style={{ writingMode: 'vertical-rl' }}>
                <Link to="/project/heritage-haven" className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors">
                    Heritage Haven
                </Link>
                <Link to="/project/courtyard-villa" className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors">
                    Courtyard Villa
                </Link>
                <Link to="/project/gol-dak-khana-museum" className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors">
                    Gol Dak Khana Museum
                </Link>
            </div>
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
                className="fixed inset-0 bg-[#ffffff] z-[60] flex"
            >
                <div className="w-20 h-full border-r border-gray-300 flex flex-col items-center py-8 bg-white">
                    <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>
                <div className="flex-1 p-12 md:p-24 flex flex-col justify-center">
                    <nav className="flex flex-col gap-6">
                        {[
                            { title: 'Heritage Haven', path: '/project/heritage-haven' },
                            { title: 'Courtyard Villa', path: '/project/courtyard-villa' },
                            { title: 'Gol Dak Khana Museum', path: '/project/gol-dak-khana-museum' }
                        ].map((item, i) => (
                            <Link
                                key={item.title}
                                to={item.path}
                                onClick={toggleMenu}
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="text-5xl md:text-7xl font-serif hover:italic hover:ml-8 transition-all duration-300 cursor-pointer text-[#1a1a1a] block"
                                >
                                    {item.title}
                                </motion.span>
                            </Link>
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
        className={`flex-shrink-0 h-screen w-screen md:w-auto md:min-w-[80vw] lg:min-w-[100vw] flex items-center relative overflow-hidden px-8 md:px-24 py-12 ${className}`}
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
                <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="h-full w-full fill-[#ffffff]">
                    <path d="M100 0H50C80 50 20 80 20 100C20 120 80 150 50 200H100V0Z" />
                </svg>
            </div>
        );
    }
    return (
        <div className="absolute bottom-0 left-0 h-1/2 w-full pointer-events-none z-10 md:hidden">
            <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="h-full w-full fill-[#ffffff]">
                <path d="M0 100V50C50 80 80 20 100 20C120 20 150 80 200 50V100H0Z" />
            </svg>
        </div>
    );
};

export default function AaliyaPortfolio() {
    const containerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleProjectClick = (projectName) => {
        const slug = projectName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/project/${slug}`);
    };

    // Horizontal scroll logic
    useEffect(() => {
        const handleWheel = (e) => {
            const container = containerRef.current;
            // Only active on desktop/wide screens
            if (window.innerWidth > 768 && container) {
                // If the user is scrolling vertically (deltaY is dominant)
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    // Manually scroll horizontally
                    container.scrollLeft += e.deltaY;
                    // Prevent default vertical behavior
                    e.preventDefault();
                }
            }
        };

        // passive: false is required to use preventDefault
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className="bg-[#ffffff] min-h-screen text-[#1a1a1a] font-sans selection:bg-[#3B82F6] selection:text-black overflow-hidden">

            <Sidebar toggleMenu={() => setIsMenuOpen(true)} />
            <FullScreenMenu isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(false)} />

            {/* Brand Header Fixed */}
            <div className="fixed top-0 left-20 right-0 p-8 z-40 flex justify-center md:justify-start md:pl-12 pointer-events-none mix-blend-difference">
                <h1 className="font-sans text-sm uppercase tracking-widest font-semibold pointer-events-auto text-white">
                    Aaliya Choudhary
                </h1>
            </div>

            {/* Main Horizontal Container */}
            <main
                ref={containerRef}
                className="flex flex-col md:flex-row h-screen overflow-x-auto hide-scrollbar"
            >

                {/* --- SECTION 1: HERO --- */}
                <Section className="bg-[#ffffff] w-screen snap-start relative flex items-center">
                    {/* Text Container - Left Side */}
                    <div className="relative z-20 flex flex-col justify-center h-full px-8 md:px-24 max-w-4xl pointer-events-none mix-blend-darken w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col"
                        >
                            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-[#1a1a1a]">
                                <span className="">Interior</span> <span className="italic text-zinc-700">Architect & Designer</span>
                            </h1>
                        </motion.div>
                    </div>

                    {/* Image Container - Right Side */}
                    <div className="absolute inset-y-0 right-0 w-full md:w-2/3">
                        <div className="h-full w-full relative overflow-hidden">
                            <img
                                src={IMAGES.hero}
                                alt="Interior Architecture"
                                className="h-full w-full object-cover opacity-90"
                            />
                            {/* Abstract Organic Shape Overlay - Flipped for Right Side */}
                            <svg className="absolute top-0 left-0 h-full w-full md:w-2/3 text-[#ffffff] fill-current transform scale-110 -translate-x-1/4 rotate-180" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M100 0H50C20 30 80 70 50 100H100V0Z" />
                            </svg>
                        </div>
                    </div>


                    <div className="absolute bottom-12 left-0 right-0 flex justify-center md:justify-start md:left-32 text-xs font-bold tracking-widest uppercase">
                        <span>2025</span>
                    </div>
                </Section>




                {/* --- SECTION 2: MISSION / ABOUT --- */}
                <Section className="bg-zinc-700 min-w-[100vw] md:min-w-[60vw] snap-start flex-col justify-center items-start border-l border-gray-100">
                    <div className="max-w-4xl pl-4 md:pl-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="w-16 h-1 bg-white mb-12"></div>

                            {/* Dictionary Definition Style */}
                            <div className="mb-12 font-serif text-white">
                                <h2 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">
                                    Evolving Permanence
                                </h2>
                                <div className="flex items-baseline gap-4 mb-6 text-zinc-300 font-sans">
                                    <span className="italic text-lg">/ɪˈvɒlvɪŋ ˈpɜːrmənəns/</span>
                                    <span className="italic text-sm">[noun]</span>
                                </div>
                                <p className="text-xl md:text-2xl leading-relaxed max-w-4xl border-l-4 border-white pl-6 py-2">
                                    The quality of a space to remain timeless and grounded while gracefully adapting to the shifting needs of life, seasons, and generations.
                                </p>
                            </div>
                            <p className="font-sans text-sm md:text-base text-zinc-300 leading-relaxed max-w-4xl">
                                I’m Aaliya, an interior designer based in New Delhi. I see the world as something always in motion—cities grow, technology shifts, and the way we live changes from season to season. My work is about creating spaces that can move with you through all of that, without losing themselves. I don’t design for trends; I design for lives. Each project focuses on timeless forms, thoughtful details, and flexible layouts that can adapt over time, so your home feels just as honest and effortless years from now as it does on the first day you walk into it.
                            </p>
                        </motion.div>
                    </div>
                </Section>

                {/* --- SECTION 3: RESUME --- */}
                <Section className="bg-white snap-start flex items-center border-l border-gray-200">
                    <div className="h-full grid gap-x-12 gap-y-8 p-12" style={{ gridTemplateColumns: '300px 600px 450px' }}>

                        {/* Summary spans 2 columns */}
                        <div className="col-span-2 flex flex-col">
                            <div>
                                <h4 className="font-bold text-sm tracking-widest uppercase mb-4 border-b border-black pb-2">Professional Summary</h4>
                                <p className="text-sm leading-relaxed text-gray-600 text-left">
                                    I am an Interior Architecture & Design student with a strong foundation in conceptual design and technical proficiency. I excel in Hand & CAD drafting, 3D modeling, and rendering. My portfolio showcases innovative and functional spaces, thoughtful material selection, and refined interior styling. I have a keen eye for detail and am dedicated to creating research-driven solutions that seamlessly integrate cutting-edge technology and comprehensive space planning.
                                </p>
                            </div>
                        </div>

                        {/* Col 3 Row 1 */}
                        <div className="flex flex-col">
                            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 border-b border-black pb-2">Certifications</h4>
                            <div className="space-y-2">
                                <div>
                                    <p className="font-bold text-sm">Futuristic Interior Design</p>
                                    <p className="text-xs text-gray-500">IIT Delhi</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Cafe & Restaurant Design</p>
                                    <p className="text-xs text-gray-500">Archilecture India</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Asian Paints INSPIRA Design Challenge</p>
                                    <p className="text-xs text-gray-500">Finalist</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Introduction to the Metaverse</p>
                                    <p className="text-xs text-gray-500">IIT Delhi</p>
                                </div>
                            </div>
                        </div>

                        {/* Col 1 Row 2 */}
                        <div className="flex flex-col">
                            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 border-b border-black pb-2">Education</h4>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-bold text-gray-400 block mb-1">2023 - 2027</span>
                                    <p className="font-bold text-sm">BA (Hons) Interior Architecture and Design</p>
                                    <p className="text-xs text-gray-500">Indian Institute of Art and Design, (Kingston University)</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 block mb-1">2019 - 2023</span>
                                    <p className="font-bold text-sm">CBSE Humanities</p>
                                    <p className="text-xs text-gray-500">Delhi Public School, Gurgaon</p>
                                </div>
                            </div>
                        </div>

                        {/* Col 2 Row 2 */}
                        <div className="flex flex-col">
                            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 border-b border-black pb-2">Experience</h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold text-sm">Design Intern</p>
                                    <p className="text-xs text-gray-500 mb-2">Genesis Architects Pvt. Ltd.</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        Contributed to end-to-end design workflow, concept ideation, spatial planning, detail development, and client presentation support. Assisted in refining material palettes, coordinating drawings, and ensuring design intent was accurately represented across project deliverables.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Junior Designer</p>
                                    <p className="text-xs text-gray-500 mb-2">ALCA's</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        Worked on residential layouts, interior detailing, and 3D visualization. Conducted material research, prepared client presentations, and collaborated with contractors to maintain design clarity on site.
                                    </p>
                                </div>
                            </div>
                        </div>



                        {/* Col 3 Row 2 */}
                        <div className="flex flex-col">
                            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 border-b border-black pb-2">Skills</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                                <span>AutoCAD</span>
                                <span>Adobe Photoshop</span>
                                <span>Adobe InDesign</span>
                                <span>Adobe Illustrator</span>
                                <span>SketchUp</span>
                                <span>Blender</span>
                                <span>Canva</span>
                                <span>Procreate</span>
                                <span>Drafting & Space Planning</span>
                                <span>Design Research</span>
                                <span>Interior Styling</span>
                                <span>Rendering & Model Making</span>
                                <span>Color Theory</span>
                                <span>Prototyping</span>
                                <span>Material Selection</span>
                                <span>Sustainable Design</span>
                                <span>Technological Strategy</span>
                                <span>Visual Communication</span>
                                <span>Problem Solving</span>
                                <span>Creative Thinking</span>
                                <span>Time Management</span>
                                <span>Team Collaboration</span>
                            </div>
                        </div>

                        {/* Col 1 Row 3 */}
                        <div className="flex flex-col">
                            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 border-b border-black pb-2">Contact & Languages</h4>
                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                                <p>Gurgaon, India</p>
                                <p>aaliyachoudhary24@outlook.com</p>
                                <p>+91 8800778888</p>
                            </div>

                        </div>


                        {/* Col 2 Row 3 */}
                        <div className="flex flex-col">
                            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 border-b border-black pb-2">Courses</h4>
                            <div className="space-y-2">
                                <div>
                                    <p className="font-bold text-sm">Roman Architecture</p>
                                    <p className="text-xs text-gray-500">Yale University</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Design Thinking for Business Strategy</p>
                                    <p className="text-xs text-gray-500">The University of Sydney Business School</p>
                                </div>
                            </div>
                        </div>

                        {/* Col 3 Row 3 */}
                        <div className="flex flex-col">
                            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 border-b border-black pb-2">Extra Curriculars</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Fashion Photography, Fashion Styling, Modeling, Graphic Design, Resin Art, Reading.
                            </p>
                        </div>

                    </div>
                </Section>

                {/* --- SECTION 4: PROJECT LIST --- */}
                <Section className="bg-white min-w-[100vw] md:min-w-[40vw] snap-start flex-col pt-32 relative">
                    <div className="w-full max-w-4xl px-4 md:px-12 relative z-10">
                        <h3 className="font-serif text-4xl mb-12">Projects</h3>

                        {[
                            { year: '2025', name: 'Heritage Haven', type: 'Commercial', img: IMAGES.thumb1 },
                            { year: '2025', name: 'Courtyard Villa', type: 'Residential', img: IMAGES.thumb2 },
                            { year: '2025', name: 'Gol Dak Khana Museum', type: 'Commercial', img: IMAGES.thumb3 },
                        ].map((project, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleProjectClick(project.name)}
                                className="group flex items-center gap-8 py-6 border-b border-gray-200 hover:border-black cursor-pointer transition-colors"
                            >
                                <div className="w-32 h-20 overflow-hidden">
                                    <img src={project.img} alt={project.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <span className="font-serif text-xl text-gray-400 group-hover:text-black transition-colors w-16">{project.year}</span>
                                <div className="flex-grow">
                                    <span className="font-serif text-2xl md:text-3xl block group-hover:italic transition-all">{project.name}</span>
                                </div>
                                <span className="font-sans text-xs text-gray-400 uppercase tracking-wide group-hover:text-gray-600 w-24 text-right">{project.type}</span>
                            </div>
                        ))}
                    </div>

                    {/* Technical Sketch Overlay - Bottom */}
                    <div className="absolute bottom-0 right-0 w-full h-1/4 pointer-events-none z-0 opacity-20 mix-blend-multiply">
                        <div className="w-full h-full" style={{ clipPath: 'url(#blob-clip)' }}>
                            <img
                                src={IMAGES.sketch}
                                alt="Technical Sketch"
                                className="w-full h-full object-cover object-center scale-110"
                            />
                        </div>

                        {/* Define Clip Path */}
                        <svg width="0" height="0" className="absolute">
                            <defs>
                                <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
                                    <path d="M0,1 L0,0.5 C0.2,0.7 0.4,0.2 0.6,0.4 S0.9,0.1 1,0.3 V1 Z" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </Section>

                {/* --- SECTION 5: AGENTS OF CHANGE --- */}
                {/* <Section className="bg-[#ffffff] min-w-[100vw] md:min-w-[80vw] snap-start relative p-0">
                    <div className="absolute top-0 left-0 w-2/3 h-full">
                        <img src={IMAGES.about} className="h-full w-full object-cover" />
                    </div>

                    
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-[#ffffff] z-10"
                        style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)' }}>
                        <div className="h-full flex flex-col justify-end pb-24 pl-24 pr-12">
                            <h2 className="font-serif text-7xl md:text-8xl leading-none text-right">
                                Agents of <br />
                                <span className="italic font-light">Creative Change</span>
                            </h2>
                        </div>
                    </div>
                </Section> */}

                {/* --- SECTION 6: PRESS & NEWS --- */}
                {/* <Section className="bg-white min-w-[100vw] md:min-w-[50vw] snap-start flex-col justify-center items-center text-center">
                    <div className="mb-12 flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">

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
                </Section> */}

                {/* --- SECTION 7: CONTACT / BLUE --- */}
                <Section className="bg-zinc-700 min-w-[100vw] md:min-w-[50vw] snap-start relative flex-col justify-between ">
                    <div className="w-full flex justify-between items-start pt-12 px-4 pl-8">
                        <div>
                            <h2 className="font-serif text-4xl mb-6 text-white"><a href="#">Projects</a><br /><a href="#">About</a><br /><a href="#">Shop</a><br /><a href="#">Press</a><br /><a href="#">Contact</a></h2>
                        </div>

                    </div>

                    <div className="w-full border-t border-white/20 pt-8 ml-8 flex flex-col md:flex-row justify-between text-xs font-sans text-gray-300 gap-4">
                        <div>
                            <p className="font-bold text-white mb-1">Reach me at:</p>
                            <a href="mailto:aaliyachoudhary24@outlook.com" className="hover:underline text-white">aaliyachoudhary24@outlook.com</a>
                            <p className="mt-4">New Delhi, India</p>
                        </div>
                        <div className="flex gap-4 ">
                            <Instagram size={20} />
                            <Mail size={20} />
                        </div>
                        <div className="flex gap-4 uppercase tracking-wider">

                            <a href="#">Privacy Policy</a>
                            <a href="#">Site Credit</a>
                        </div>
                    </div>
                </Section>

            </main>
        </div>
    );
}