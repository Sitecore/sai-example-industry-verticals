import { useEffect } from 'react';

export function useStopResponsiveTransition(delay = 300) {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const classes = document.body.classList;

    function handleResize() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      } else {
        classes.add('stop-transition');
      }

      timer = setTimeout(() => {
        classes.remove('stop-transition');
        timer = null;
      }, delay);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [delay]);
}
