"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaLaptopCode, FaCode } from "react-icons/fa";
import MiniParticles from "@/components/MiniParticles";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  color: string;
  icon: JSX.Element;
}

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(0); // Primer elemento expandido por defecto
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences: ExperienceItem[] = [
    {
      title: "Desarrollador Web en Prácticas",
      company: "Goldney",
      location: "Madrid, España",
      period: "2023",
      description: [
        "Desarrollo y mantenimiento de sitios web para clientes.",
        "Implementación de técnicas SEO para mejorar el posicionamiento.",
        "Optimización de rendimiento y accesibilidad en sitios web.",
        "Colaboración con equipos de diseño y marketing para proyectos integrales.",
      ],
      skills: ["HTML", "CSS", "JavaScript", "WordPress", "SEO", "PHP"],
      color: "from-accent-blue to-blue-500",
      icon: <FaLaptopCode className="w-6 h-6" />,
    },
    {
      title: "Proyectos Personales",
      company: "Freelance",
      location: "Remoto",
      period: "2022 - Presente",
      description: [
        "Desarrollo de sitios web personalizados.",
        "Implementación de estrategias SEO para mejorar la visibilidad online.",
        "Optimización de sitios web existentes.",
        "Creación de contenido digital optimizado para SEO.",
      ],
      skills: ["React", "Next.js", "Tailwind CSS", "SEO", "WordPress"],
      color: "from-accent-green to-green-500",
      icon: <FaCode className="w-6 h-6" />,
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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-primary-dark relative overflow-hidden">
      {/* Particles Background */}
      <MiniParticles variant="blue" className="opacity-70" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent-blue/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent-green/10 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent-blue/20 blur-2xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-accent-green/20 blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
            Mi Experiencia
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-blue to-accent-green mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Mi trayectoria profesional en <span className="text-accent-blue font-semibold">desarrollo web</span> y <span className="text-accent-green font-semibold">SEO</span>.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-blue via-accent-green to-accent-blue z-0">
            <motion.div 
              className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-30"
              animate={{ 
                top: ["0%", "100%", "0%"], 
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 8, 
                ease: "linear", 
                repeat: Infinity 
              }}
            />
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative mb-16 ${
                index % 2 === 0 ? "md:pr-8 md:text-right md:ml-auto md:mr-1/2" : "md:pl-8 md:ml-1/2"
              } md:w-1/2`}
            >
              {/* Timeline dot */}
              <motion.div 
                className={`absolute left-0 md:left-auto md:right-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r ${exp.color} shadow-lg z-10 transform -translate-y-1/2 md:translate-x-1/2 flex items-center justify-center`}
                variants={pulseVariants}
                animate="pulse"
              >
                {exp.icon}
              </motion.div>
              
              <motion.div
                className="glassmorphism rounded-3xl overflow-hidden border border-transparent hover:border-accent-blue/30"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 238, 255, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${exp.color} mr-3 text-white`}>
                        <FaBriefcase className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
                        {exp.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-glass-dark p-2 rounded-full"
                    >
                      <FaChevronDown className="text-accent-blue" />
                    </motion.div>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between text-sm text-gray-300 mb-2">
                    <div className="flex items-center mb-2 md:mb-0">
                      <span className="font-medium text-white">{exp.company}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-accent-blue" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-300">
                    <FaMapMarkerAlt className="mr-1 text-accent-green" />
                    <span>{exp.location}</span>
                  </div>

                  <AnimatePresence>
                    {expandedId === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="mt-6 pt-6 border-t border-gray-700"
                      >
                        <ul className="list-none text-gray-300 mb-6 space-y-3">
                          {exp.description.map((item, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start"
                            >
                              <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-2"></span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <motion.span
                              key={i}
                              className="px-3 py-1.5 bg-glass-dark text-xs rounded-full text-white border border-accent-blue/30"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + (i * 0.05) }}
                              whileHover={{ 
                                scale: 1.05, 
                                backgroundColor: "rgba(0, 238, 255, 0.1)" 
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 