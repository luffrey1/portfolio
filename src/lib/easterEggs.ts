// Código Konami: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", 
  "ArrowDown", "ArrowDown", 
  "ArrowLeft", "ArrowRight", 
  "ArrowLeft", "ArrowRight", 
  "KeyB", "KeyA"
];

// Secuencia para el efecto Matrix
const MATRIX_CODE = ["KeyM", "KeyA", "KeyT", "KeyR", "KeyI", "KeyX"];

// Secuencia para el modo desarrollador
const DEV_MODE = ["KeyD", "KeyE", "KeyV"];

// Clase para manejar los easter eggs
export class EasterEggs {
  private konamiIndex = 0;
  private matrixIndex = 0;
  private devModeIndex = 0;
  private callbacks: Record<string, () => void> = {};

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
  }

  // Registrar callbacks para diferentes easter eggs
  public on(eggName: 'konami' | 'matrix' | 'devMode' | 'customCursor', callback: () => void) {
    this.callbacks[eggName] = callback;
    return this;
  }

  // Manejar las pulsaciones de teclas
  private handleKeyPress(event: KeyboardEvent) {
    // Comprobar código Konami
    if (event.code === KONAMI_CODE[this.konamiIndex]) {
      this.konamiIndex++;
      if (this.konamiIndex === KONAMI_CODE.length) {
        this.konamiIndex = 0;
        if (this.callbacks['konami']) {
          this.callbacks['konami']();
        }
      }
    } else {
      this.konamiIndex = event.code === KONAMI_CODE[0] ? 1 : 0;
    }

    // Comprobar código Matrix
    if (event.code === MATRIX_CODE[this.matrixIndex]) {
      this.matrixIndex++;
      if (this.matrixIndex === MATRIX_CODE.length) {
        this.matrixIndex = 0;
        if (this.callbacks['matrix']) {
          this.callbacks['matrix']();
        }
      }
    } else {
      this.matrixIndex = event.code === MATRIX_CODE[0] ? 1 : 0;
    }

    // Comprobar modo desarrollador
    if (event.code === DEV_MODE[this.devModeIndex]) {
      this.devModeIndex++;
      if (this.devModeIndex === DEV_MODE.length) {
        this.devModeIndex = 0;
        if (this.callbacks['devMode']) {
          this.callbacks['devMode']();
        }
      }
    } else {
      this.devModeIndex = event.code === DEV_MODE[0] ? 1 : 0;
    }
  }
  
  // Activar cursor personalizado
  public activateCustomCursor() {
    if (this.callbacks['customCursor']) {
      this.callbacks['customCursor']();
    }
  }
}

