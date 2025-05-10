"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaUniversity, FaFlask } from "react-icons/fa";
import MiniParticles from "@/components/MiniParticles";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

export default function Education() {
  const [expandedId, setExpandedId] = useState<number | null>(0);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const educationItems: EducationItem[] = [
    {
      degree: "Grado Superior en Desarrollo de Aplicaciones Web",
      institution: "IES ENRIQUE TIERNO GALVAN",
      location: "Madrid, España",
      period: "2023 - 2025",
      description: "Formación especializada en desarrollo web, incluyendo programación frontend y backend, bases de datos, y metodologías ágiles.",
      icon: <FaUniversity />,
      color: "from-accent-blue to-blue-500",
    },
    {
      degree: "Bachillerato Científico",
      institution: "IES MADRID SUR",
      location: "Madrid, España",
      period: "2020 - 2023",
      description: "Formación académica con enfoque en matemáticas, física y tecnología, desarrollando habilidades analíticas y de resolución de problemas.",
      icon: <FaFlask />,
      color: "from-accent-green to-green-500",
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <section id="education" className="py-20 bg-primary-dark relative overflow-hidden">
      {/* Particles Background */}
      <MiniParticles variant="green" className="opacity-60" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-36 h-36 rounded-full bg-accent-green/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-44 h-44 rounded-full bg-accent-blue/10 blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-28 h-28 rounded-full bg-accent-green/20 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-accent-blue/20 blur-2xl animate-pulse" style={{ animationDelay: "1.2s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
            Educación
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-blue to-accent-green mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Mi formación académica y <span className="text-accent-green font-semibold">desarrollo profesional</span>.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-12 last:mb-0"
            >
              <motion.div
                className="glassmorphism rounded-3xl p-6 border border-transparent hover:border-accent-green/30"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 255, 136, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center mb-3 md:mb-0">
                    <div className="p-3 bg-gradient-to-r from-accent-blue to-accent-green rounded-full mr-4 text-white">
                      <FaGraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
                      {item.degree}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <FaCalendarAlt className="mr-1 text-accent-green" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="ml-16 md:ml-[4.25rem]">
                  <div className="flex items-center text-sm text-gray-300 mb-4">
                    <span className="font-medium text-white mr-2">{item.institution}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-accent-blue" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="glassmorphism rounded-3xl p-8 border border-transparent hover:border-accent-green/30">
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-green to-accent-blue">Idiomas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="p-4 bg-glass-dark rounded-2xl hover:bg-glass-light transition-colors duration-300 border border-transparent hover:border-accent-blue/30"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <motion.div 
                      className="inline-block w-8 h-6 bg-red-600 mr-3 rounded"
                      variants={floatVariants}
                      animate="animate"
                    ></motion.div>
                    <span className="font-medium text-xl text-white">Español</span>
                  </div>
                  <span className="text-accent-green font-bold">Nativo</span>
                </div>
                <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-accent-green to-accent-blue rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  ></motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 bg-glass-dark rounded-2xl hover:bg-glass-light transition-colors duration-300 border border-transparent hover:border-accent-blue/30"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <motion.div 
                      className="inline-block w-8 h-6 bg-blue-900 mr-3 rounded"
                      variants={floatVariants}
                      animate="animate"
                    ></motion.div>
                    <span className="font-medium text-xl text-white">Inglés</span>
                  </div>
                  <span className="text-accent-green font-bold">Intermedio</span>
                </div>
                <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-accent-green to-accent-blue rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  ></motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 bg-glass-dark rounded-2xl hover:bg-glass-light transition-colors duration-300 border border-transparent hover:border-accent-blue/30"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <motion.div 
                      className="inline-block w-8 h-6 bg-yellow-400 mr-3 rounded"
                      variants={floatVariants}
                      animate="animate"
                    ></motion.div>
                    <span className="font-medium text-xl text-white">Rumano</span>
                  </div>
                  <span className="text-accent-green font-bold">Nativo</span>
                </div>
                <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-accent-green to-accent-blue rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="glassmorphism rounded-3xl p-8 border border-transparent hover:border-accent-green/30">
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-green to-accent-blue">Certificaciones y Habilidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "WordPress", desc: "Gestión avanzada de contenidos" },
                { name: "Rank Math SEO", desc: "Optimización para motores de búsqueda" },
                { name: "WP All Import", desc: "Importación y gestión de datos" },
                { name: "HTML/CSS/JS", desc: "Desarrollo frontend" }
              ].map((cert, i) => (
                <motion.div 
                  key={i}
                  className="p-5 bg-glass-dark rounded-xl flex flex-col items-center justify-center text-center hover:bg-glass-light transition-all duration-300 border border-transparent hover:border-accent-blue/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 238, 255, 0.1)" }}
                >
                  <span className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-blue mb-2">{cert.name}</span>
                  <span className="text-sm text-gray-300">{cert.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 