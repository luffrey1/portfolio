"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaLightbulb, FaFileAlt } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://github.com/luffrey1",
    icon: <FaGithub className="w-5 h-5" />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/daniel-florin-gheorghe-ciobanu-621811330/",
    icon: <FaLinkedin className="w-5 h-5" />,
    label: "LinkedIn",
  },
  {
    href: "mailto:danielghcu@gmail.com",
    icon: <FaEnvelope className="w-5 h-5" />,
    label: "Email",
  },
  {
    href: "/images/Daniel_Gheorghe_Desarrollador_Web.pdf",
    icon: <FaFileAlt className="w-5 h-5" />,
    label: "CV",
    isDownload: true,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="#home">
              <span className="text-xl font-bold">
                <span className="text-accent-blue">Daniel</span>
                <span className="text-white">Gheorghe</span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Desarrollador Web & Técnico SEO
            </p>
          </motion.div>

          <motion.div
            className="flex space-x-4 mt-6 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-glass-dark hover:bg-accent-blue hover:text-primary-dark transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
                download={link.isDownload ? "Daniel_Gheorghe_CV.pdf" : undefined}
              >
                {link.icon}
                <span className="absolute -bottom-8 text-xs bg-glass-dark px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {currentYear} Daniel Gheorghe. Todos los derechos reservados.
          </p>
          <p className="mt-2">
            Diseñado y desarrollado con{" "}
            <span className="text-accent-blue">❤</span> usando Next.js y React
          </p>
          <motion.div 
            className="mt-4 flex items-center justify-center text-xs bg-glass-dark py-2 px-4 rounded-full mx-auto w-fit"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <FaLightbulb className="text-accent-blue w-3 h-3 mr-2" />
            <span>
              Este portfolio contiene <span className="text-accent-blue">secretos ocultos</span>. Presiona <kbd className="bg-glass-light px-1 rounded">Alt+H</kbd> para descubrirlos.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
} 