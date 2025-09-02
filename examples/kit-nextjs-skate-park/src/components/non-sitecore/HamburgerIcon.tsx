import React from 'react';

interface HamburgerIconProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, className = '', ...props }) => (
  <div
    className={`relative w-6 h-4 cursor-pointer ${className}`}
    role="button"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    tabIndex={0}
    {...props}
  >
    <span
      className={`absolute left-0 right-0 h-0.5 bg-foreground transition-all duration-300 ease-out
        ${isOpen ? 'top-1/2 rotate-45' : 'top-0'}
      `}
    />
    <span
      className={`absolute left-0 right-0 h-0.5 bg-foreground transition-all duration-100 ease-out
        ${isOpen ? 'opacity-0' : 'top-1/2'}
      `}
    />
    <span
      className={`absolute left-0 right-0 h-0.5 bg-foreground transition-all duration-300 ease-out
        ${isOpen ? 'top-1/2 -rotate-45' : 'top-full'}
      `}
    />
  </div>
);

export default HamburgerIcon;
