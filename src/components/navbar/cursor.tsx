import React, { useState, useEffect } from 'react';
import cursorImage from '../../assets/icons/WhatsApp_Image_2025-04-05_at_18.16.09_9e82b63e-removebg-preview.png';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const target = e.target as HTMLElement;

        const isInteractive =
          ['button', 'a'].includes(target.tagName.toLowerCase()) ||
          target.closest('button, a') !== null ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('btn') ||
          target.classList.contains('button') ||
          getComputedStyle(target).cursor === 'pointer';

        setIsHovering(isInteractive);

        // Forcefully override the cursor on all matching elements
        if (isInteractive) {
          target.style.cursor = 'none';
          const parent = target.closest('a, button');
          if (parent) parent.style.cursor = 'none';
        }
      }
    };

    // Inject global style to hide the cursor on all interactive elements
    const style = document.createElement('style');
    style.innerHTML = `
      *, 
      a, 
      button, 
      [role="button"], 
      .btn, 
      .button,
      [class*="nav"],
      [class*="link"],
      [class*="hover"],
      [class*="cursor-pointer"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    document.body.style.cursor = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[99999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`relative transition-all duration-150 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
      >
        {/* Glowing Magic Light */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-150 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(10px)',
            transform: 'scale(4)',
            width: '32px',
            height: '32px',
          }}
        />

        {/* Image Cursor */}
        <img
          src={cursorImage}
          alt="Custom cursor"
          width={62}
          height={68}
          style={{
            width: '62px',
            height: '68px',
            userSelect: 'none',
            opacity: isHovering ? 0 : 1,
            transition: 'opacity 0.15s ease-out',
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
