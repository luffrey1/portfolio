"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPhp,
  FaJs,
  FaReact,
  FaWordpress,
  FaHtml5,
  FaCss3Alt,
  FaSearchengin,
  FaFileImport,
  FaJava,
  FaDatabase,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiGoogleanalytics,
  SiTailwindcss,
  SiMysql,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";
import MiniParticles from "@/components/MiniParticles";

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  color: string;
  skills: {
    name: string;
    icon: JSX.Element;
    color: string;
    level?: number;
  }[];
}

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories: SkillCategory[] = [
    {
      title: "Lenguajes de Programación",
      icon: <FaJs className="w-6 h-6" />,
      color: "text-yellow-400",
      skills: [
        {
          name: "JavaScript",
          icon: <FaJs className="w-10 h-10" />,
          color: "text-[#f7df1e]",
          level: 85,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="w-10 h-10" />,
          color: "text-[#3178c6]",
          level: 70,
        },
        {
          name: "PHP",
          icon: <FaPhp className="w-10 h-10" />,
          color: "text-[#777bb3]",
          level: 75,
        },
        {
          name: "Java",
          icon: <FaJava className="w-10 h-10" />,
          color: "text-[#f89820]",
          level: 65,
        },
      ],
    },
    {
      title: "Desarrollo Front-end",
      icon: <FaHtml5 className="w-6 h-6" />,
      color: "text-orange-500",
      skills: [
        {
          name: "HTML5",
          icon: <FaHtml5 className="w-10 h-10" />,
          color: "text-[#e34c26]",
          level: 90,
        },
        {
          name: "CSS3",
          icon: <FaCss3Alt className="w-10 h-10" />,
          color: "text-[#264de4]",
          level: 85,
        },
        {
          name: "React",
          icon: <FaReact className="w-10 h-10" />,
          color: "text-[#61dafb]",
          level: 80,
        },
        {
          name: "Next.js",
          icon: <SiNextdotjs className="w-10 h-10" />,
          color: "text-white",
          level: 75,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="w-10 h-10" />,
          color: "text-[#38b2ac]",
          level: 85,
        },
      ],
    },
    {
      title: "Bases de Datos",
      icon: <FaDatabase className="w-6 h-6" />,
      color: "text-blue-400",
      skills: [
        {
          name: "MySQL",
          icon: <SiMysql className="w-10 h-10" />,
          color: "text-[#4479a1]",
          level: 80,
        },
      ],
    },
    {
      title: "CMS & SEO",
      icon: <FaWordpress className="w-6 h-6" />,
      color: "text-purple-400",
      skills: [
        {
          name: "WordPress",
          icon: <FaWordpress className="w-10 h-10" />,
          color: "text-[#21759b]",
          level: 90,
        },
        {
          name: "Rank Math SEO",
          icon: <FaSearchengin className="w-10 h-10" />,
          color: "text-[#e9477f]",
          level: 85,
        },
        {
          name: "WP All Import",
          icon: <FaFileImport className="w-10 h-10" />,
          color: "text-[#7eb321]",
          level: 80,
        },
     
      ],
    },
    {
      title: "Herramientas",
      icon: <FaGitAlt className="w-6 h-6" />,
      color: "text-green-400",
      skills: [
        {
          name: "Git",
          icon: <FaGitAlt className="w-10 h-10" />,
          color: "text-[#f05032]",
          level: 80,
        },
        {
          name: "VS Code",
          icon: <SiVisualstudiocode className="w-10 h-10" />,
          color: "text-[#007acc]",
          level: 90,
        },
        {
          name: "Figma",
          icon: <FaFigma className="w-10 h-10" />,
          color: "text-[#f24e1e]",
          level: 70,
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.1,
      } 
    },
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-primary-dark to-[#0a0a0a] relative overflow-hidden">
      {/* Mini partículas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MiniParticles variant="blue" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
            Mis Habilidades
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-blue to-accent-green mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Un conjunto de <span className="text-accent-blue font-semibold">tecnologías y herramientas</span> que domino para crear 
            <span className="text-accent-green font-semibold"> experiencias web excepcionales</span> con diseño moderno y optimización técnica.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glassmorphism rounded-3xl p-6 hover:shadow-neon-blue transition-all duration-300 border border-transparent hover:border-accent-blue/30"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  className={`${category.color} p-3 rounded-xl bg-glass-dark mr-3`}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-accent-blue">
                  {category.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className={`${skill.color} mb-3 p-3 rounded-xl bg-glass-dark hover:bg-glass-light transition-colors`}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <span className="text-sm text-gray-200 font-medium">{skill.name}</span>
                    
                    {skill.level && (
                      <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-accent-blue to-accent-green rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + (skillIndex * 0.1) }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 