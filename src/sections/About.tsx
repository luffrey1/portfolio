"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaDownload } from "react-icons/fa";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-primary-dark">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Sobre <span className="text-accent-blue">Mí</span>
          </h2>
          <div className="w-24 h-1 bg-accent-blue mx-auto"></div>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 md:order-1"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-2xl font-bold mb-6 text-accent-blue"
              variants={itemVariants}
            >
              Daniel Gheorghe
            </motion.h3>
            
            <motion.p
              className="text-gray-300 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Soy un desarrollador web y técnico SEO con experiencia en prácticas profesionales. Me especializo en la creación de sitios web modernos, atractivos y optimizados para los motores de búsqueda. Mi objetivo es combinar diseño y funcionalidad para crear experiencias digitales excepcionales.
            </motion.p>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
              variants={itemVariants}
            >
              <div className="glassmorphism p-4 rounded-2xl">
                <h4 className="font-bold mb-2 text-accent-blue">Educación</h4>
                <p className="text-sm text-gray-300">
                  Grado Superior en Desarrollo de Aplicaciones Web
                </p>
              </div>
              
              <div className="glassmorphism p-4 rounded-2xl">
                <h4 className="font-bold mb-2 text-accent-blue">Experiencia</h4>
                <p className="text-sm text-gray-300">
                  Prácticas en Goldney como desarrollador web
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex space-x-4">
              <motion.a
                href="/images/Daniel_Gheorghe_Desarrollador_Web.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-accent-blue text-primary-dark font-medium rounded-2xl neobrutal dark:border-accent-blue hover:translate-y-[-2px] transition-all hover:shadow-lg hover:shadow-accent-blue/20"
                download="Daniel_Gheorghe_CV.pdf"
              >
                <FaDownload className="mr-2" />
                Descargar CV
              </motion.a>
              
              <motion.a
                href="#contact"
                className="inline-flex items-center px-6 py-3 border border-accent-blue text-accent-blue font-medium rounded-2xl hover:bg-accent-blue/10 hover:translate-y-[-2px] transition-all"
              >
                Contacto
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 border-4 border-accent-blue rounded-3xl transform rotate-6 shadow-neon-blue"></div>
              <div className="absolute inset-0 overflow-hidden rounded-3xl glassmorphism flex items-center justify-center">
                <div className="text-4xl text-accent-blue font-bold">DG</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 