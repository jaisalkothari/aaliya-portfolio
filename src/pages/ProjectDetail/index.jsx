import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

// Load all project images eagerly
const project1ImagesGlob = import.meta.glob('../../assets/project-images/project-1-*.{png,jpg,jpeg,svg}', { eager: true });
const project2ImagesGlob = import.meta.glob('../../assets/project-images/project-2-*.{png,jpg,jpeg,svg}', { eager: true });

const ProjectDetail = () => {
    const { projectId } = useParams();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);

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

    // Helper to get specific image for any project
    const getImage = (slide, image) => {
        let imagesGlob = null;

        if (projectId === 'heritage-haven') {
            imagesGlob = project1ImagesGlob;
        } else if (projectId === 'courtyard-villa') {
            imagesGlob = project2ImagesGlob;
        }

        if (!imagesGlob) return null;

        const key = Object.keys(imagesGlob).find(k => k.includes(`slide-${slide}-image-${image}.`));
        return key ? imagesGlob[key].default : null;
    };

    // Fallback for other projects
    const heroImage = (projectId === 'heritage-haven' || projectId === 'courtyard-villa')
        ? getImage(projectId === 'heritage-haven' ? 0 : 1, 1)
        : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop";

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
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <div className="absolute top-8 left-8 z-20">
                    <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:underline">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                </div>

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
            {projectId === 'heritage-haven' ? (
                // PROJECT 1: Heritage Haven Layout
                <div className="max-w-7xl mx-auto px-4 md:px-12 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                        {/* 1. Focal Images (Slide 1 Image 1 & 2) - Side by Side */}
                        <div className="md:col-span-6 aspect-[4/3] overflow-hidden">
                            <img src={getImage(1, 1) || heroImage} alt="Focal 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="md:col-span-6 aspect-[4/3] overflow-hidden">
                            <img src={getImage(1, 2) || heroImage} alt="Focal 2" className="w-full h-full object-cover" />
                        </div>

                        {/* 2. Context & Details (Slide 1 Image 4, 5, 3) */}
                        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-12">
                            {/* Text & Table */}
                            <div className="md:col-span-5 flex flex-col gap-8 sticky top-24">
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Context</h3>
                                    <div className="text-gray-800 leading-relaxed flex flex-col gap-1">
                                        <p>Site: Bilaspur, Himachal Pradesh</p>
                                        <p>Area: 19738 SQ.M.</p>
                                        <p>Organisation: Genesis Architects Pvt Ltd</p>
                                        <p>Status: Under construction</p>
                                        <p className="mt-4">Creating a halt space for highway vehicles, using the essence of Himachali Architecture by incorporating motifs and jaali patterns.</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Facility Areas</h3>
                                    <table className="w-full text-sm text-left">
                                        <thead>
                                            <tr className="border-b border-gray-300">
                                                <th className="py-2 font-bold text-gray-500">FACILITY</th>
                                                <th className="py-2 font-bold text-gray-500 text-right">AREA (SQM)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr><td className="py-2">TOTAL SITE AREA</td><td className="py-2 text-right">19777.8</td></tr>
                                            <tr><td className="py-2">FOOD COURT (KITCHEN + SEATING)</td><td className="py-2 text-right">1562.4</td></tr>
                                            <tr><td className="py-2">GAMING ZONE</td><td className="py-2 text-right">1300</td></tr>
                                            <tr><td className="py-2">ROOMS (12 ROOMS) 5x9</td><td className="py-2 text-right">45</td></tr>
                                            <tr><td className="py-2">AREA OF FRONT COURT</td><td className="py-2 text-right">1518.14</td></tr>
                                            <tr><td className="py-2">AREA OF KIDS PLAYZONE</td><td className="py-2 text-right">3430.93</td></tr>
                                        </tbody>
                                    </table>
                                    <div className="mt-4 text-sm font-bold text-gray-600">
                                        <p>NO OF KIOSKS: 20</p>
                                        <p>NO OF CAR PARKING: 121</p>
                                    </div>
                                </div>
                            </div>

                            {/* Images (Smaller 3/4 size) */}
                            <div className="md:col-span-7 flex flex-col gap-8 pl-12">
                                <div className="h-[35vh] overflow-hidden w-3/4 ml-auto"><img src={getImage(1, 4) || heroImage} alt="Site 1" className="w-full h-full object-cover" /></div>
                                <div className="h-[35vh] overflow-hidden w-3/4 ml-auto"><img src={getImage(1, 5) || heroImage} alt="Site 2" className="w-full h-full object-cover" /></div>
                                <div className="h-[35vh] overflow-hidden w-3/4 ml-auto"><img src={getImage(1, 3) || heroImage} alt="Site 3" className="w-full h-full object-cover" /></div>
                            </div>
                        </div>

                        {/* 3. Visual Flow (Slide 2 Image 1, 2, 3, 4) - 2x2 Grid */}
                        <div className="md:col-span-12 grid grid-cols-2 gap-4 mt-24 max-w-4xl mx-auto">
                            <div className="aspect-[4/3] overflow-hidden"><img src={getImage(2, 1) || heroImage} alt="Flow 1" className="w-full h-full object-cover" /></div>
                            <div className="aspect-[4/3] overflow-hidden"><img src={getImage(2, 2) || heroImage} alt="Flow 2" className="w-full h-full object-cover" /></div>
                            <div className="aspect-[4/3] overflow-hidden"><img src={getImage(2, 3) || heroImage} alt="Flow 3" className="w-full h-full object-cover" /></div>
                            <div className="aspect-[4/3] overflow-hidden"><img src={getImage(2, 4) || heroImage} alt="Flow 4" className="w-full h-full object-cover" /></div>
                        </div>

                        {/* 4. Concept Development (Slide 2 Image 5, 6, 8, 9) - Single Row */}
                        <div className="md:col-span-12 mt-24">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl mb-4">Concept Development</h2>
                                <p className="text-xl italic text-gray-600">Inspiration from Kath Kuni Architecture</p>
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                <div className="h-[25vh] overflow-hidden"><img src={getImage(2, 5) || heroImage} alt="Concept 1" className="w-full h-full object-cover" /></div>
                                <div className="h-[25vh] overflow-hidden"><img src={getImage(2, 6) || heroImage} alt="Concept 2" className="w-full h-full object-cover" /></div>
                                <div className="h-[25vh] overflow-hidden"><img src={getImage(2, 8) || heroImage} alt="Concept 3" className="w-full h-full object-cover" /></div>
                                <div className="h-[25vh] overflow-hidden"><img src={getImage(2, 9) || heroImage} alt="Concept 4" className="w-full h-full object-cover" /></div>
                            </div>
                        </div>

                        {/* 5. Materials */}
                        <div className="md:col-span-12 text-center py-12">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Material Palette</h3>
                            <div className="flex justify-center gap-12 text-xl font-light text-gray-600">
                                <span>Stone</span>
                                <span>Wood</span>
                                <span>Clay</span>
                            </div>
                        </div>

                        {/* 6. Conclusion - Floor Plans (5, 2, 3, 1) */}
                        <div className="md:col-span-12 mt-12">
                            <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[4/3] overflow-hidden border border-gray-200">
                                        <img src={getImage(3, 5) || heroImage} alt="Ground Floor" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-center">Ground Floor</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[4/3] overflow-hidden border border-gray-200">
                                        <img src={getImage(3, 2) || heroImage} alt="Mezanine 1" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-center">Mezanine 1</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[4/3] overflow-hidden border border-gray-200">
                                        <img src={getImage(3, 3) || heroImage} alt="Mezanine 2" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-center">Mezanine 2</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[4/3] overflow-hidden border border-gray-200">
                                        <img src={getImage(3, 1) || heroImage} alt="First Floor" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-center">First Floor</p>
                                </div>
                            </div>
                        </div>

                        {/* 7. Final Image & Text */}
                        <div className="md:col-span-12 mt-24 mb-12">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                                <div className="md:col-span-12 h-[60vh] overflow-hidden">
                                    <img src={getImage(3, 4) || heroImage} alt="Final View" className="w-full h-full object-cover" />
                                </div>

                                <div className="md:col-span-8 md:col-start-3 flex flex-col gap-6 text-center">
                                    <p className="text-lg font-light uppercase tracking-wide">
                                        EV charging points promoting environment friendly vehicles
                                    </p>
                                    <p className="text-lg font-light uppercase tracking-wide">
                                        KIDS PLAYZONE TO KEEP THE KIDS ENGAGED AND GIVE THEM A NEW LEARNING EXPERIENCE
                                    </p>
                                    <p className="text-lg font-light uppercase tracking-wide">
                                        KIOSKS TO GAIN ATTENTION OF THE VISITORS
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : projectId === 'courtyard-villa' ? (
                // PROJECT 2: Courtyard Villa Layout
                <div className="max-w-7xl mx-auto px-4 md:px-12 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                        {/* Site Info & Image */}
                        <div className="md:col-span-5 flex flex-col justify-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Site Information</h3>
                            <div className="text-gray-800 leading-relaxed flex flex-col gap-1 mb-4">
                                <p>Area: 4000 sq ft.</p>
                                <p>Organisation: Asian Paints</p>
                                <p>Project: Competition Entry</p>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Designing a residence for a multi generational family in an urban Indian setting. It aims to foster connection and privacy for all family members, while incorporating adaptive reuse principles to preserve and repurpose existing materials, spaces and structure. It centres around a courtyard as the heart of the design, promoting interaction, natural light and ventilation.
                            </p>
                        </div>

                        <div className="md:col-span-7 h-[60vh] overflow-hidden">
                            <img src={getImage(1, 2) || heroImage} alt="Site View" className="w-full h-full object-cover" />
                        </div>

                        {/* 2x2 Grid */}
                        <div className="md:col-span-12 grid grid-cols-2 gap-4 mt-12 max-w-5xl mx-auto">
                            <div className="aspect-[4/3] overflow-hidden"><img src={getImage(2, 1) || heroImage} alt="View 1" className="w-full h-full object-cover" /></div>
                            <div className="aspect-[4/3] overflow-hidden"><img src={getImage(2, 2) || heroImage} alt="View 2" className="w-full h-full object-cover" /></div>
                            <div className="aspect-[4/3] overflow-hidden"><img src={getImage(2, 3) || heroImage} alt="View 3" className="w-full h-full object-cover" /></div>
                            <div className="aspect-[4/3] overflow-hidden"><img src={getImage(2, 4) || heroImage} alt="View 4" className="w-full h-full object-cover" /></div>
                        </div>

                        {/* Materials */}
                        <div className="md:col-span-12 text-center py-12 mt-12">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Materials</h3>
                            <div className="flex justify-center flex-wrap gap-8 text-lg font-light text-gray-600">
                                <span>Bamboo</span>
                                <span>Ratan</span>
                                <span>Natural stone</span>
                                <span>Timber</span>
                                <span>Mosaic tiles</span>
                                <span>Upcycled fabric</span>
                            </div>
                        </div>

                        {/* Inspiration */}
                        <div className="md:col-span-12 mt-12">
                            <h2 className="text-3xl md:text-4xl mb-12 text-center">Inspiration</h2>
                            <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[3/4] overflow-hidden">
                                        <img src={getImage(2, 10) || heroImage} alt="Inspiration 1" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm font-light italic text-gray-600 text-center">Suman's leftover fabrics upcycled to make curtains</p>
                                </div>
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img src={getImage(2, 11) || heroImage} alt="Inspiration 2" className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img src={getImage(2, 12) || heroImage} alt="Inspiration 3" className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img src={getImage(2, 13) || heroImage} alt="Inspiration 4" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="text-center mt-8">
                                <p className="text-lg font-light text-gray-600">Use of Indian handicrafts and techniques for interior decoration</p>
                            </div>
                        </div>

                        {/* Center Image */}
                        <div className="md:col-span-12 mt-12">
                            <div className="aspect-[16/9] overflow-hidden flex items-center justify-center bg-gray-50">
                                <img src={getImage(3, 1) || heroImage} alt="Central View" className="w-full h-full object-contain" />
                            </div>
                        </div>

                        {/* Key Elements */}
                        <div className="md:col-span-12 mt-24">
                            <h2 className="text-3xl md:text-4xl mb-12 text-center">Key Elements</h2>

                            {/* Water Management */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
                                <div className="md:col-span-6 h-[60vh] overflow-hidden">
                                    <img src={getImage(3, 2) || heroImage} alt="Water Management" className="w-full h-full object-cover" />
                                </div>
                                <div className="md:col-span-6 flex flex-col justify-center">
                                    <h3 className="text-xl font-bold mb-4">Water Management</h3>
                                    <p className="text-lg italic mb-4 text-center">"Integrating traditional wisdom with modern sustainability"</p>

                                    <div className="space-y-4 text-sm text-gray-600">
                                        <div>
                                            <h4 className="font-bold mb-2">System Location & Design</h4>
                                            <ul className="list-disc list-inside space-y-1 ml-4">
                                                <li>Slanted courtyard deck roof enables natural water collection</li>
                                                <li>Gravity-fed pipe system along roof structure</li>
                                                <li>Storage tank currently positioned on right side of deck</li>
                                                <li>Tank location could be moved underground pending further structural info</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Proximity Benefits</h4>
                                            <ul className="list-disc list-inside space-y-1 ml-4">
                                                <li>Direct access to laundry facilities</li>
                                                <li>Connected to courtyard fountain system</li>
                                                <li>Supplies wall garden irrigation</li>
                                                <li>Services grass area maintenance</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">Collection Capacity</h4>
                                            <ul className="list-disc list-inside space-y-1 ml-4">
                                                <li>Current coverage: Courtyard deck roof</li>
                                                <li>Potential expansion: All connected roof areas</li>
                                                <li>Collection ratio: ~186 liters per 100 square feet of roof</li>
                                                <li>For 2,000 square feet coverage: ~4,540 liters per rain event</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other Key Elements in Grid */}
                            <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img src={getImage(3, 3) || heroImage} alt="Prayer Space" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm font-light text-gray-600 text-center">Prayer space for meena + storage</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img src={getImage(3, 4) || heroImage} alt="Swing" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm font-light text-gray-600 text-center">Swing from sustainable materials</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img src={getImage(3, 5) || heroImage} alt="Study" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm font-light text-gray-600 text-center">Refreshing and serene environment for the study</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img src={getImage(3, 6) || heroImage} alt="Meditation" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm font-light text-gray-600 text-center">Meditation zone in the back loggia</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                // Default fallback for other projects
                <div className="max-w-7xl mx-auto px-4 md:px-12 py-24">
                    <p className="text-center text-gray-500">Content coming soon...</p>
                </div>
            )}

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
