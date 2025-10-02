export const resolveBackgroundClassFromStyles = (styles: string = ''): string => {
  const styleToClassMap: Record<string, string> = {
    'container-white-background': 'bg-background',
    'container-gold-background': 'bg-background-accent',
    'container-gray-background': 'bg-background-muted',
  };
  const priority = Object.keys(styleToClassMap);
  const matchedStyle = priority.find((style) => styles.includes(style));
  return styleToClassMap[matchedStyle!] || 'bg-background'; // default
};
