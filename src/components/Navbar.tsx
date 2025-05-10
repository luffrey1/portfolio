"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { RiRocketLine } from "react-icons/ri";
import MiniParticles from "./MiniParticles";

const navLinks = [
  { href: "#home", label: "Inicio", icon: "🏠" },
  { href: "#about", label: "Sobre Mí", icon: "👨‍💻" },
  { href: "#skills", label: "Habilidades", icon: "🛠️" },
  { href: "#projects", label: "Proyectos", icon: "🚀" },
  { href: "#experience", label: "Experiencia", icon: "📈" },
  { href: "#education", label: "Educación", icon: "🎓" },
  { href: "#contact", label: "Contacto", icon: "📬" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const navRef = useRef<HTMLElement | null>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Valores para efectos parallax
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const navbarBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const springNavbarScale = useSpring(navbarScale, { stiffness: 100, damping: 20 });
  
  // Motion values para el efecto de resplandor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Estado para la animación orbital
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportCenter, setViewportCenter] = useState(0);

  // Calcular dimensiones de la ventana
  useEffect(() => {
    const updateViewportDimensions = () => {
      setViewportHeight(window.innerHeight);
      setViewportCenter(window.innerHeight / 2);
    };
    
    updateViewportDimensions();
    window.addEventListener('resize', updateViewportDimensions);
    
    return () => {
      window.removeEventListener('resize', updateViewportDimensions);
    };
  }, []);

  // Deshabilitar el scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Detectar sección activa
      const sections = document.querySelectorAll("section[id]");
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = "#" + section.getAttribute("id");
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Efecto de animación orbital continua
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const orbitAnimation = setInterval(() => {
      setOrbitAngle(prev => (prev + 0.2) % 360);
    }, 50);
    
    return () => clearInterval(orbitAnimation);
  }, [isMenuOpen]);

  // Calcular posiciones orbitales para los elementos de navegación
  const getOrbitPosition = (index: number, total: number) => {
    const radius = 150;
    const angleOffset = orbitAngle;
    const angle = (index / total) * Math.PI * 2 + angleOffset * (Math.PI / 180);
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      scale: activeLink === navLinks[index].href ? 1.2 : 1,
      rotate: angle * (180 / Math.PI)
    };
  };

  // Variantes para animaciones del menú
  const menuButtonVariants = {
    closed: {
      scale: 1,
      rotate: 0,
      backgroundColor: "rgba(93, 93, 255, 0.1)"
    },
    open: {
      scale: 1.2,
      rotate: 45,
      backgroundColor: "rgba(93, 93, 255, 0.3)"
    }
  };
  
  const menuBackgroundVariants = {
    closed: {
      scale: 0,
      opacity: 0
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Manejar clic en enlaces del menú
  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    
    // Scroll suave a la sección
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <motion.header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        opacity: navbarOpacity,
        scale: springNavbarScale,
      }}
    >
      {/* Fondo de partículas */}
      <div className="absolute inset-0 overflow-hidden">
        <MiniParticles 
          className="opacity-30" 
          count={20} 
          colors={["#5D5DFF", "#4040B2", "#7878FF"]} 
          speed={0.3}
        />
      </div>
      
      {/* Barra principal */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-20 backdrop-blur-lg"
        style={{
          background: isScrolled 
            ? "linear-gradient(to right, rgba(20, 20, 30, 0.7), rgba(30, 30, 50, 0.8), rgba(20, 20, 30, 0.7))" 
            : "transparent",
          boxShadow: isScrolled ? "0 10px 30px -10px rgba(0, 0, 255, 0.2)" : "none",
        }}
      />
      
      {/* Línea decorativa luminosa */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(to right, rgba(93, 93, 255, 0), rgba(93, 93, 255, 0.8), rgba(93, 93, 255, 0))",
          boxShadow: "0 0 10px rgba(93, 93, 255, 0.8)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between relative z-10">
        {/* Logo animado */}
        <Link href="#home">
          <motion.div
            className="text-xl md:text-2xl font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="mr-2 text-accent-blue"
              animate={{ 
                rotate: [0, 360],
                filter: ["drop-shadow(0 0 5px rgba(93, 93, 255, 0.5))", "drop-shadow(0 0 15px rgba(93, 93, 255, 0.8))", "drop-shadow(0 0 5px rgba(93, 93, 255, 0.5))"]
              }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                filter: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <RiRocketLine size={28} />
            </motion.div>
            <motion.div 
              className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-white to-accent-blue bg-size-200"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <span className="font-bold">DG</span>
            </motion.div>
          </motion.div>
        </Link>

        {/* Botón de menú orbital innovador */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-12 h-12 rounded-full flex items-center justify-center z-20 border border-accent-blue/30"
            variants={menuButtonVariants}
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            transition={{ duration: 0.5, type: "spring" }}
            aria-label="Toggle orbital menu"
          >
            {/* Efecto de resplandor del botón */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isMenuOpen 
                  ? ["0 0 10px rgba(93, 93, 255, 0.5)", "0 0 20px rgba(93, 93, 255, 0.8)", "0 0 10px rgba(93, 93, 255, 0.5)"]
                  : ["0 0 5px rgba(93, 93, 255, 0.3)", "0 0 10px rgba(93, 93, 255, 0.5)", "0 0 5px rgba(93, 93, 255, 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Líneas del botón */}
            <div className="relative w-6 h-6">
              <motion.span
                className="absolute top-0 left-0 right-0 h-0.5 bg-accent-blue rounded-full"
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute top-[10px] left-0 right-0 h-0.5 bg-accent-blue rounded-full"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue rounded-full"
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Menú orbital innovador */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Fondo del menú orbital */}
            <motion.div
              className="fixed inset-0 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{
                background: "radial-gradient(circle at center, rgba(20, 20, 30, 0.7) 0%, rgba(10, 10, 20, 0.9) 100%)",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            />
            
            {/* Contenedor orbital */}
            <motion.div
              ref={orbitRef}
              className="fixed w-full flex items-center justify-center z-50 pointer-events-none"
              variants={menuBackgroundVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                top: 0,
                left: 0,
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Centro del orbital */}
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-blue/30 to-blue-600/30 flex items-center justify-center pointer-events-auto"
                animate={{
                  boxShadow: ["0 0 20px rgba(93, 93, 255, 0.3)", "0 0 40px rgba(93, 93, 255, 0.5)", "0 0 20px rgba(93, 93, 255, 0.3)"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="text-2xl font-bold text-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  DG
                </motion.div>
              </motion.div>
              
              {/* Línea orbital */}
              <motion.div
                className="absolute w-[300px] h-[300px] rounded-full border border-accent-blue/20"
                animate={{
                  rotate: 360,
                  boxShadow: ["0 0 10px rgba(93, 93, 255, 0.1)", "0 0 20px rgba(93, 93, 255, 0.2)", "0 0 10px rgba(93, 93, 255, 0.1)"]
                }}
                transition={{ 
                  rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* Elementos de navegación orbitales */}
              {navLinks.map((link, index) => {
                const position = getOrbitPosition(index, navLinks.length);
                
                return (
                  <motion.div
                    key={link.href}
                    className="absolute pointer-events-auto"
                    animate={{
                      x: position.x,
                      y: position.y,
                      scale: hoverIndex === index || activeLink === link.href ? 1.2 : 1,
                      zIndex: hoverIndex === index || activeLink === link.href ? 2 : 1
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onHoverStart={() => setHoverIndex(index)}
                    onHoverEnd={() => setHoverIndex(null)}
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-full flex flex-col items-center justify-center cursor-pointer ${
                        activeLink === link.href ? "bg-accent-blue/40" : "bg-accent-blue/20"
                      }`}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(93, 93, 255, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLinkClick(link.href)}
                      animate={{
                        boxShadow: activeLink === link.href
                          ? ["0 0 10px rgba(93, 93, 255, 0.5)", "0 0 20px rgba(93, 93, 255, 0.8)", "0 0 10px rgba(93, 93, 255, 0.5)"]
                          : ["0 0 5px rgba(93, 93, 255, 0.2)", "0 0 10px rgba(93, 93, 255, 0.4)", "0 0 5px rgba(93, 93, 255, 0.2)"]
                      }}
                      transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                    >
                      <span className="text-lg mb-1">{link.icon}</span>
                      <motion.span 
                        className="text-xs text-white font-medium opacity-0 absolute -bottom-6"
                        animate={{ opacity: hoverIndex === index ? 1 : 0 }}
                      >
                        {link.label}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 