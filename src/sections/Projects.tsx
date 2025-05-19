"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { 
  FaGithub, 
  FaGlobe, 
  FaCode, 
  FaServer, 
  FaUsers, 
  FaDesktop, 
  FaTerminal,
  FaDatabase
} from "react-icons/fa";
import { 
  SiPhp, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiWordpress,
  SiUbuntu,
  SiDocker
} from "react-icons/si";
import MiniParticles from "@/components/MiniParticles";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
  };
  featured: boolean;
  category: string;
  icons: JSX.Element[];
  color: string;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: "ldap-tfg",
      title: "Sistema de Gestión LDAP",
      description: "Aplicación desarrollada para el centro educativo que permite la gestión de usuarios LDAP en Ubuntu, monitorización de equipos, ejecución de comandos masivos y organización de alumnos. Proyecto final para el Grado Superior en Desarrollo de Aplicaciones Web.",
      image: "/portfolio/images/projects/LDAP.webp",
      technologies: ["PHP", "Laravel", "Docker", "LDAP", "Ubuntu", "Shell Script"],
      links: {
        github: "https://github.com/luffrey1/LDAP-TFG",
      },
      featured: true,
      category: "backend",
      icons: [<FaDatabase key="ldap" />, <SiUbuntu key="ubuntu" />, <SiPhp key="php" />, <FaServer key="server" />, <FaUsers key="users" />, <FaTerminal key="terminal" />],
      color: "from-blue-600 to-purple-600",
    },
    {
      id: "goldney",
      title: "Goldney.net",
      description: "Sitio web corporativo desarrollado para Goldney, con diseño moderno y responsive. Implementación de SEO técnico y optimización de rendimiento para mejorar la visibilidad online y la experiencia de usuario.",
      image: "/portfolio/images/projects/goldneyy.webp",
      technologies: ["WordPress", "PHP", "CSS", "JavaScript", "SEO"],
      links: {
        live: "https://goldney.net",
      },
      featured: true,
      category: "frontend",
      icons: [<SiWordpress key="wp" />, <FaGlobe key="globe" />, <SiPhp key="php" />, <FaDesktop key="desktop" />],
      color: "from-green-600 to-teal-600",
    },
    {
      id: "taskflow",
      title: "TaskFlow - Gestión de Tareas",
      description: "Landing page moderna y responsive para una plataforma de gestión de tareas, desarrollada con React, Vite, Tailwind CSS y Framer Motion, con diseño minimalista, modo oscuro, animaciones fluidas y componentes interactivos optimizada para todos los dispositivos.",
      image: "/portfolio/images/projects/taskflow.webp",
      technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript"],
      links: {
        live: "https://luffrey1.github.io/taskflow/",
      },
      featured: true,
      category: "frontend",
      icons: [<SiReact key="react" />, <SiTailwindcss key="tailwind" />, <FaGlobe key="globe" />, <FaDesktop key="desktop" />],
      color: "from-sky-600 to-indigo-600",
    },
    {
      id: "naturaglow",
      title: "NaturaGlow - Tienda de Cosméticos",
      description: "Tienda de cosméticos minimalista, moderna y agradable visualmente. Desarrollada con Bootstrap, HTML, CSS y JavaScript. Diseño responsive y experiencia de usuario optimizada para todos los dispositivos.",
      image: "/portfolio/images/projects/naturaglow.webp",
      technologies: ["Bootstrap", "HTML", "CSS", "JavaScript", "Responsive Design"],
      links: {
        live: "https://luffrey1.github.io/naturaglow/",
      },
      featured: true,
      category: "frontend",
      icons: [<FaGlobe key="globe" />, <FaDesktop key="desktop" />, <FaCode key="code" />],
      color: "from-pink-400 to-fuchsia-600",
    },
    {
      id: "luxe",
      title: "Luxe - Tienda de Moda",
      description: "Diseño elegante y profesional para una tienda de moda en línea, con interfaz minimalista y experiencia de usuario optimizada. Desarrollo frontend con React y diseño UI/UX personalizado.",
      image: "/portfolio/images/projects/luxe.webp",
      technologies: ["Bootstrap", "JavaScript", "CSS", "HTML", "Responsive Design"],
      links: {
        live: "https://luffrey1.github.io/luxe/",
      },
      featured: true,
      category: "frontend",
      icons: [ <FaGlobe key="globe" />, <FaDesktop key="desktop" />, <FaCode key="code" />],
      color: "from-yellow-600 to-orange-600",
    },
    {
      id: "lexJuris",
      title: "LexJuris Bufete de Abogados",
      description: "Diseño elegante y profesional para un bufete de abogados, con interfaz minimalista y experiencia de usuario optimizada. Desarrollo frontend con React y diseño UI/UX personalizado.",
      image: "/portfolio/images/projects/abogado.webp",
      technologies: ["Bootstrap", "JavaScript", "CSS", "HTML", "Responsive Design"],
      links: {
        live: "https://luffrey1.github.io/LexJuris/",
      },
      featured: true,
      category: "frontend",
      icons: [ <FaGlobe key="globe" />, <FaDesktop key="desktop" />, <FaCode key="code" />],
      color: "from-yellow-600 to-orange-600",
    },
    {
      id: "vinedos",
      title: "Viñedos & Cabañas",
      description: "Plataforma de reservas para un complejo de viñedos y cabañas desarrollado como proyecto de máster para un conocido. Incluye sistema de reservas, galería interactiva y experiencia de usuario personalizada.",
      image: "/portfolio/images/projects/vinacabana.webp",
      technologies: ["Bootstrap", "JavaScript", "CSS", "HTML", "Responsive Design"],
      links: {
        live: "https://luffrey1.github.io/vinacabana/",
      },
      featured: true,
      category: "frontend",
      icons: [<SiNextdotjs key="next" />, <SiTailwindcss key="tailwind" />, <FaGlobe key="globe" />, <FaServer key="server" />],
      color: "from-green-800 to-emerald-600",
    },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const filters = [
    { id: "all", label: "Todos" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
  ];

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
      } 
    },
    hover: { 
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  const floatingVariants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <section id="projects" className="py-20 bg-primary-dark relative overflow-hidden">
      {/* Mini partículas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MiniParticles 
          colors={["#8A2BE2", "#9370DB", "#6A0DAD"]} 
          className="opacity-30"
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-accent-blue/5 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-accent-green/5 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
      
      {/* Floating code elements */}
      {[
        { top: "15%", left: "12%" },
        { top: "65%", left: "78%" },
        { top: "35%", left: "65%" },
        { top: "75%", left: "25%" },
        { top: "25%", left: "45%" }
      ].map((position, i) => (
        <motion.div
          key={`code-${i}`}
          className="absolute text-accent-blue/10 text-6xl font-mono hidden md:block"
          style={{
            top: position.top,
            left: position.left,
            opacity: 0.3,
          }}
          custom={i}
          variants={floatingVariants}
          animate="animate"
        >
          &lt;/&gt;
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
            Proyectos Destacados
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-blue to-accent-green mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Una muestra de mis <span className="text-accent-blue font-semibold">trabajos recientes</span> y 
            <span className="text-accent-green font-semibold"> soluciones innovadoras</span> para problemas reales.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="flex space-x-2 p-1 bg-glass-dark rounded-xl">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-accent-blue to-accent-green text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <motion.div 
                className="glassmorphism rounded-3xl overflow-hidden border border-transparent hover:border-accent-blue/30 h-full"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 238, 255, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-glass-dark p-2 rounded-full">
                    <motion.div 
                      className="flex space-x-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      {project.icons.slice(0, 3).map((icon, i) => (
                        <motion.div 
                          key={i}
                          className="text-accent-blue hover:text-accent-green transition-colors"
                          variants={iconVariants}
                          whileHover="hover"
                        >
                          {icon}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-2 py-1 bg-glass-dark text-xs rounded-full text-gray-300 border border-accent-blue/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + (i * 0.05) }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <motion.span
                        className="px-2 py-1 bg-glass-dark text-xs rounded-full text-gray-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        +{project.technologies.length - 4}
                      </motion.span>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-glass-dark rounded-lg flex items-center space-x-2 hover:bg-accent-blue/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub className="text-accent-blue" />
                        <span className="text-sm text-gray-300">GitHub</span>
                      </motion.a>
                    )}
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-glass-dark rounded-lg flex items-center space-x-2 hover:bg-accent-green/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGlobe className="text-accent-green" />
                        <span className="text-sm text-gray-300">Ver Sitio</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 