// Función para crear confeti mejorado
export function createConfetti() {
  try {
    // Colores vibrantes para el confeti
    const colors = [
      '#00eeff', '#a200ff', '#00ff88', '#ffcc00', 
      '#ff0066', '#36e2ff', '#ffde59', '#ff3d00',
      '#4f46e5', '#10b981', '#f43f5e', '#8b5cf6'
    ];
    
    // Formas para el confeti
    const shapes = ['circle', 'square', 'triangle', 'star', 'heart'];
    
    // Crear un contenedor para todo el confeti
    const container = document.createElement('div');
    container.id = 'konami-effect-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '10000';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    
    // Crear efecto de destello inicial
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);
    
    // Animar y eliminar el destello
    setTimeout(() => {
      flash.style.transition = 'opacity 0.5s';
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 500);
    }, 100);
    
    // Función para crear una forma de confeti específica
    const createConfettiShape = (shape: string) => {
      const element = document.createElement('div');
      const size = Math.random() * 15 + 5; // Tamaño entre 5px y 20px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Estilos base
      Object.assign(element.style, {
        position: 'absolute',
        zIndex: '10000',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        top: `-${size}px`,
        left: `${Math.random() * 100}vw`,
        opacity: '1',
        pointerEvents: 'none',
        boxShadow: `0 0 ${size/2}px ${color}80`,
      });
      
      // Aplicar forma específica
      switch(shape) {
        case 'circle':
          element.style.borderRadius = '50%';
          break;
        case 'square':
          element.style.borderRadius = '2px';
          break;
        case 'triangle':
          element.style.width = '0';
          element.style.height = '0';
          element.style.backgroundColor = 'transparent';
          element.style.borderLeft = `${size/2}px solid transparent`;
          element.style.borderRight = `${size/2}px solid transparent`;
          element.style.borderBottom = `${size}px solid ${color}`;
          break;
        case 'star':
          element.style.backgroundColor = 'transparent';
          element.style.width = '0';
          element.style.height = '0';
          element.style.borderRight = `${size/2}px solid transparent`;
          element.style.borderBottom = `${size*0.7}px solid ${color}`;
          element.style.borderLeft = `${size/2}px solid transparent`;
          element.style.transform = 'rotate(35deg)';
          const starAfter = document.createElement('div');
          Object.assign(starAfter.style, {
            position: 'absolute',
            borderRight: `${size/2}px solid transparent`,
            borderBottom: `${size*0.7}px solid ${color}`,
            borderLeft: `${size/2}px solid transparent`,
            transform: 'rotate(70deg)',
            top: '0',
            left: '0'
          });
          element.appendChild(starAfter);
          break;
        case 'heart':
          element.style.backgroundColor = 'transparent';
          element.style.transform = 'rotate(-45deg)';
          element.style.width = `${size}px`;
          element.style.height = `${size}px`;
          element.style.background = color;
          element.style.borderRadius = `${size*0.3}px`;
          
          const heartBefore = document.createElement('div');
          Object.assign(heartBefore.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: color,
            borderRadius: '50%',
            top: `-${size/2}px`,
            left: '0'
          });
          
          const heartAfter = document.createElement('div');
          Object.assign(heartAfter.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: color,
            borderRadius: '50%',
            top: '0',
            left: `${size/2}px`
          });
          
          element.appendChild(heartBefore);
          element.appendChild(heartAfter);
          break;
      }
      
      return element;
    };
    
    // Crear confeti con diferentes formas
    for (let i = 0; i < 150; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const confetti = createConfettiShape(shape);
      container.appendChild(confetti);
      
      // Animación de caída
      const duration = Math.random() * 4 + 2; // Entre 2 y 6 segundos
      const rotation = Math.random() * 720 - 360; // Rotación aleatoria entre -360 y 360 grados
      const horizontalSwing = (Math.random() * 40) - 20; // Movimiento horizontal entre -20 y 20
      
      // Diferentes tipos de animación para variedad
      const animationType = Math.floor(Math.random() * 3);
      let keyframes: Keyframe[] = [];
      
      switch(animationType) {
        case 0: // Caída simple con rotación
          keyframes = [
            { transform: `rotate(0deg) translateX(0)`, opacity: 1 },
            { transform: `translateY(100vh) rotate(${rotation}deg) translateX(${horizontalSwing}px)`, opacity: 0 }
          ];
          break;
        case 1: // Caída con oscilación
          keyframes = [
            { transform: `rotate(0deg) translateX(0)`, opacity: 1 },
            { transform: `translateY(50vh) rotate(${rotation/2}deg) translateX(${horizontalSwing}px)`, opacity: 0.7 },
            { transform: `translateY(100vh) rotate(${rotation}deg) translateX(${-horizontalSwing}px)`, opacity: 0 }
          ];
          break;
        case 2: // Caída con rebote
          keyframes = [
            { transform: `translateY(0) rotate(0deg)`, opacity: 1, offset: 0 },
            { transform: `translateY(85vh) rotate(${rotation*0.6}deg) translateX(${horizontalSwing*0.7}px)`, opacity: 0.7, offset: 0.7 },
            { transform: `translateY(70vh) rotate(${rotation*0.8}deg) translateX(${horizontalSwing}px)`, opacity: 0.5, offset: 0.8 },
            { transform: `translateY(100vh) rotate(${rotation}deg) translateX(${horizontalSwing*1.2}px)`, opacity: 0, offset: 1 }
          ];
          break;
      }
      
      confetti.animate(keyframes, {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)',
      }).onfinish = () => {
        confetti.remove();
      };
    }
    
    // Crear efecto de brillo en el fondo
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.top = '0';
    glow.style.left = '0';
    glow.style.width = '100vw';
    glow.style.height = '100vh';
    glow.style.background = 'radial-gradient(circle at center, rgba(0, 238, 255, 0.2) 0%, rgba(162, 0, 255, 0.2) 50%, transparent 100%)';
    glow.style.opacity = '0';
    glow.style.zIndex = '9998';
    glow.style.pointerEvents = 'none';
    document.body.appendChild(glow);
    
    // Animar el brillo
    glow.animate([
      { opacity: 0 },
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 3000,
      easing: 'ease-in-out'
    }).onfinish = () => {
      glow.remove();
    };
    
    // Eliminar el contenedor después de que todas las animaciones terminen
    setTimeout(() => {
      if (container && document.body.contains(container)) {
        container.remove();
      }
    }, 8000);
    
    return true;
  } catch (error) {
    console.error("Error al crear el confeti:", error);
    return false;
  }
}

// Efecto Matrix
export function matrixEffect() {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '9999',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 2s',
  });
  
  document.body.appendChild(canvas);
  setTimeout(() => canvas.style.opacity = '0.8', 100);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
  const columns = Math.floor(canvas.width / 20);
  const drops: number[] = [];
  
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  
  function draw() {
    if (!ctx) return;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = '15px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * 20, drops[i] * 20);
      
      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  }
  
  const interval = setInterval(draw, 33);
  
  // Detener después de 10 segundos
  setTimeout(() => {
    canvas.style.opacity = '0';
    setTimeout(() => {
      clearInterval(interval);
      canvas.remove();
    }, 2000);
  }, 10000);
}

