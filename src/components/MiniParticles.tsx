"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface MiniParticlesProps {
  className?: string;
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
  interactive?: boolean;
}

export default function MiniParticles({
  className = "",
  count = 30,
  colors = ["#5D5DFF", "#4040B2", "#7878FF", "#3D3D99"],
  minSize = 1,
  maxSize = 5,
  speed = 1,
  interactive = true,
}: MiniParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const animationRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  // Inicializar partículas
  useEffect(() => {
    if (!canvasRef.current || isInitializedRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    setDimensions({ width, height });
    
    // Crear partículas iniciales
    const initialParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      initialParticles.push(createParticle(width, height, minSize, maxSize, colors, speed));
    }
    
    particlesRef.current = initialParticles;
    isInitializedRef.current = true;
    
    // Manejar redimensionamiento
    const handleResize = () => {
      if (!canvasRef.current) return;
      const newRect = canvasRef.current.getBoundingClientRect();
      setDimensions({ width: newRect.width, height: newRect.height });
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count, minSize, maxSize, colors, speed]);
  
  // Manejar interacción con el mouse
  useEffect(() => {
    if (!interactive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [interactive]);
  
  // Animar partículas
  useEffect(() => {
    if (!canvasRef.current || !isInitializedRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Actualizar y dibujar partículas
      const updatedParticles = particlesRef.current.map(particle => {
        // Actualizar posición
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        
        // Rebotar en los bordes
        if (newX < 0 || newX > dimensions.width) {
          particle.vx *= -1;
          newX = particle.x + particle.vx;
        }
        
        if (newY < 0 || newY > dimensions.height) {
          particle.vy *= -1;
          newY = particle.y + particle.vy;
        }
        
        // Interacción con el mouse
        if (mousePosition && interactive) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = 0.5 * (1 - distance / 100);
            particle.vx -= force * dx / distance;
            particle.vy -= force * dy / distance;
            
            // Limitar velocidad máxima
            const maxSpeed = 2 * speed;
            const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (currentSpeed > maxSpeed) {
              particle.vx = (particle.vx / currentSpeed) * maxSpeed;
              particle.vy = (particle.vy / currentSpeed) * maxSpeed;
            }
          }
        }
        
        // Actualizar vida
        const newLife = particle.life - 1;
        let newOpacity = particle.opacity;
        
        if (newLife <= 0) {
          // Recrear partícula
          return createParticle(dimensions.width, dimensions.height, minSize, maxSize, colors, speed);
        } else if (newLife < particle.maxLife * 0.3) {
          // Desvanecer al final de la vida
          newOpacity = (newLife / (particle.maxLife * 0.3)) * particle.opacity;
        }
        
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(newOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        return {
          ...particle,
          x: newX,
          y: newY,
          life: newLife,
          opacity: newOpacity
        };
      });
      
      particlesRef.current = updatedParticles;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, mousePosition, interactive, minSize, maxSize, colors, speed]);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ width: "100%", height: "100%" }}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}

// Función para crear una partícula
function createParticle(
  width: number,
  height: number,
  minSize: number,
  maxSize: number,
  colors: string[],
  speed: number
): Particle {
  const size = Math.random() * (maxSize - minSize) + minSize;
  const maxLife = Math.floor(Math.random() * 200) + 100; // Entre 100 y 300 frames
  
  return {
    id: Math.random(),
    x: Math.random() * width,
    y: Math.random() * height,
    size,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    opacity: Math.random() * 0.5 + 0.3, // Entre 0.3 y 0.8
    life: maxLife,
    maxLife
  };
} 