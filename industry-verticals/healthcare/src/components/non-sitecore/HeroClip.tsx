import React from 'react';

const HeroClip = () => (
  <div className="text-background dark:text-background-dark absolute inset-0 -z-1 h-full w-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1601.7 992.77"
      preserveAspectRatio="none"
      className="h-full w-full object-cover"
      overflow={'visible'}
    >
      <g fill="currentColor">
        <path
          d="M.83,636.38s121.41,339.4,484.75,353.09,578.3-16.53,644.58-66.01,469.84-402.66,469.84-402.66l1.7-520.8L0,.05l.83,636.33Z"
          style={{
            filter: 'drop-shadow(var(--shadow-soft))',
          }}
        />
      </g>
    </svg>
  </div>
);

export default HeroClip;
