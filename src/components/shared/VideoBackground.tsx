'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
}

export const VideoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 60;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (initY = false): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: initY ? Math.random() * canvas.height : canvas.height + 10,
        size: Math.random() * 1.8 + 0.6,
        speedY: -(Math.random() * 0.4 + 0.15),
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.002 + 0.001,
      };
    };

    // Populate initial particles
    const init = () => {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(createParticle(true));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a soft light radial gradient overlay
      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.1,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      grad.addColorStop(0, 'rgba(224, 233, 245, 0.25)');
      grad.addColorStop(0.5, 'rgba(228, 235, 245, 0.6)');
      grad.addColorStop(1, 'rgba(241, 246, 250, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render white & blue glass particles
      particles.forEach((p, idx) => {
        p.y += p.speedY;
        
        // Horizontal wiggle
        p.x += Math.sin(p.y * 0.01 + idx) * 0.15;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        
        // Alternating translucent white and active blue glares
        const color = idx % 2 === 0 ? `rgba(255, 255, 255, ${p.opacity})` : `rgba(43, 89, 195, ${p.opacity * 0.4})`;
        ctx.fillStyle = color;
        ctx.shadowBlur = p.size * 2.5;
        ctx.shadowColor = idx % 2 === 0 ? '#FFFFFF' : '#2B59C3';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Recycle particles that move off screen
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-gradient-to-br from-[#E0E9F5] via-[#E4EBF5] to-[#F1F6FA]">
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
    </div>
  );
};
