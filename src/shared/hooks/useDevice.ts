import { useState, useEffect } from 'react';

export const useDevice = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      if (window.screen.width <= 425) {
        setIsMobile(window.matchMedia('(pointer:coarse)').matches);
      }
    };
    console.log('mobile', isMobile);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return isMobile;
};
