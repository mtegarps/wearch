"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Circle,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

interface GalleryItem {
  url: string;
  title: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  image: string;
  category: string;
  gallery: GalleryItem[];
  area: string;
  duration: string;
  client: string;
  description: string;
}

export default function WearchLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  // Close modal on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (selectedProject !== null) {
        setSelectedProject(null);
        setCurrentImageIndex(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedProject]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const projects = [
    {
      id: 1,
      title: "Modern Villa",
      location: "Dago",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      category: "Residential",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
          title: "Grand Entrance",
          description:
            "A striking façade that welcomes you with clean lines and natural materials, seamlessly blending modern architecture with the surrounding landscape.",
        },
        {
          url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
          title: "Living Space",
          description:
            "An open-concept living area flooded with natural light through floor-to-ceiling windows, creating an airy atmosphere perfect for modern living.",
        },
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
          title: "Master Suite",
          description:
            "A serene private sanctuary featuring minimalist design, premium finishes, and panoramic views that bring the outdoors in.",
        },
        {
          url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop",
          title: "Outdoor Terrace",
          description:
            "Expansive outdoor living space with integrated landscaping, perfect for entertaining guests while enjoying breathtaking sunset views.",
        },
      ],
      area: "450 m²",
      duration: "8 Months",
      client: "Private Client",
      description:
        "A harmonious blend of contemporary design and functional elegance, creating spaces that inspire and endure. This modern villa features open-plan living spaces, floor-to-ceiling windows, and seamless indoor-outdoor integration.",
    },
    {
      id: 2,
      title: "Creative Hub",
      location: "Bandung",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      category: "Commercial",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
          title: "Tower Exterior",
          description:
            "A bold architectural statement featuring glass and steel construction that reflects the city's dynamic energy and progressive spirit.",
        },
        {
          url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
          title: "Collaboration Space",
          description:
            "Flexible work zones designed to foster creativity and teamwork, equipped with cutting-edge technology and adaptable furniture systems.",
        },
        {
          url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
          title: "Innovation Lab",
          description:
            "A state-of-the-art workspace where ideas come to life, featuring modular design elements that adapt to evolving business needs.",
        },
        {
          url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop",
          title: "Sky Lounge",
          description:
            "An elevated retreat offering panoramic city views, creating the perfect environment for informal meetings and creative thinking.",
        },
      ],
      area: "1200 m²",
      duration: "14 Months",
      client: "Tech Startup Inc",
      description:
        "An innovative workspace designed to foster creativity and collaboration. Features include flexible work zones, creative meeting spaces, and inspiring design elements throughout.",
    },
    {
      id: 3,
      title: "Eco House",
      location: "Lembang",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      category: "Residential",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
          title: "Sustainable Design",
          description:
            "Green architecture at its finest, integrating solar panels and natural ventilation systems while maintaining aesthetic excellence and comfort.",
        },
        {
          url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=800&fit=crop",
          title: "Natural Interior",
          description:
            "Organic materials and earthy tones create a warm, inviting atmosphere that connects residents with nature in every corner.",
        },
        {
          url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
          title: "Garden Integration",
          description:
            "Lush greenery surrounds the structure, creating a private oasis that promotes wellness and environmental consciousness.",
        },
        {
          url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop",
          title: "Evening Ambiance",
          description:
            "Energy-efficient lighting design creates a magical atmosphere after sunset, showcasing the home's architectural beauty sustainably.",
        },
      ],
      area: "320 m²",
      duration: "10 Months",
      client: "Green Living Co",
      description:
        "Sustainable architecture at its finest. This eco-friendly home integrates solar panels, rainwater harvesting, and natural ventilation systems while maintaining luxurious comfort.",
    },
    {
      id: 4,
      title: "Office Tower",
      location: "Bandung",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
      category: "Commercial",
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
          title: "Urban Landmark",
          description:
            "A towering presence in the city skyline, this structure combines cutting-edge engineering with timeless architectural principles.",
        },
        {
          url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&h=800&fit=crop",
          title: "Executive Floors",
          description:
            "Premium office spaces designed for leadership and decision-making, featuring sophisticated interiors and advanced building systems.",
        },
        {
          url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop",
          title: "Lobby Experience",
          description:
            "An impressive entrance that sets the tone for professional excellence, combining marble finishes with contemporary design elements.",
        },
        {
          url: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&h=800&fit=crop",
          title: "Night View",
          description:
            "Illuminated architecture transforms the tower into a beacon of innovation, showcasing its structural elegance against the night sky.",
        },
      ],
      area: "3500 m²",
      duration: "18 Months",
      client: "Corporate Group Ltd",
      description:
        "A landmark office tower featuring cutting-edge design and smart building technology. The structure combines efficiency with aesthetic excellence for modern business needs.",
    },
  ];

  return (
    <div
      className={`${isDark ? "bg-[#242222] text-white" : "bg-[#F5F5F5] text-[#242222]"} overflow-hidden relative transition-colors duration-500`}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <div className="w-full h-full bg-[#BBFF00] rounded-full" />
      </motion.div>

      {/* Subtle Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 4px)`,
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#BBFF00] origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div>
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 20 L35 80 L20 80 Z" fill="#c8ff00" />
                <path d="M42 20 L57 80 L42 80 Z" fill="#c8ff00" />
                <path d="M64 20 L79 80 L64 80 Z" fill="#c8ff00" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className="text-lg font-bold tracking-tight leading-none text-[#242222]"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 700,
                }}
              >
                Wearch Studio
              </span>
              <span
                className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mt-0.5"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 500,
                }}
              >
                est 2018
              </span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-12">
            {["Work", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-sm tracking-[0.1em] uppercase text-gray-600 hover:text-[#c8ff00] transition-colors"
              >
                {item}
              </motion.a>
            ))}

            {/* Desktop Theme Toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                isDark
                  ? "border-[#BBFF00] bg-[#BBFF00]/10 text-[#BBFF00]"
                  : "border-gray-300 bg-white text-gray-600 hover:border-[#c8ff00] hover:text-[#c8ff00]"
              }`}
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-30 flex items-center justify-center md:hidden ${
          isDark ? "bg-[#242222]" : "bg-[#F5F5F5]"
        }`}
      >
        <div className="space-y-8 text-center">
          {["Work", "About", "Contact"].map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20,
              }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setIsMenuOpen(false)}
              className="block text-4xl font-light tracking-tight"
            >
              {item}
            </motion.a>
          ))}

          {/* Mobile Theme Toggle */}
          <motion.button
            onClick={() => setIsDark(!isDark)}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              y: isMenuOpen ? 0 : 20,
            }}
            transition={{ delay: 0.3 }}
            className={`w-14 h-14 rounded-full border-2 mx-auto flex items-center justify-center ${
              isDark
                ? "border-[#BBFF00] bg-[#BBFF00]/10 text-[#BBFF00]"
                : "border-[#B8B8B8] bg-white text-[#242222]"
            }`}
          >
            {isDark ? <Moon size={24} /> : <Sun size={24} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12 pt-24">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute top-1/4 right-1/4 w-96 h-96 border-2 rounded-full ${
              isDark ? "border-[#B8B8B8]/10" : "border-[#B8B8B8]/20"
            }`}
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute bottom-1/4 left-1/4 w-[500px] h-[500px] border-2 ${
              isDark ? "border-[#B8B8B8]/10" : "border-[#B8B8B8]/20"
            }`}
          />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.p
              className={`text-xs md:text-sm tracking-[0.3em] uppercase mb-8 ${
                isDark ? "text-white/40" : "text-[#242222]/40"
              }`}
              animate={{ opacity: isDark ? [0.4, 0.6, 0.4] : [0.4, 0.6, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Architecture Studio · Bandung
            </motion.p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8 tracking-tight"
          >
            Creating spaces that
            <br />
            <motion.span
              className="inline-block italic font-extralight"
              whileHover={{
                skewX: -3,
                x: 10,
                transition: { duration: 0.3 },
              }}
            >
              inspire life
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-white/60" : "text-[#242222]/60"
            }`}
          >
            We transform ideas into architectural excellence through innovative
            design and meticulous attention to detail
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#BBFF00] text-[#242222] text-sm tracking-[0.1em] uppercase relative overflow-hidden font-semibold"
            >
              <motion.div
                className={`absolute inset-0 ${isDark ? "bg-white" : "bg-[#242222]"}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              <span
                className={`relative z-10 transition-colors ${
                  isDark
                    ? "group-hover:text-[#242222]"
                    : "group-hover:text-[#BBFF00]"
                }`}
              >
                View Projects
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`relative z-10 transition-colors ${
                  isDark
                    ? "group-hover:text-[#242222]"
                    : "group-hover:text-[#BBFF00]"
                }`}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className={`text-xs tracking-[0.2em] uppercase ${
              isDark ? "text-white/40" : "text-[#242222]/40"
            }`}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown
              size={20}
              className={isDark ? "text-white/40" : "text-[#242222]/40"}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section with Scale Animation */}
      <section
        id="work"
        className={`py-24 md:py-32 px-6 md:px-12 relative transition-colors duration-500 ${
          isDark ? "bg-[#242222]" : "bg-gradient-to-b from-[#F5F5F5] to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 md:mb-32"
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="h-px bg-[#BBFF00]"
              />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className={`text-xs tracking-[0.3em] uppercase ${
                  isDark ? "text-white/50" : "text-[#242222]/50"
                }`}
              >
                Portfolio
              </motion.span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              Selected Works
            </h2>
          </motion.div>

          <div className="space-y-40 md:space-y-48">
            {projects.map((project, idx) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={idx}
                onProjectClick={(id) => {
                  setSelectedProject(id);
                  setCurrentImageIndex(0);
                }}
              />
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-32"
          >
            <motion.a
              href="#"
              className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] uppercase"
              whileHover={{ gap: "24px" }}
            >
              <span>View All Projects</span>
              <motion.div
                className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "border-[#BBFF00] bg-[#BBFF00]/10"
                    : "border-[#BBFF00] bg-[#BBFF00]/20"
                }`}
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                  backgroundColor: isDark
                    ? "rgba(187, 255, 0, 0.2)"
                    : "rgba(187, 255, 0, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={16} className="text-[#BBFF00]" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <section
        id="about"
        className={`py-32 md:py-40 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-[#242222] text-white" : "bg-[#F5F5F5] text-[#242222]"
        }`}
      >
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Elegant Grid Pattern */}
          <motion.div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
          linear-gradient(${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px),
          linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px)
        `,
              backgroundSize: "100px 100px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "100px 100px"],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                isDark ? "rgba(187, 255, 0, 0.03)" : "rgba(187, 255, 0, 0.05)"
              } 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-[400px] h-[400px]"
            style={{
              background: `radial-gradient(circle, ${
                isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.03)"
              } 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          {/* Accent Lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-px h-32 ${
                isDark
                  ? "bg-gradient-to-b from-[#BBFF00]/20 to-transparent"
                  : "bg-gradient-to-b from-[#BBFF00]/30 to-transparent"
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header - Centered & Elegant */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 md:mb-32"
          >
            {/* Decorative Top Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "backOut" }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <motion.div
                className={`h-px w-20 ${isDark ? "bg-[#BBFF00]/40" : "bg-[#BBFF00]/60"}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative"
              >
                <div className="w-3 h-3 border-2 border-[#BBFF00] rotate-45" />
                <motion.div
                  className="absolute inset-0 w-3 h-3 border-2 border-[#BBFF00] rotate-45"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              <motion.div
                className={`h-px w-20 ${isDark ? "bg-[#BBFF00]/40" : "bg-[#BBFF00]/60"}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xs tracking-[0.3em] uppercase mb-6"
            >
              About Us
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-light tracking-tight mb-6"
            >
              Our Philosophy
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Architecture is the art of thoughtfully creating spaces that
              enhance human connection and inspire daily life
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-32">
            {/* Quote & Philosophy Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-10"
            >
              {/* Featured Quote */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={`absolute -left-4 top-0 w-1 h-full ${
                    isDark
                      ? "bg-gradient-to-b from-[#BBFF00] to-transparent"
                      : "bg-gradient-to-b from-[#BBFF00] to-transparent"
                  }`}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 1 }}
                  style={{ originY: 0 }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="pl-8"
                >
                  <p className="text-2xl md:text-3xl font-light leading-relaxed italic mb-6 opacity-90">
                    "Architecture is the thoughtful making of space"
                  </p>
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="h-px w-12 bg-[#BBFF00]/50"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    />
                    <p className="text-sm tracking-wide opacity-50">
                      Louis Kahn
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Philosophy Paragraphs */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-base leading-relaxed opacity-80">
                  We believe architecture transcends mere buildings—it's about
                  creating experiences that enhance human connection and inspire
                  daily life.
                </p>

                <p className="text-base leading-relaxed opacity-80">
                  Every project is a unique dialogue between space, light, and
                  purpose, crafted with precision and passion. We transform
                  visions into architectural poetry that stands the test of
                  time.
                </p>
              </motion.div>

              {/* Core Values - Elegant Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="pt-8"
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-[#BBFF00]/50 to-transparent mb-8"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.8 }}
                  style={{ originX: 0 }}
                />

                <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">
                  Core Values
                </p>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Innovation", icon: "◆" },
                    { label: "Sustainability", icon: "◆" },
                    { label: "Excellence", icon: "◆" },
                    { label: "Integrity", icon: "◆" },
                  ].map((value, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.1 + idx * 0.1 }}
                      whileHover={{ x: 8, scale: 1.05 }}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <motion.span
                        className="text-[#BBFF00] text-xs"
                        whileHover={{ rotate: 45, scale: 1.3 }}
                        transition={{ duration: 0.3 }}
                      >
                        {value.icon}
                      </motion.span>
                      <span className="text-sm tracking-wide opacity-60 group-hover:opacity-100 transition-opacity">
                        {value.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Stats - Refined Design */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-16"
            >
              {[
                {
                  label: "Projects Completed",
                  value: "150+",
                  desc: "Across residential & commercial sectors",
                  metric: "Since 2018",
                },
                {
                  label: "Years Experience",
                  value: "12",
                  desc: "Of architectural excellence and innovation",
                  metric: "And counting",
                },
                {
                  label: "Awards Won",
                  value: "28",
                  desc: "National & international recognitions",
                  metric: "Industry honors",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.15, duration: 0.8 }}
                  whileHover={{ x: 10 }}
                  className="group cursor-pointer relative"
                >
                  {/* Background Effect */}
                  <motion.div
                    className={`absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isDark ? "bg-white/5" : "bg-black/5"
                    }`}
                    initial={{ x: -20, scaleX: 0 }}
                    whileHover={{ x: 0, scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ originX: 0 }}
                  />

                  <div className="p-6">
                    {/* Value */}
                    <div className="flex items-baseline gap-6 mb-4">
                      <motion.p
                        className="text-6xl md:text-7xl font-extralight tracking-tight"
                        whileHover={{ scale: 1.05, color: "#BBFF00" }}
                        transition={{ duration: 0.3 }}
                      >
                        {stat.value}
                      </motion.p>
                      <motion.div
                        className="flex-1 h-px bg-gradient-to-r from-[#BBFF00]/30 to-transparent group-hover:from-[#BBFF00] transition-all duration-500"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + idx * 0.15, duration: 0.6 }}
                        style={{ originX: 0 }}
                      />
                    </div>

                    {/* Label */}
                    <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3 group-hover:opacity-70 transition-opacity">
                      {stat.label}
                    </p>

                    {/* Description */}
                    <p className="text-sm leading-relaxed opacity-60 mb-2 group-hover:opacity-80 transition-opacity">
                      {stat.desc}
                    </p>

                    {/* Metric Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + idx * 0.15 }}
                      className="inline-flex items-center gap-2 mt-4"
                    >
                      <div className="w-1 h-1 bg-[#BBFF00] rounded-full" />
                      <span className="text-xs opacity-40">{stat.metric}</span>
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00]/30 transition-colors duration-500"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + idx * 0.15, type: "spring" }}
                    style={{ originX: 1, originY: 0 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Team Section - Minimalist & Elegant */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`pt-20 border-t ${isDark ? "border-white/10" : "border-black/10"}`}
          >
            {/* Team Header */}
            <div className="text-center mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div
                  className={`h-px w-12 ${isDark ? "bg-[#BBFF00]/40" : "bg-[#BBFF00]/60"}`}
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-[#BBFF00] rounded-full"
                />
                <div
                  className={`h-px w-12 ${isDark ? "bg-[#BBFF00]/40" : "bg-[#BBFF00]/60"}`}
                />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-light tracking-tight mb-4"
              >
                Meet Our Team
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-sm tracking-wide"
              >
                Passionate architects dedicated to excellence
              </motion.p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {[
                {
                  name: "Taufiq Ibrahim",
                  role: "Lead Architect",
                  image: "https://i.ibb.co/S75HHXPg/taufiq.jpg",
                  specialty: "Conceptual Design",
                },
                {
                  name: "Azmi Azzami",
                  role: "Design Director",
                  image: "https://i.ibb.co/67RYqQfk/azmi.jpg",
                  specialty: "Urban Planning",
                },
                {
                  name: "Alfiadi Rakhman",
                  role: "Project Manager",
                  image: "https://i.ibb.co/Y4dq0226/alfiadi.jpg",
                  specialty: "Execution & Quality",
                },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3, duration: 0.8 }}
                  className="group cursor-pointer"
                >
                  {/* Photo Container */}
                  <motion.div
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative aspect-[3/4] mb-6 overflow-hidden"
                  >
                    {/* Image */}
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isDark
                          ? "from-black/80 via-black/20 to-transparent"
                          : "from-black/70 via-black/10 to-transparent"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Specialty Badge - Appears on Hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-6 left-6 right-6"
                    >
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2">
                        <p className="text-xs tracking-[0.15em] uppercase text-white/60">
                          Specialty
                        </p>
                        <p className="text-sm text-white font-light">
                          {member.specialty}
                        </p>
                      </div>
                    </motion.div>

                    {/* Corner Frame */}
                    <motion.div
                      className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00] transition-all duration-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.5, type: "spring" }}
                      style={{ originX: 0, originY: 0 }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00] transition-all duration-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.6, type: "spring" }}
                      style={{ originX: 1, originY: 1 }}
                    />

                    {/* Bottom Accent Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#BBFF00]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ originX: 0 }}
                    />
                  </motion.div>

                  {/* Name & Role */}
                  <motion.div
                    className="space-y-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-xl md:text-2xl font-light leading-tight group-hover:opacity-90 transition-opacity">
                      {member.name}
                    </h4>

                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-8 h-px bg-[#BBFF00]/50 group-hover:w-12 group-hover:bg-[#BBFF00] transition-all duration-500"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.7, duration: 0.6 }}
                        style={{ originX: 0 }}
                      />
                      <p className="text-xs tracking-[0.15em] uppercase opacity-40 group-hover:opacity-70 transition-opacity">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* View Full Team Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center mt-20"
            >
              <motion.a
                href="#"
                className="group inline-flex flex-col items-center gap-4"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className={`w-14 h-14 border-2 ${
                    isDark ? "border-[#BBFF00]/30" : "border-[#BBFF00]/50"
                  } group-hover:border-[#BBFF00] flex items-center justify-center transition-all duration-500`}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ArrowRight size={18} className="text-[#BBFF00] rotate-90" />
                </motion.div>
                <span className="text-xs tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                  View Full Team
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section
        className={`py-32 md:py-40 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-[#242222] text-white" : "bg-white text-[#242222]"
        }`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Orbs */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
            style={{
              background:
                "radial-gradient(circle, #BBFF00 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24 md:mb-32"
          >
            {/* Decorative Top Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "backOut" }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <motion.div
                className={`h-px w-16 ${isDark ? "bg-[#BBFF00]/50" : "bg-[#BBFF00]/70"}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-2 h-2 bg-[#BBFF00]"
              />
              <motion.div
                className={`h-px w-16 ${isDark ? "bg-[#BBFF00]/50" : "bg-[#BBFF00]/70"}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xs tracking-[0.3em] uppercase mb-6"
            >
              What We Do
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-light tracking-tight mb-6"
            >
              Our Expertise
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Comprehensive architectural solutions tailored to bring your
              vision to life
            </motion.p>
          </motion.div>

          {/* Services Grid - New Design */}
          <div className="grid md:grid-cols-3 gap-1 md:gap-2 mb-20">
            {[
              {
                title: "Architecture",
                desc: "Innovative spatial design solutions that blend form and function seamlessly, creating timeless structures that inspire.",
                services: [
                  "Residential Design",
                  "Commercial Spaces",
                  "Urban Planning",
                  "Conceptual Design",
                ],
                icon: "▲",
              },
              {
                title: "Interior Design",
                desc: "Curated interior experiences that reflect your vision and lifestyle, transforming spaces into personal sanctuaries.",
                services: [
                  "Space Planning",
                  "Furniture Design",
                  "Material Selection",
                  "Lighting Design",
                ],
                icon: "●",
              },
              {
                title: "Consulting",
                desc: "Strategic project guidance from concept to completion, ensuring excellence at every stage of development.",
                services: [
                  "Project Management",
                  "Feasibility Studies",
                  "Technical Advisory",
                  "Quality Assurance",
                ],
                icon: "■",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                  className={`h-full p-10 md:p-12 relative overflow-hidden transition-all duration-500 ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#BBFF00]/50"
                      : "bg-[#F5F5F5] hover:bg-white border border-black/5 hover:border-[#BBFF00]/70"
                  }`}
                >
                  {/* Hover Gradient Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${
                        isDark
                          ? "rgba(187, 255, 0, 0.05)"
                          : "rgba(187, 255, 0, 0.08)"
                      }, transparent 70%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-8"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3, type: "spring" }}
                    >
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 border-2 transition-all duration-500 ${
                          isDark
                            ? "border-[#BBFF00]/30 group-hover:border-[#BBFF00] group-hover:bg-[#BBFF00]/10"
                            : "border-[#BBFF00]/50 group-hover:border-[#BBFF00] group-hover:bg-[#BBFF00]/20"
                        }`}
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-2xl text-[#BBFF00]">
                          {service.icon}
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-2xl md:text-3xl font-light tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.4 }}
                    >
                      {service.title}
                    </motion.h3>

                    {/* Decorative Line */}
                    <motion.div
                      className="h-px bg-[#BBFF00]/30 mb-6 group-hover:bg-[#BBFF00] transition-all duration-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.5, duration: 0.8 }}
                      style={{ originX: 0 }}
                    />

                    {/* Description */}
                    <motion.p
                      className="text-sm leading-relaxed mb-8 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.7 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.6 }}
                    >
                      {service.desc}
                    </motion.p>

                    {/* Services List */}
                    <div className="space-y-3">
                      {service.services.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.15 + 0.7 + i * 0.1 }}
                          className="flex items-center gap-3 group/item"
                        >
                          <motion.div
                            className="w-1 h-1 bg-[#BBFF00] group-hover/item:w-6 transition-all duration-300"
                            whileHover={{ scale: 2 }}
                          />
                          <span className="text-xs tracking-[0.05em] uppercase opacity-50 group-hover/item:opacity-80 group-hover/item:translate-x-2 transition-all duration-300">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.2, rotate: -45 }}
                    >
                      <div
                        className={`w-10 h-10 border-2 flex items-center justify-center ${
                          isDark ? "border-[#BBFF00]" : "border-[#BBFF00]"
                        }`}
                      >
                        <ArrowRight size={16} className="text-[#BBFF00]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Corner Decorations */}
                  <motion.div
                    className={`absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                      isDark ? "border-[#BBFF00]" : "border-[#BBFF00]"
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.8 }}
                    style={{ originX: 1, originY: 0 }}
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                      isDark ? "border-[#BBFF00]" : "border-[#BBFF00]"
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.9 }}
                    style={{ originX: 0, originY: 1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            {/* Decorative Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className={`h-px mx-auto mb-16 ${
                isDark
                  ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  : "bg-gradient-to-r from-transparent via-black/10 to-transparent"
              }`}
              style={{ width: "60%" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-sm mb-8 tracking-wide"
            >
              Need a custom solution tailored to your unique vision?
            </motion.p>

            <motion.a
              href="#contact"
              className={`group inline-flex items-center gap-4 px-10 py-5 border-2 border-[#BBFF00] text-sm tracking-[0.15em] uppercase relative overflow-hidden ${
                isDark ? "text-white" : "text-[#242222]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hover Background */}
              <motion.div
                className="absolute inset-0 bg-[#BBFF00]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />

              <span
                className={`relative z-10 transition-colors ${
                  isDark
                    ? "group-hover:text-[#242222]"
                    : "group-hover:text-[#242222]"
                }`}
              >
                Discuss Your Project
              </span>

              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight
                  size={18}
                  className={`transition-colors ${
                    isDark
                      ? "group-hover:text-[#242222]"
                      : "group-hover:text-[#242222]"
                  }`}
                />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className={`relative overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-[#242222]" : "bg-white"
        }`}
      >
        {/* Massive Animated Background */}
        <div className="absolute inset-0">
          {/* Large Gradient Orbs */}
          <motion.div
            className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] ${
              isDark ? "bg-[#BBFF00]/10" : "bg-[#BBFF00]/20"
            }`}
            animate={{
              scale: [1, 1.4, 1],
              x: [0, -100, 0],
              y: [0, 100, 0],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] ${
              isDark ? "bg-white/5" : "bg-[#B8B8B8]/20"
            }`}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [0, -180, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Floating Grid Pattern */}
          <motion.div
            className={`absolute inset-0 opacity-[0.03] ${isDark ? "" : ""}`}
            style={{
              backgroundImage: `
                linear-gradient(${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px),
                linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "80px 80px"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating Geometric Shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 ${
                i % 3 === 0 ? "rounded-full" : i % 3 === 1 ? "" : "rotate-45"
              } ${isDark ? "bg-[#BBFF00]/20" : "bg-[#BBFF00]/30"}`}
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + ((i * 13) % 60)}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, i % 2 ? 30 : -30, 0],
                rotate: [0, 360, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          {/* Hero Title Section */}
          <motion.div
            className="text-center mb-20 md:mb-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Decorative Element */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "backOut" }}
            >
              <motion.div
                className={`h-px w-20 ${isDark ? "bg-gradient-to-r from-transparent to-[#BBFF00]" : "bg-gradient-to-r from-transparent to-[#BBFF00]"}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full ${isDark ? "bg-[#BBFF00]" : "bg-[#BBFF00]"}`}
                  animate={{
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(187, 255, 0, 0)",
                      "0 0 0 10px rgba(187, 255, 0, 0.2)",
                      "0 0 0 0 rgba(187, 255, 0, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>

              <motion.div
                className={`h-px w-20 ${isDark ? "bg-gradient-to-l from-transparent to-[#BBFF00]" : "bg-gradient-to-l from-transparent to-[#BBFF00]"}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-7xl md:text-9xl font-light tracking-tight leading-none mb-4">
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.05, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Let's
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.05, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Create
                </motion.span>
              </h2>

              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.span
                  className="text-7xl md:text-9xl italic font-extralight tracking-tight"
                  whileHover={{
                    skewX: -8,
                    scale: 1.08,
                    color: isDark ? "#BBFF00" : "#BBFF00",
                    textShadow: "0 0 30px rgba(187, 255, 0, 0.3)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  Together
                </motion.span>

                {/* Dynamic Underline */}
                <motion.div
                  className="absolute -bottom-4 left-0 right-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${
                      isDark
                        ? "from-[#BBFF00]/0 via-[#BBFF00] to-[#BBFF00]/0"
                        : "from-[#BBFF00]/0 via-[#BBFF00] to-[#BBFF00]/0"
                    }`}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ backgroundSize: "200% 100%" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mt-12 ${
                isDark ? "text-white/70" : "text-[#242222]/70"
              }`}
            >
              Ready to transform your vision into architectural excellence?
              Let's start a conversation.
            </motion.p>
          </motion.div>

          {/* Contact Cards - Centered Showcase */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  label: "Email",
                  value: "hello@wearch.id",
                  href: "mailto:hello@wearch.id",
                  icon: "✉",
                },
                {
                  label: "Phone",
                  value: "+62 812 3456 7890",
                  href: "tel:+6281234567890",
                  icon: "✆",
                },
                {
                  label: "Office",
                  value: "Bandung, Indonesia",
                  href: "#",
                  icon: "⌘",
                },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.6 }}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    boxShadow: isDark
                      ? "0 20px 40px rgba(187, 255, 0, 0.1)"
                      : "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                  className={`group relative p-8 border-2 transition-all duration-500 ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:border-[#BBFF00] hover:bg-white/10"
                      : "bg-[#F5F5F5] border-black/5 hover:border-[#BBFF00] hover:bg-white"
                  }`}
                >
                  {/* Corner Decorations */}
                  <motion.div
                    className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${
                      isDark
                        ? "border-[#BBFF00]/0 group-hover:border-[#BBFF00]"
                        : "border-[#BBFF00]/0 group-hover:border-[#BBFF00]"
                    } transition-colors`}
                  />
                  <motion.div
                    className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${
                      isDark
                        ? "border-[#BBFF00]/0 group-hover:border-[#BBFF00]"
                        : "border-[#BBFF00]/0 group-hover:border-[#BBFF00]"
                    } transition-colors`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 border-2 flex items-center justify-center text-3xl transition-all ${
                      isDark
                        ? "border-[#BBFF00]/30 text-[#BBFF00] group-hover:bg-[#BBFF00] group-hover:text-[#242222] group-hover:border-[#BBFF00]"
                        : "border-[#BBFF00]/50 text-[#BBFF00] group-hover:bg-[#BBFF00] group-hover:text-[#242222] group-hover:border-[#BBFF00]"
                    }`}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Text */}
                  <div className="text-center">
                    <p
                      className={`text-xs tracking-[0.2em] uppercase mb-3 ${
                        isDark ? "text-white/40" : "text-[#242222]/40"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`text-lg md:text-xl font-light ${
                        isDark ? "text-white" : "text-[#242222]"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1, rotate: -45 }}
                  >
                    <ArrowRight size={20} className="text-[#BBFF00]" />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.p
              className={`text-base md:text-lg leading-relaxed mb-10 ${
                isDark ? "text-white/60" : "text-[#242222]/60"
              }`}
            >
              Whether it's a residential dream home, a commercial space, or an
              urban development—
              <br className="hidden md:block" />
              we're here to bring your vision to life with innovative design and
              precision.
            </motion.p>

            <motion.a
              href="mailto:hello@wearch.id"
              className="group inline-block relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-8 bg-[#BBFF00]/30 blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Button */}
              <div className="relative px-16 py-6 bg-[#BBFF00] text-[#242222] text-base tracking-[0.15em] uppercase overflow-hidden font-bold flex items-center gap-4">
                <motion.div
                  className={`absolute inset-0 ${isDark ? "bg-white" : "bg-[#242222]"}`}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <span
                  className={`relative z-10 transition-colors ${
                    isDark
                      ? "group-hover:text-[#242222]"
                      : "group-hover:text-[#BBFF00]"
                  }`}
                >
                  Start Your Project
                </span>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight
                    size={20}
                    className={`transition-colors ${
                      isDark
                        ? "group-hover:text-[#242222]"
                        : "group-hover:text-[#BBFF00]"
                    }`}
                  />
                </motion.div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={() => {
            setSelectedProject(null);
            setCurrentImageIndex(0);
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          {/* Close Button - Fixed Position */}
          <motion.button
            onClick={() => {
              setSelectedProject(null);
              setCurrentImageIndex(0);
            }}
            className="fixed top-6 right-6 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20"
            whileHover={{
              scale: 1.1,
              rotate: 90,
              backgroundColor: "rgba(187, 255, 0, 0.2)",
              borderColor: "#BBFF00",
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <X size={24} />
          </motion.button>

          {/* Navigation Info - Fixed Position */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed top-6 left-6 z-[110] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 border border-white/20">
              <p className="text-xs tracking-[0.2em] uppercase opacity-60 mb-1">
                Viewing
              </p>
              <p className="text-sm font-light">
                {projects.find((p) => p.id === selectedProject)?.title}
              </p>
            </div>
          </motion.div>

          {/* Image Counter - Fixed Position */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed bottom-6 left-6 z-[110] bg-white/10 backdrop-blur-md text-white px-6 py-3 text-sm border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[#BBFF00] font-light text-lg">
              {String(currentImageIndex + 1).padStart(2, "0")}
            </span>
            <span className="opacity-40 mx-2">/</span>
            <span className="opacity-60">
              {String(
                projects.find((p) => p.id === selectedProject)?.gallery
                  .length || 0
              ).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Scroll Container - Horizontal Smooth Scroll */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              delay: 0.1,
            }}
            className="relative w-full h-full flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              onScroll={(e) => {
                const container = e.currentTarget;
                const scrollLeft = container.scrollLeft;
                const itemWidth = container.clientWidth;
                const newIndex = Math.round(scrollLeft / itemWidth);
                if (newIndex !== currentImageIndex) {
                  setCurrentImageIndex(newIndex);
                }
              }}
            >
              <div className="flex h-full">
                {projects
                  .find((p) => p.id === selectedProject)
                  ?.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-8 md:p-16"
                    >
                      <div className="max-w-7xl w-full h-full flex flex-col md:flex-row gap-8 items-center">
                        {/* Image Container */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                          className="relative w-full md:w-2/3 h-[50vh] md:h-[70vh] flex items-center justify-center group"
                          whileHover={{ scale: 1.02 }}
                        >
                          {/* Image Shadow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent blur-2xl scale-95" />

                          <img
                            src={item.url}
                            alt={item.title}
                            className="relative w-full h-full object-contain drop-shadow-2xl"
                          />

                          {/* Corner Decorations */}
                          <motion.div
                            className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00]/50 transition-all duration-500"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          />
                          <motion.div
                            className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00]/50 transition-all duration-500"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          />
                        </motion.div>

                        {/* Description Panel */}
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="w-full md:w-1/3 h-auto space-y-6 text-white"
                        >
                          {/* Decorative Line */}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-px bg-gradient-to-r from-[#BBFF00] to-transparent"
                            style={{ originX: 0 }}
                          />

                          {/* Title */}
                          <div>
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 0.5, y: 0 }}
                              transition={{ delay: 0.6 }}
                              className="text-xs tracking-[0.3em] uppercase mb-3 text-[#BBFF00]"
                            >
                              {String(idx + 1).padStart(2, "0")} — Featured View
                            </motion.p>
                            <motion.h3
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7 }}
                              className="text-2xl md:text-3xl font-light tracking-tight leading-tight mb-4"
                            >
                              {item.title}
                            </motion.h3>
                          </div>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.8, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-sm md:text-base leading-relaxed text-white/80"
                          >
                            {item.description}
                          </motion.p>

                          {/* Decorative Elements */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex items-center gap-4 pt-4"
                          >
                            <motion.div
                              className="w-12 h-px bg-white/30"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 1, duration: 0.6 }}
                              style={{ originX: 0 }}
                            />
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="w-1.5 h-1.5 bg-[#BBFF00] rounded-full"
                            />
                          </motion.div>

                          {/* Navigation Hint */}
                          {idx <
                            (projects.find((p) => p.id === selectedProject)
                              ?.gallery.length || 0) -
                              1 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.1 }}
                              className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-white/40 pt-6"
                            >
                              <span>Scroll for more</span>
                              <motion.div
                                animate={{ x: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <ArrowRight size={14} />
                              </motion.div>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Navigation Arrows - Only show on desktop */}
            <div className="hidden md:block">
              {currentImageIndex > 0 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    const container =
                      document.querySelector(".overflow-x-auto");
                    if (container) {
                      container.scrollBy({
                        left: -container.clientWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="fixed left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 hover:border-[#BBFF00] z-[105]"
                  whileHover={{
                    scale: 1.1,
                    x: -5,
                    backgroundColor: "rgba(187, 255, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <ChevronDown size={24} className="rotate-90" />
                </motion.button>
              )}
              {currentImageIndex <
                (projects.find((p) => p.id === selectedProject)?.gallery
                  .length || 0) -
                  1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    const container =
                      document.querySelector(".overflow-x-auto");
                    if (container) {
                      container.scrollBy({
                        left: container.clientWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="fixed right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 hover:border-[#BBFF00] z-[105]"
                  whileHover={{
                    scale: 1.1,
                    x: 5,
                    backgroundColor: "rgba(187, 255, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <ChevronDown size={24} className="-rotate-90" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-6 right-6 z-[110] flex gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {projects
              .find((p) => p.id === selectedProject)
              ?.gallery.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    const container =
                      document.querySelector(".overflow-x-auto");
                    if (container) {
                      container.scrollTo({
                        left: container.clientWidth * idx,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-1 transition-all ${
                    currentImageIndex === idx
                      ? "w-12 bg-[#BBFF00]"
                      : "w-8 bg-white/30 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer
        className={`py-16 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-[#242222] text-white" : "bg-[#B8B8B8] text-[#242222]"
        }`}
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Section */}
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <motion.div
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.05 }}
                style={{ originX: 0 }}
              >
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 20 L35 80 L20 80 Z" fill="#c8ff00" />
                    <path d="M42 20 L57 80 L42 80 Z" fill="#c8ff00" />
                    <path d="M64 20 L79 80 L64 80 Z" fill="#c8ff00" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-lg font-bold tracking-tight leading-none"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    Wearch Studio
                  </span>
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase text-white/40 mt-0.5"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    est 2018
                  </span>
                </div>
              </motion.div>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                Creating architectural excellence in Bandung and beyond.
                Transforming visions into timeless spaces.
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className={`h-px mt-8 ${isDark ? "bg-[#BBFF00]/30" : "bg-[#242222]/30"}`}
              />
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h4 className="text-xs tracking-[0.2em] uppercase mb-6 opacity-50">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {["Work", "About", "Services", "Contact"].map((link, idx) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-white/60 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h4 className="text-xs tracking-[0.2em] uppercase mb-6 opacity-50">
                Get In Touch
              </h4>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="mailto:hello@wearch.id"
                    className="text-sm text-white/60 hover:text-white transition-colors block"
                  >
                    hello@wearch.id
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="tel:+6281234567890"
                    className="text-sm text-white/60 hover:text-white transition-colors block"
                  >
                    +62 812 3456 7890
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <span className="text-sm text-white/60 block">
                    Bandung, Indonesia
                  </span>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"
          />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center md:justify-start gap-6 text-xs text-white/40"
            >
              <motion.span
                whileHover={{ opacity: 1 }}
                className="tracking-[0.15em] uppercase"
              >
                © 2024 Wearch
              </motion.span>
              <span className="opacity-30">•</span>
              <motion.a
                href="#"
                className="tracking-[0.15em] uppercase hover:text-white/70 transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <span className="opacity-30">•</span>
              <motion.a
                href="#"
                className="tracking-[0.15em] uppercase hover:text-white/70 transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              {["IG", "LI", "BE"].map((social, idx) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-white/20 hover:border-white/40 flex items-center justify-center text-xs tracking-wider hover:bg-white hover:text-black transition-all"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  {social}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-center mt-16"
          >
            <motion.a
              href="#home"
              className={`inline-flex flex-col items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors group ${
                isDark
                  ? "text-white/40 hover:text-[#BBFF00]"
                  : "text-[#242222]/40 hover:text-[#BBFF00]"
              }`}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className={`w-12 h-12 border-2 transition-colors flex items-center justify-center ${
                  isDark
                    ? "border-[#BBFF00]/30 group-hover:border-[#BBFF00]"
                    : "border-[#242222]/30 group-hover:border-[#BBFF00]"
                }`}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div animate={{ rotate: 180 }} className="rotate-180">
                  <ChevronDown size={16} />
                </motion.div>
              </motion.div>
              <span>Back to Top</span>
            </motion.a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

function ProjectItem({
  project,
  index,
  onProjectClick,
}: {
  project: Project;
  index: number;
  onProjectClick: (id: number) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1, 0.9]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3]
  );
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`grid md:grid-cols-12 gap-8 md:gap-16 items-center ${index % 2 === 1 ? "md:direction-rtl" : ""}`}
      >
        {/* Text Content */}
        <motion.div
          className={`md:col-span-5 space-y-6 ${index % 2 === 1 ? "md:col-start-8 md:direction-ltr" : ""}`}
          style={{ y }}
        >
          {/* Category Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block"
          >
            <motion.span
              className="inline-block px-4 py-2 border border-black/10 text-xs tracking-[0.2em] uppercase"
              whileHover={{
                borderColor: "rgba(0,0,0,0.3)",
                scale: 1.05,
              }}
            >
              Architecture
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.h3
              className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-4"
              animate={isHovered ? { x: 10 } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {project.title}
            </motion.h3>

            {/* Location & Year */}
            <div className="flex items-center gap-4 text-sm opacity-50">
              <span className="tracking-[0.1em] uppercase">
                {project.location}
              </span>
              <span className="w-1 h-1 bg-black rounded-full" />
              <span className="tracking-[0.1em]">{project.year}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 0.6, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm leading-relaxed max-w-md"
          >
            A harmonious blend of contemporary design and functional elegance,
            creating spaces that inspire and endure.
          </motion.p>

          {/* Animated Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: isHovered ? "100px" : "60px" } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-px bg-black"
          />

          {/* View Project Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.button
              onClick={() => onProjectClick(project.id)}
              className="group/btn inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase cursor-pointer"
              whileHover={{ x: 10 }}
            >
              <span className="opacity-60 group-hover/btn:opacity-100 transition-opacity">
                View Project
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={14} />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-8 pt-4"
          >
            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-1">
                Area
              </p>
              <p className="text-sm font-light">450 m²</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-1">
                Duration
              </p>
              <p className="text-sm font-light">8 Months</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          ref={imageRef}
          className={`md:col-span-7 relative ${index % 2 === 1 ? "md:col-start-1 md:row-start-1 md:direction-ltr" : ""}`}
          style={{ scale, opacity, rotate }}
        >
          {/* Image Container with Layered Effect */}
          <div className="relative">
            {/* Shadow Layer */}
            <motion.div
              className="absolute inset-0 bg-black/5 blur-2xl"
              animate={
                isHovered
                  ? { scale: 1.05, opacity: 0.3 }
                  : { scale: 1, opacity: 0.1 }
              }
              transition={{ duration: 0.6 }}
            />

            {/* Main Image Container */}
            <motion.div
              className="relative aspect-[4/3] overflow-hidden bg-black/5 cursor-pointer"
              onClick={() => onProjectClick(project.id)}
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <motion.div
                className="w-full h-full"
                style={{ scale: imageScale }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Hover Info Overlay */}
              <motion.div
                className="absolute inset-0 flex items-end justify-end p-8"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="flex items-center gap-3 text-white cursor-pointer"
                  onClick={() => onProjectClick(project.id)}
                  initial={{ y: 20 }}
                  animate={isHovered ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-sm tracking-[0.1em] uppercase">
                    Explore
                  </span>
                  <motion.div
                    className="w-10 h-10 border border-white rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Corner Accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isHovered
                    ? { opacity: 0.3, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.4 }}
                style={{ originX: 1, originY: 0 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isHovered
                    ? { opacity: 0.3, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ originX: 0, originY: 1 }}
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 border border-black/5"
              animate={
                isHovered
                  ? {
                      scale: 1.1,
                      rotate: 45,
                    }
                  : {
                      scale: 1,
                      rotate: 0,
                    }
              }
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Separator Line */}
      <motion.div
        className="absolute -bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.2 }}
      />
    </motion.div>
  );
}
