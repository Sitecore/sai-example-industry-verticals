import React from 'react';
import { useTheme } from 'next-themes';

export const Default = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex">
      <button
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`bg-foreground dark:bg-foreground-dark h-6 w-12 rounded-full p-0.5 text-left transition-colors duration-300`}
      >
        <span
          className={`bg-background dark:bg-background-dark inline-block h-5 w-5 rounded-full transition-all duration-300 dark:translate-x-6`}
        />
      </button>
    </div>
  );
};
