import { useEffect, useRef, useCallback } from 'react';
import './CanvasBackground.scss';

const CanvasBackground = ({
  variant = 'particles',
  particleCount = 80,
  color = '#FF6B35',
  opacity = 0.6,
  speed = 0.5,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initParticles = useCallback((dimensions) => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    return particles;
  }, [particleCount, speed]);

  const drawParticles = useCallback((ctx, canvas, particles) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach((other) => {
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(255, 107, 53, ${(1 - distance / 150) * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    // Draw particles
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 107, 53, ${particle.opacity * opacity})`;
      ctx.fill();
    });
  }, [opacity]);

  const drawGrid = useCallback((ctx, canvas, time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gridSize = 50;
    const offset = (time * 0.02) % gridSize;

    ctx.strokeStyle = `rgba(255, 107, 53, 0.1)`;
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = -gridSize + offset; x < canvas.width + gridSize; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = -gridSize + offset; y < canvas.height + gridSize; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Glow points at intersections
    for (let x = -gridSize + offset; x < canvas.width + gridSize; x += gridSize) {
      for (let y = -gridSize + offset; y < canvas.height + gridSize; y += gridSize) {
        const glowIntensity = Math.sin((x + y + time) * 0.01) * 0.3 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 53, ${glowIntensity})`;
        ctx.fill();
      }
    }
  }, []);

  const drawGradientMesh = useCallback((ctx, canvas, time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create animated gradient blobs
    const blobs = [
      { x: canvas.width * 0.3, y: canvas.height * 0.3, r: 300 },
      { x: canvas.width * 0.7, y: canvas.height * 0.6, r: 250 },
      { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 200 },
    ];

    blobs.forEach((blob, i) => {
      const offsetX = Math.sin(time * 0.001 + i) * 50;
      const offsetY = Math.cos(time * 0.001 + i * 2) * 50;

      const gradient = ctx.createRadialGradient(
        blob.x + offsetX, blob.y + offsetY, 0,
        blob.x + offsetX, blob.y + offsetY, blob.r
      );
      gradient.addColorStop(0, `rgba(255, 107, 53, ${0.15 - i * 0.03})`);
      gradient.addColorStop(1, 'rgba(255, 107, 53, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      // Cache dimensions before modifying canvas
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      const width = rect.width;
      const height = rect.height;

      dimensionsRef.current = { width, height };

      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      if (variant === 'particles') {
        particlesRef.current = initParticles({ width, height });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    let startTime = Date.now();

    const animate = () => {
      const time = Date.now() - startTime;

      if (variant === 'particles') {
        const particles = particlesRef.current;

        particles.forEach((particle) => {
          // Mouse interaction
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            particle.vx -= (dx / distance) * 0.02;
            particle.vy -= (dy / distance) * 0.02;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;

          // Boundary check
          const { width, height } = dimensionsRef.current;
          if (particle.x < 0 || particle.x > width) {
            particle.vx *= -1;
          }
          if (particle.y < 0 || particle.y > height) {
            particle.vy *= -1;
          }

          // Damping
          particle.vx *= 0.999;
          particle.vy *= 0.999;
        });

        drawParticles(ctx, canvas, particles);
      } else if (variant === 'grid') {
        drawGrid(ctx, canvas, time);
      } else if (variant === 'gradient') {
        drawGradientMesh(ctx, canvas, time);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, initParticles, drawParticles, drawGrid, drawGradientMesh]);

  return (
    <div className={`canvas-background canvas-background--${variant} ${className}`}>
      <canvas ref={canvasRef} className="canvas-background__canvas" />
      <div className="canvas-background__overlay" />
    </div>
  );
};

export default CanvasBackground;
