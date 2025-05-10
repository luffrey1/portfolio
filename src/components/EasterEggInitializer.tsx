"use client";

import { useEffect, useState } from "react";
import { easterEggs, createConfetti, matrixEffect, toggleDevMode, activateCustomCursor } from "@/lib/easterEggs";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaLightbulb, FaGamepad, FaTrophy } from "react-icons/fa";

export default function EasterEggInitializer() {
  const [secretMessage, setSecretMessage] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showInitialTip, setShowInitialTip] = useState(true);
  const [konamiActivated, setKonamiActivated] = useState(false);
  
  useEffect(() => {
    if (!easterEggs) return;
    
    // Activar el código Konami (↑ ↑ ↓ ↓ ← → ← → B A)
    easterEggs.on('konami', () => {
      createConfetti();
      setKonamiActivated(true);
      setSecretMessage("¡KONAMI CODE ACTIVADO! 🎮");
      
      // Mostrar un toast más impresionante
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-glass-dark shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <FaGamepad className="h-10 w-10 text-accent-blue animate-pulse" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-accent-blue">
                    ¡CÓDIGO KONAMI ACTIVADO!
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    Has desbloqueado el modo gamer. ¡Eres un verdadero jugador!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-700">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-accent-green hover:text-accent-blue focus:outline-none"
              >
                <FaTrophy className="h-5 w-5" />
              </button>
            </div>
          </div>
        ),
        { duration: 5000 }
      );
      
      // Ocultar el mensaje después de un tiempo
      setTimeout(() => {
        setSecretMessage(null);
        setKonamiActivated(false);
      }, 8000);
    });
    
    // Activar el efecto Matrix (escribir "matrix")
    easterEggs.on('matrix', () => {
      matrixEffect();
      toast("Entrando en la Matrix...", {
        icon: "🖥️",
        style: {
          borderRadius: '10px',
          background: '#000',
          color: '#0f0',
          border: '1px solid #0f0',
        },
      });
    });
    
    // Activar el modo desarrollador (escribir "dev")
    easterEggs.on('devMode', () => {
      toggleDevMode();
    });
    
    // Activar el cursor personalizado
    easterEggs.on('customCursor', () => {
      activateCustomCursor();
    });
    
    // Añadir listener para doble clic en el logo
    const setupLogoListener = () => {
      const logo = document.querySelector('a[href="#home"] div');
      if (logo) {
        logo.addEventListener('dblclick', () => {
          try {
            activateCustomCursor();
          } catch (error) {
            console.error("Error al activar cursor personalizado:", error);
            toast.error("No se pudo activar el cursor personalizado");
          }
        });
      } else {
        // Intentar de nuevo si el DOM no está listo
        setTimeout(setupLogoListener, 1000);
      }
    };
    
    // Intentar varias veces para asegurar que el DOM está listo
    setTimeout(setupLogoListener, 1000);
    setTimeout(setupLogoListener, 2000);
    setTimeout(setupLogoListener, 3000);
    
    // Easter egg secreto: presionar Alt + H para mostrar pistas
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === 'KeyH') {
        setShowHints(prev => !prev);
        if (!showHints) {
          toast("¡Panel de secretos activado!", {
            icon: "🔍",
            duration: 3000,
          });
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Mostrar mensaje inicial después de unos segundos
    const tipTimer = setTimeout(() => {
      toast("¡Psst! Presiona Alt+H para descubrir secretos ocultos", {
        icon: "🔎",
        duration: 6000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          border: '1px solid rgba(0, 238, 255, 0.3)',
        },
      });
      
      // Ocultar el mensaje inicial después de mostrarlo
      setTimeout(() => setShowInitialTip(false), 6000);
    }, 5000);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(tipTimer);
    };
  }, [showHints]);
  
  return (
    <>
      <AnimatePresence>
        {secretMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${
              konamiActivated ? 'bg-gradient-to-r from-accent-blue to-accent-purple' : 'bg-glass-dark'
            } p-6 rounded-lg shadow-lg border border-accent-blue text-center`}
          >
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-white mb-2"
              animate={{ 
                scale: konamiActivated ? [1, 1.2, 1] : 1,
                textShadow: konamiActivated ? "0 0 8px rgba(0, 238, 255, 0.8)" : "none"
              }}
              transition={{ 
                repeat: konamiActivated ? Infinity : 0, 
                duration: 2
              }}
            >
              {secretMessage}
            </motion.h2>
            {konamiActivated && (
              <p className="text-gray-200 mt-2">¡Has desbloqueado poderes especiales!</p>
            )}
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent-blue animate-ping"></div>
          </motion.div>
        )}
        
        {showHints && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-20 right-4 z-50 bg-glass-dark p-5 rounded-lg shadow-lg border border-accent-green max-w-xs"
          >
            <h3 className="text-accent-green text-lg font-bold mb-3">Easter Eggs 🥚</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-2"></span>
                <span>Código Konami: <code className="text-accent-blue">↑ ↑ ↓ ↓ ← → ← → B A</code></span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-2"></span>
                <span>Efecto Matrix: escribe <code className="text-accent-blue">matrix</code></span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-2"></span>
                <span>Modo desarrollador: escribe <code className="text-accent-blue">dev</code></span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-blue mt-2 mr-2"></span>
                <span>Cursor personalizado: <code className="text-accent-blue">doble clic</code> en el logo</span>
              </li>
            </ul>
            <p className="text-xs text-gray-400 mt-3 italic">Presiona Alt+H para ocultar</p>
            <button 
              onClick={() => setShowHints(false)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-red flex items-center justify-center"
              aria-label="Cerrar pistas"
            >
              ×
            </button>
          </motion.div>
        )}
        
        {showInitialTip && (
          <div className="fixed bottom-4 left-4 z-50 hidden">
            <button 
              onClick={() => setShowHints(true)}
              className="bg-glass-dark px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white border border-accent-blue/30 hover:border-accent-blue transition-all duration-300"
            >
              <span className="animate-pulse">💡</span> Descubre secretos (Alt+H)
            </button>
          </div>
        )}
      </AnimatePresence>
      
      {/* Botón fijo para mostrar secretos */}
      <motion.button
        onClick={() => setShowHints(true)}
        className="fixed bottom-4 right-4 z-40 bg-glass-dark p-3 rounded-full shadow-lg border border-accent-blue/30 hover:border-accent-blue transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        aria-label="Mostrar secretos"
        title="Descubre los secretos ocultos (Alt+H)"
      >
        <FaLightbulb className="text-accent-blue w-5 h-5 animate-pulse" />
      </motion.button>
    </>
  );
} 