import { useEffect, useState } from 'react';

const breakpoints = {
    0: 'xs',
    660: 'sm',
    990: 'md',
    1280: 'lg',
    1920: 'xl',
};
  

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState('');
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    if (0 < windowSize.width && windowSize.width < 660) {
      setBreakPoint(breakpoints[0]);
    }
    if (660 < windowSize.width && windowSize.width < 990) {
      setBreakPoint(breakpoints[660]);
    }
    if (990 < windowSize.width && windowSize.width < 1280) {
      setBreakPoint(breakpoints[990]);
    }
    if (1280 < windowSize.width && windowSize.width < 1920) {
      setBreakPoint(breakpoints[1280]);
    }
    if (windowSize.width >= 1920) {
      setBreakPoint(breakpoints[1920]);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakpoint;
