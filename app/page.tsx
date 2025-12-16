"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import { ArrowRight, Menu, X, Circle, ChevronDown } from 'lucide-react';

export default function WearchLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    { 
      id: 1, 
      title: "Modern Villa", 
      location: "Dago", 
      year: "2024",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop"
    },
    { 
      id: 2, 
      title: "Creative Hub", 
      location: "Bandung", 
      year: "2023",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop"
    },
    { 
      id: 3, 
      title: "Eco House", 
      location: "Lembang", 
      year: "2024",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop"
    },
    { 
      id: 4, 
      title: "Office Tower", 
      location: "Bandung", 
      year: "2023",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"
    }
  ];

  interface Project {
    id: number;
    title: string;
    location: string;
    year: string;
    image: string;
  }

  return (
    <div className="bg-white text-black overflow-hidden relative">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* Subtle Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)`
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-black origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl md:text-2xl font-light tracking-[0.15em]"
          >
            WEARCH
          </motion.div>
          
          <div className="hidden md:flex items-center gap-12">
            {['Work', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-sm tracking-[0.1em] uppercase opacity-60 hover:opacity-100 transition-opacity"
              >
                {item}
              </motion.a>
            ))}
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
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-white z-30 flex items-center justify-center md:hidden"
      >
        <div className="space-y-8 text-center">
          {['Work', 'About', 'Contact'].map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20
              }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setIsMenuOpen(false)}
              className="block text-4xl font-light tracking-tight"
            >
              {item}
            </motion.a>
          ))}
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
              ease: "linear"
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 border-2 border-black/10 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] border-2 border-black/10"
          />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.p 
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-8 opacity-40"
              animate={{ opacity: [0.4, 0.6, 0.4] }}
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
                transition: { duration: 0.3 }
              }}
            >
              inspire life
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-base md:text-lg opacity-60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We transform ideas into architectural excellence through innovative design and meticulous attention to detail
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
              className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm tracking-[0.1em] uppercase relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              <span className="relative z-10 group-hover:text-black transition-colors">
                View Projects
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10 group-hover:text-black"
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
          <span className="text-xs tracking-[0.2em] uppercase opacity-40">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} className="opacity-40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section with Scale Animation */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-12 relative">
        {/* Floating Numbers Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute text-[20vw] font-light opacity-[0.02]"
              style={{
                top: `${i * 25}%`,
                left: `${i % 2 === 0 ? '10%' : '60%'}`
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.02, 0.04, 0.02]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              0{i + 1}
            </motion.div>
          ))}
        </div>

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
                className="h-px bg-black"
              />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.4, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xs tracking-[0.3em] uppercase"
              >
                Portfolio
              </motion.span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              Works
            </h2>
          </motion.div>

          <div className="space-y-40 md:space-y-48">
            {projects.map((project, idx) => (
              <ProjectItem key={project.id} project={project} index={idx} />
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
              whileHover={{ gap: '24px' }}
            >
              <span>View All Projects</span>
              <motion.div
                className="w-12 h-12 border border-black rounded-full flex items-center justify-center"
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <section id="about" className="py-32 md:py-40 px-6 md:px-12 bg-black text-white relative overflow-hidden">
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                            linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Circles */}
        <motion.div
          className="absolute top-20 right-20 w-[400px] h-[400px] border border-white/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-[300px] h-[300px] border border-white/5 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="h-px bg-white/30"
              />
              <span className="text-xs tracking-[0.3em] uppercase opacity-50">About Us</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              Our Philosophy
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-32">
            {/* Philosophy Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative pl-6 border-l-2 border-white/20"
                >
                  <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed italic mb-4">
                    "Architecture is the thoughtful making of space"
                  </p>
                  <p className="text-sm text-white/50 tracking-wide">— Louis Kahn</p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.7, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-base leading-relaxed"
                >
                  We believe architecture is more than buildings—it's about creating experiences that enhance human connection and inspire daily life.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.7, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-base leading-relaxed"
                >
                  Every project is a unique dialogue between space, light, and purpose, crafted with precision and passion. We transform visions into architectural poetry.
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="h-px bg-white/30 mt-8"
                />

                {/* Values */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 gap-6 pt-6"
                >
                  {[
                    { label: "Innovation", icon: "◆" },
                    { label: "Sustainability", icon: "◆" },
                    { label: "Excellence", icon: "◆" },
                    { label: "Integrity", icon: "◆" }
                  ].map((value, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-white/30 text-xs">{value.icon}</span>
                      <span className="text-sm tracking-wide text-white/60">{value.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="space-y-12">
              {[
                { label: "Projects Completed", value: "150+", desc: "Across residential & commercial sectors" },
                { label: "Years Experience", value: "12", desc: "Of architectural excellence and innovation" },
                { label: "Awards Won", value: "28", desc: "National & international recognitions" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3, duration: 0.8 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-baseline gap-6 mb-3">
                    <motion.p 
                      className="text-5xl md:text-6xl font-light"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "50px" }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.5, duration: 0.6 }}
                      className="h-px bg-white/30 group-hover:bg-white/60 group-hover:w-20 transition-all mb-4"
                    />
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase opacity-50 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-t border-white/10 pt-16"
          >
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">Meet Our Team</h3>
              <p className="text-white/50 text-sm">Passionate architects dedicated to excellence</p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { name: "Alfiano Ronaldo", role: "Lead Architect" },
                { name: "Bruno Martin Indi Ricardo Izecsson dos Santos Leite", role: "Design Director" },
                { name: "Opik Bonny", role: "Project Manager" },
                { name: "Smes Kamboja", role: "Senior Architect" }
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  {/* Avatar Placeholder */}
                  <motion.div
                    className="aspect-square bg-white/5 mb-4 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Initial Circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="text-2xl font-light text-white/60">
                          {member.name.charAt(0)}
                        </span>
                      </motion.div>
                    </div>

                    {/* Hover Line Animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ originX: 0 }}
                    />
                  </motion.div>

                  {/* Name & Role */}
                  <motion.h4 
                    className="text-base md:text-lg font-light mb-2 leading-tight group-hover:text-white/90 transition-colors"
                    style={{ 
                      wordBreak: idx === 1 ? 'break-word' : 'normal',
                      hyphens: idx === 1 ? 'auto' : 'none'
                    }}
                  >
                    {member.name}
                  </motion.h4>
                  <p className="text-xs tracking-[0.15em] uppercase text-white/40 group-hover:text-white/60 transition-colors">
                    {member.role}
                  </p>

                  {/* Decorative Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "30px" }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.5, duration: 0.6 }}
                    className="h-px bg-white/20 mt-4 group-hover:w-full group-hover:bg-white/40 transition-all"
                  />
                </motion.div>
              ))}
            </div>

            {/* View Full Team Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <motion.a
                href="#"
                className="group inline-flex items-center gap-4 text-sm tracking-[0.1em] uppercase border-b border-white/20 pb-2 hover:border-white/60 transition-colors"
                whileHover={{ gap: '20px' }}
              >
                <span className="text-white/60 group-hover:text-white transition-colors">View Full Team</span>
                <motion.div
                  className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center group-hover:border-white/60 transition-colors"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                >
                  <ArrowRight size={12} />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden">
        {/* Background Text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-light opacity-[0.02] whitespace-nowrap pointer-events-none"
          animate={{
            x: ['-50%', '-45%', '-50%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          SERVICES
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="h-px bg-black"
              />
              <span className="text-xs tracking-[0.3em] uppercase opacity-40">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              Our Services
            </h2>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              { 
                num: "01", 
                title: "Architecture", 
                desc: "Innovative spatial design solutions that blend form and function seamlessly",
                services: ["Residential Design", "Commercial Spaces", "Urban Planning"]
              },
              { 
                num: "02", 
                title: "Interior Design", 
                desc: "Curated interior experiences that reflect your vision and lifestyle",
                services: ["Space Planning", "Furniture Design", "Material Selection"]
              },
              { 
                num: "03", 
                title: "Consulting", 
                desc: "Strategic project guidance from concept to completion",
                services: ["Project Management", "Feasibility Studies", "Technical Advisory"]
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group cursor-pointer"
              >
                {/* Card Container */}
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  {/* Number */}
                  <motion.div
                    className="relative mb-8"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.p 
                      className="text-7xl md:text-8xl font-light opacity-5 group-hover:opacity-20 transition-opacity"
                    >
                      {service.num}
                    </motion.p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "60px" }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3, duration: 0.8 }}
                      className="h-px bg-black absolute bottom-0 left-0 group-hover:w-20 transition-all"
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:translate-x-2 transition-transform">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-80 transition-opacity">
                      {service.desc}
                    </p>

                    {/* Sub-services List */}
                    <ul className="space-y-2 pt-4">
                      {service.services.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.15 + i * 0.1 + 0.4 }}
                          className="flex items-center gap-3 text-xs tracking-[0.1em] uppercase opacity-40 group-hover:opacity-70 transition-opacity"
                        >
                          <motion.div 
                            className="w-1 h-1 bg-black"
                            whileHover={{ scale: 2 }}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase pt-4 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <span>Learn More</span>
                      <ArrowRight size={12} />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-24 pt-16 border-t border-black/5"
          >
            <p className="text-sm opacity-60 mb-6">Need a custom solution?</p>
            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-4 px-8 py-4 border border-black text-sm tracking-[0.1em] uppercase hover:bg-black hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Discuss Your Project</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Decorative Elements */}
        <motion.div
          className="absolute top-40 right-20 w-[500px] h-[500px] bg-black/[0.02] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1 }}
              className="inline-block mb-8"
            >
              <Circle size={60} strokeWidth={0.5} />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
              Let's Create
              <br />
              <span className="italic font-extralight">Together</span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Ready to transform your vision into reality? Let's start a conversation about your next project.
            </motion.p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { 
                label: "Email",
                value: "hello@wearch.id",
                href: "mailto:hello@wearch.id",
                icon: "✉"
              },
              { 
                label: "Phone",
                value: "+62 812 3456 7890",
                href: "tel:+6281234567890",
                icon: "✆"
              },
              { 
                label: "Office",
                value: "Bandung, Indonesia",
                href: "#",
                icon: "⌘"
              }
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.4, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white border border-black/5 p-8 hover:border-black/20 transition-colors"
              >
                {/* Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ originY: 1 }}
                />

                <div className="relative z-10">
                  <motion.p 
                    className="text-3xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {item.icon}
                  </motion.p>
                  <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3 group-hover:text-white/60 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-lg font-light group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <ArrowRight size={20} className="text-white" />
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <motion.a
              href="mailto:hello@wearch.id"
              className="group inline-block relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -inset-4 bg-black/5 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative px-12 py-6 bg-black text-white text-sm tracking-[0.15em] uppercase overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 group-hover:text-black transition-colors">
                  Start Your Project
                </span>
              </div>
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-xs tracking-[0.2em] uppercase mt-8"
            >
              Based in Bandung, Serving Indonesia
            </motion.p>
          </motion.div>

          {/* Social Links (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-8 mt-16 pt-16 border-t border-black/5"
          >
            {['Instagram', 'LinkedIn', 'Behance'].map((social, idx) => (
              <motion.a
                key={social}
                href="#"
                className="text-xs tracking-[0.15em] uppercase opacity-40 hover:opacity-100 transition-opacity"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.4, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + idx * 0.1 }}
              >
                {social}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-12 bg-black text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
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
              <motion.h3 
                className="text-3xl md:text-4xl font-light tracking-[0.15em] mb-6"
                whileHover={{ scale: 1.05 }}
                style={{ originX: 0 }}
              >
                WEARCH
              </motion.h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                Creating architectural excellence in Bandung and beyond. 
                Transforming visions into timeless spaces.
              </p>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-px bg-white/20 mt-8"
              />
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h4 className="text-xs tracking-[0.2em] uppercase mb-6 opacity-50">Quick Links</h4>
              <ul className="space-y-3">
                {['Work', 'About', 'Services', 'Contact'].map((link, idx) => (
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
              <h4 className="text-xs tracking-[0.2em] uppercase mb-6 opacity-50">Get In Touch</h4>
              <ul className="space-y-3">
                <motion.li
                  whileHover={{ x: 5 }}
                >
                  <a href="mailto:hello@wearch.id" className="text-sm text-white/60 hover:text-white transition-colors block">
                    hello@wearch.id
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                >
                  <a href="tel:+6281234567890" className="text-sm text-white/60 hover:text-white transition-colors block">
                    +62 812 3456 7890
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                >
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
              {['IG', 'LI', 'BE'].map((social, idx) => (
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
              className="inline-flex flex-col items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors group"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-12 h-12 border border-white/20 group-hover:border-white/40 transition-colors flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 180 }}
                  className="rotate-180"
                >
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

function ProjectItem({ project, index }: { project: { id: number; title: string; location: string; year: string; image: string }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1, 0.9]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
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
      {/* Project Number - Large Background */}
      <motion.div
        className="absolute -top-20 left-0 text-[15vw] md:text-[12vw] font-light opacity-[0.03] pointer-events-none"
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 0.03 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        0{index + 1}
      </motion.div>

      <div className={`grid md:grid-cols-12 gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}>
        {/* Text Content */}
        <motion.div
          className={`md:col-span-5 space-y-6 ${index % 2 === 1 ? 'md:col-start-8 md:direction-ltr' : ''}`}
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
                borderColor: 'rgba(0,0,0,0.3)',
                scale: 1.05
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
              <span className="tracking-[0.1em] uppercase">{project.location}</span>
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
            A harmonious blend of contemporary design and functional elegance, creating spaces that inspire and endure.
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
            <motion.a
              href="#"
              className="group/btn inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase"
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
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-8 pt-4"
          >
            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-1">Area</p>
              <p className="text-sm font-light">450 m²</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-1">Duration</p>
              <p className="text-sm font-light">8 Months</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          ref={imageRef}
          className={`md:col-span-7 relative ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1 md:direction-ltr' : ''}`}
          style={{ scale, opacity, rotate }}
        >
          {/* Image Container with Layered Effect */}
          <div className="relative">
            {/* Shadow Layer */}
            <motion.div
              className="absolute inset-0 bg-black/5 blur-2xl"
              animate={isHovered ? { scale: 1.05, opacity: 0.3 } : { scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Main Image Container */}
            <motion.div 
              className="relative aspect-[4/3] overflow-hidden bg-black/5"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
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
                  className="flex items-center gap-3 text-white"
                  initial={{ y: 20 }}
                  animate={isHovered ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-sm tracking-[0.1em] uppercase">Explore</span>
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
                animate={isHovered ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 1, originY: 0 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={isHovered ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ originX: 0, originY: 1 }}
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 border border-black/5"
              animate={isHovered ? { 
                scale: 1.1,
                rotate: 45 
              } : { 
                scale: 1,
                rotate: 0 
              }}
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