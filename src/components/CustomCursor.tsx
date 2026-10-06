import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * CustomCursor - Efeito ultra-fluido e preciso inspirado em https://antesdoleilao.store/
 * na paleta Azul / Ciano Neon Cyberpunk.
 * 
 * Implementação de alta performance:
 * - Renderizado diretamente no document.body via Portal para evitar qualquer
 *   deslocamento de transform/overflow/scroll de containers pai.
 * - Animação via requestAnimationFrame sem re-renders de estado no React durante o movimento.
 * - Círculo envolta e sombra acompanham de perto e em tempo real.
 */
export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Apenas ativa em navegadores com suporte a ponteiro fino (mouse desktop)
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    setMounted(true);

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const shadow = { x: -100, y: -100 };
    let isInitialized = false;
    let isHovering = false;
    let isMouseDown = false;
    let ringScale = 1;
    let dotScale = 1;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isInitialized) {
        ring.x = mouse.x;
        ring.y = mouse.y;
        shadow.x = mouse.x;
        shadow.y = mouse.y;
        isInitialized = true;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }

      // Detecção em tempo real e precisa de elementos interativos
      const target = e.target as HTMLElement | null;
      if (target && typeof target.closest === 'function') {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"], [tabindex]:not([tabindex="-1"])'
        );
        isHovering = !!interactive;
      } else {
        isHovering = false;
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseLeave = () => {
      isHovering = false;
      isMouseDown = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      if (containerRef.current && isInitialized) {
        containerRef.current.style.opacity = '1';
      }
    };

    const render = () => {
      // 1. Lerp responsivo e ágil para o círculo acompanhar de perto sem atrasos
      const ringLerp = 0.45;
      ring.x += (mouse.x - ring.x) * ringLerp;
      ring.y += (mouse.y - ring.y) * ringLerp;

      // 2. Lerp da sombra/glow suave logo atrás do cursor
      const shadowLerp = 0.28;
      shadow.x += (mouse.x - shadow.x) * shadowLerp;
      shadow.y += (mouse.y - shadow.y) * shadowLerp;

      // 3. Suavização das escalas (hover e clique)
      const targetRingScale = isHovering ? 1.35 : 1;
      ringScale += (targetRingScale - ringScale) * 0.2;

      const targetDotScale = isMouseDown ? 0.6 : isHovering ? 1.25 : 1;
      dotScale += (targetDotScale - dotScale) * 0.25;

      // Aplicação direta de transforms com coordenadas puras do viewport
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.borderColor = isHovering ? '#38bdf8' : '#00f0ff';
        ringRef.current.style.boxShadow = isHovering
          ? '0 0 16px rgba(0, 240, 255, 0.75), inset 0 0 8px rgba(0, 240, 255, 0.35)'
          : '0 0 12px rgba(0, 240, 255, 0.5), inset 0 0 6px rgba(0, 240, 255, 0.2)';
      }

      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate3d(${shadow.x}px, ${shadow.y}px, 0) translate(-50%, -50%)`;
        shadowRef.current.style.opacity = isHovering ? '0.75' : '0.45';
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('blur', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    rafId = requestAnimationFrame(render);
    document.documentElement.classList.add('cursor-custom');

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('blur', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('cursor-custom');
    };
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
      style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
    >
      {/* 1. Sombra / Trilha luminosa azul neon (fluida e próxima ao cursor) */}
      <div
        ref={shadowRef}
        className="pointer-events-none absolute left-0 top-0 h-10 w-10 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.45) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)',
          filter: 'blur(4px)',
          willChange: 'transform',
        }}
      />

      {/* 2. Círculo envolta (anel azul/ciano neon ágil) */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{
          width: 30,
          height: 30,
          border: '1.5px solid #00f0ff',
          boxShadow: '0 0 12px rgba(0, 240, 255, 0.5), inset 0 0 6px rgba(0, 240, 255, 0.2)',
          willChange: 'transform',
        }}
      />

      {/* 3. Ponto central nítido azul neon */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{
          width: 5,
          height: 5,
          background: '#00f0ff',
          boxShadow: '0 0 8px #00f0ff, 0 0 16px rgba(0, 240, 255, 0.8)',
          willChange: 'transform',
        }}
      />
    </div>,
    document.body
  );
};
