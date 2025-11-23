import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import projectThumb1 from '../../assets/project_thumb_1.jpg';

const ProjectDetail = () => {
    const { projectId } = useParams();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper to format the ID into a readable title
    const formatTitle = (id) => {
        if (!id) return 'Project';
        return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const title = formatTitle(projectId);

    // Project List for Navigation
    const projects = [
        { id: 'heritage-haven', name: 'Heritage Haven' },
        { id: 'courtyard-villa', name: 'Courtyard Villa' },
        { id: 'gol-dak-khana-museum', name: 'Gol Dak Khana Museum' }
    ];

    const currentIndex = projects.findIndex(p => p.id === projectId);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white font-serif"
        >
            {/* --- HERO SECTION --- */}
            <div className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={projectThumb1}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Navigation */}
                <div className="absolute top-8 left-8 z-20">
                    <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:underline">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                </div>

                {/* Hero Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-8xl mb-4"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl font-sans font-light tracking-wide uppercase"
                    >
                        Interior Architecture & Design
                    </motion.p>
                </div>
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                    {/* Intro Text */}
                    <div className="md:col-span-8 md:col-start-3 text-center mb-12">
                        <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light">
                            A comprehensive exploration of space, light, and materiality. This project represents a fusion of modern aesthetics with functional design, creating an environment that is both visually striking and deeply livable.
                        </p>
                    </div>

                    {/* Full Width Image */}
                    <div className="md:col-span-12 h-[60vh] overflow-hidden">
                        <img src={projectThumb1} alt="Detail View" className="w-full h-full object-cover" />
                    </div>

                    {/* Project Specs Table */}
                    <div className="md:col-span-4 flex flex-col justify-center">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Project Specifications</h3>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <span className="font-bold text-gray-500">Location</span>
                            <span>Miami, FL</span>

                            <span className="font-bold text-gray-500">Year</span>
                            <span>2024</span>

                            <span className="font-bold text-gray-500">Area</span>
                            <span>4,500 sq ft</span>

                            <span className="font-bold text-gray-500">Role</span>
                            <span>Lead Designer</span>

                            <span className="font-bold text-gray-500">Status</span>
                            <span>Completed</span>
                        </div>
                    </div>

                    {/* Text Block */}
                    <div className="md:col-span-8 flex flex-col justify-center">
                        <h3 className="text-2xl mb-4 italic">Concept & Execution</h3>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            The design concept revolves around the idea of "fluid continuity," where spaces flow seamlessly into one another without rigid boundaries. By utilizing a palette of natural materials—stone, wood, and glass—we achieved a sense of organic warmth within a modern framework. The lighting design plays a crucial role, with custom fixtures that accentuate architectural details and create varying moods throughout the day. Every element, from the custom joinery to the furniture selection, was curated to enhance the overall narrative of the space.
                        </p>
                    </div>

                    {/* Two Column Images */}
                    <div className="md:col-span-6 h-[50vh] overflow-hidden">
                        <img src={projectThumb1} alt="Detail 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:col-span-6 h-[50vh] overflow-hidden">
                        <img src={projectThumb1} alt="Detail 2" className="w-full h-full object-cover" />
                    </div>

                    {/* Full Width Text */}
                    <div className="md:col-span-12 text-center py-12">
                        <h2 className="text-4xl md:text-5xl mb-6">"Design is not just what it looks like and feels like. Design is how it works."</h2>
                    </div>

                    {/* Large Vertical Image */}
                    <div className="md:col-span-5 h-[80vh] overflow-hidden">
                        <img src={projectThumb1} alt="Vertical Detail" className="w-full h-full object-cover" />
                    </div>

                    {/* Detailed Description & Materials */}
                    <div className="md:col-span-7 flex flex-col gap-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Material Palette</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                The material selection was driven by a desire for authenticity and tactile richness. We employed:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Travertine stone flooring for natural texture.</li>
                                <li>White Oak cabinetry with a matte finish.</li>
                                <li>Blackened steel accents for contrast.</li>
                                <li>Linen drapery to soften the light.</li>
                            </ul>
                        </div>
                        <div className="h-[40vh] overflow-hidden">
                            <img src={projectThumb1} alt="Material Detail" className="w-full h-full object-cover" />
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer / Next Project */}
            <div className="bg-gray-100 py-24 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Next Project</p>
                <Link to={`/project/${nextProject.id}`}>
                    <h2 className="text-4xl md:text-6xl cursor-pointer hover:italic transition-all inline-block">
                        {nextProject.name}
                    </h2>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
