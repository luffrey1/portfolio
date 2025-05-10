"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  // Determinar si es modo oscuro para las animaciones y estilos
  const isDarkMode = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
        isDarkMode 
          ? "bg-gradient-to-br from-accent-blue to-blue-600" 
          : "bg-gradient-to-br from-purple-500 to-purple-700"
      }`}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: isDarkMode 
          ? "0 0 15px 2px rgba(0, 238, 255, 0.6)" 
          : "0 0 15px 2px rgba(147, 51, 234, 0.6)" 
      }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Cambiar a modo ${isDarkMode ? "claro" : "oscuro"}`}
    >
      {/* Efecto de brillo en el fondo */}
      <div 
        className={`absolute inset-0 opacity-50 ${
          isDarkMode ? "bg-blue-400" : "bg-purple-400"
        }`}
        style={{
          filter: "blur(8px)",
          transform: "scale(0.85)",
          animation: "pulse 2s infinite"
        }}
      />
      
      {/* Icono con animación */}
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDarkMode ? 0 : 180,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        {isDarkMode ? (
          <FaSun className="w-6 h-6 text-white" />
        ) : (
          <FaMoon className="w-6 h-6 text-white" />
        )}
      </motion.div>
      
      {/* Estilo global para la animación de pulso */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </motion.button>
  );
} 