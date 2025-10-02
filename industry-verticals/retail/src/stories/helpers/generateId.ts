/**
 * Helper function to generate unique IDs for Storybook stories
 * Uses Math.random() to create a unique identifier that's safe to use
 * in place of React's useId hook in non-component contexts
 */
export const generateId = (): string => {
  return `story-${Math.random().toString(36).substring(2, 11)}`;
};