// Modo desarrollador
export function toggleDevMode() {
  const devModeActive = document.body.classList.toggle('dev-mode');
  
  if (devModeActive) {
    const style = document.createElement('style');
    style.id = 'dev-mode-style';
    style.textContent = `
      .dev-mode * {
        outline: 1px solid rgba(255, 0, 0, 0.2);
      }
      .dev-mode *:hover {
        outline: 2px solid rgba(255, 0, 0, 0.8);
      }
    `;
    document.head.appendChild(style);
    
    // Mostrar mensaje
    const toast = document.createElement('div');
    toast.textContent = '🛠️ Modo desarrollador activado';
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#00ff88',
      padding: '10px 20px',
      borderRadius: '4px',
      zIndex: '10000',
      fontFamily: 'monospace',
      boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
    });
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  } else {
    const style = document.getElementById('dev-mode-style');
    if (style) style.remove();
  }
}

// Cursor personalizado
export function activateCustomCursor() {
  try {
    // Comprobar si ya está activo
    if (document.getElementById('custom-cursor')) {
      deactivateCustomCursor();
      return;
    }
    
    // Crear estilo para ocultar el cursor normal
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      body, * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Crear elemento del cursor
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    Object.assign(cursor.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'rgba(0, 238, 255, 0.8)',
      boxShadow: '0 0 20px rgba(0, 238, 255, 0.5)',
      pointerEvents: 'none',
      zIndex: '10000',
      mixBlendMode: 'screen',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.2s, height 0.2s, background 0.2s',
    });
    document.body.appendChild(cursor);
    
    // Crear elemento del cursor secundario (trail)
    const cursorTrail = document.createElement('div');
    cursorTrail.id = 'custom-cursor-trail';
    Object.assign(cursorTrail.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '1px solid rgba(0, 238, 255, 0.5)',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.1s, height 0.1s, border 0.3s',
    });
    document.body.appendChild(cursorTrail);
    
    // Posicionar inicialmente el cursor en el centro de la pantalla
    cursor.style.left = `${window.innerWidth / 2}px`;
    cursor.style.top = `${window.innerHeight / 2}px`;
    cursorTrail.style.left = `${window.innerWidth / 2}px`;
    cursorTrail.style.top = `${window.innerHeight / 2}px`;
    
    // Función para actualizar la posición del cursor
    const updateCursorPosition = (e: MouseEvent) => {
      if (!cursor || !cursorTrail) return;
      
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // El trail sigue con un pequeño retraso
      setTimeout(() => {
        if (cursorTrail) {
          cursorTrail.style.left = `${e.clientX}px`;
          cursorTrail.style.top = `${e.clientY}px`;
        }
      }, 50);
    };
    
    // Función para cambiar el estilo al hacer hover sobre elementos interactivos
    const handleMouseOver = (e: MouseEvent) => {
      if (!cursor || !cursorTrail) return;
      
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.getAttribute('role') === 'button'
      ) {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.background = 'rgba(162, 0, 255, 0.8)';
        
        cursorTrail.style.width = '50px';
        cursorTrail.style.height = '50px';
        cursorTrail.style.border = '2px solid rgba(162, 0, 255, 0.5)';
      } else {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'rgba(0, 238, 255, 0.8)';
        
        cursorTrail.style.width = '40px';
        cursorTrail.style.height = '40px';
        cursorTrail.style.border = '1px solid rgba(0, 238, 255, 0.5)';
      }
    };
    
    // Función para efecto de clic
    const handleMouseDown = () => {
      if (!cursor || !cursorTrail) return;
      
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursorTrail.style.transform = 'translate(-50%, -50%) scale(0.9)';
    };
    
    const handleMouseUp = () => {
      if (!cursor || !cursorTrail) return;
      
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
    };
    
    // Añadir event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Mostrar mensaje
    const toast = document.createElement('div');
    toast.textContent = '✨ Cursor personalizado activado';
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#00eeff',
      padding: '10px 20px',
      borderRadius: '4px',
      zIndex: '10000',
      fontFamily: 'monospace',
      boxShadow: '0 0 10px rgba(0, 238, 255, 0.5)',
    });
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
    
    // Guardar los listeners para poder eliminarlos después
    (window as any).customCursorListeners = {
      move: updateCursorPosition,
      over: handleMouseOver,
      down: handleMouseDown,
      up: handleMouseUp
    };
    
    return true;
  } catch (error) {
    console.error("Error al activar el cursor personalizado:", error);
    return false;
  }
}

// Desactivar cursor personalizado
export function deactivateCustomCursor() {
  try {
    const cursor = document.getElementById('custom-cursor');
    const cursorTrail = document.getElementById('custom-cursor-trail');
    const style = document.getElementById('custom-cursor-style');
    
    if (cursor) cursor.remove();
    if (cursorTrail) cursorTrail.remove();
    if (style) style.remove();
    
    // Eliminar event listeners
    if ((window as any).customCursorListeners) {
      document.removeEventListener('mousemove', (window as any).customCursorListeners.move);
      document.removeEventListener('mouseover', (window as any).customCursorListeners.over);
      document.removeEventListener('mousedown', (window as any).customCursorListeners.down);
      document.removeEventListener('mouseup', (window as any).customCursorListeners.up);
      (window as any).customCursorListeners = null;
    }
    
    return true;
  } catch (error) {
    console.error("Error al desactivar el cursor personalizado:", error);
    return false;
  }
}

// Exportar una instancia única
export const easterEggs = typeof window !== 'undefined' ? new EasterEggs() : null; 