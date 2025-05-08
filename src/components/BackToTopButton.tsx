'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        fixed bottom-8 right-8 z-50
        bg-primary hover:bg-primary/90 text-primary-foreground 
        p-3 rounded-full shadow-lg 
        transition-opacity duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      `}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
} 