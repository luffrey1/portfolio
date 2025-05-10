"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { useTheme } from "@/components/ThemeProvider";
import { FaDownload } from "react-icons/fa";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(0, 238, 255, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {isMounted && (
        <div className="absolute inset-0 z-0">
          <Particles
            id="hero-particles"
            init={particlesInit}
            className="absolute inset-0"
            options={{
              fullScreen: {
                enable: false,
              },
              particles: {
                number: {
                  value: 60,
                  density: {
                    enable: true,
                    value_area: 900,
                  },
                },
                color: {
                  value: theme === "dark" 
                    ? ["#00EEFF", "#00FF88", "#1E90FF"] 
                    : ["#8c00ff", "#a64dff", "#bf80ff"],
                },
                shape: {
                  type: ["circle", "triangle"],
                },
                opacity: {
                  value: 0.6,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 4,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    size_min: 0.1,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: theme === "dark" ? "#00EEFF" : "#8c00ff",
                  opacity: 0.3,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "bubble",
                  },
                  onclick: {
                    enable: true,
                    mode: "push",
                  },
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 100,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3,
                  },
                  push: {
                    particles_nb: 4,
                  },
                },
              },
              retina_detect: true,
              background: {
                color: "transparent",
              },
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0"
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={titleVariants}
            >
              <span className="block">Hola, soy</span>
              <span className="text-accent-blue">Daniel Gheorghe</span>
            </motion.h1>

            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8"
              variants={subtitleVariants}
            >
              <span className="typing-animation">
                Desarrollador Web & Técnico SEO
              </span>
            </motion.h2>

            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-4"
              variants={buttonVariants}
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-accent-blue text-primary-dark font-medium rounded-2xl neobrutal dark:border-accent-blue"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                Contáctame
              </motion.a>
              
              <motion.a
                href="/images/Daniel_Gheorghe_Desarrollador_Web.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Daniel_Gheorghe_CV.pdf"
                className="px-6 py-3 border border-accent-blue text-accent-blue font-medium rounded-2xl hover:bg-accent-blue/10 transition-all flex items-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="mr-2" />
                Descargar CV
              </motion.a>
              
              <motion.a
                href="#projects"
                className="px-6 py-3 border border-accent-blue text-accent-blue font-medium rounded-2xl hover:bg-accent-blue/10 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                Ver Proyectos
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent-blue shadow-neon-blue animate-float flex items-center justify-center bg-glass-dark"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-6xl md:text-8xl font-bold text-accent-blue">
                DG
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center text-gray-400 hover:text-accent-blue transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <motion.div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <div className="w-1 h-2 bg-accent-blue rounded-full" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 