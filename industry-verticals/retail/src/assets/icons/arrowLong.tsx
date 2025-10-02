import React from 'react';

interface ArrowLongProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
}

const ArrowLong: React.FC<ArrowLongProps> = ({ width = 39, height = 13, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 39 13"
      fill="none"
      className={className}
    >
      <path
        d="M0.5 6.40049H38M38 6.40049C38 6.40049 33.5119 3.44891 32.6 1.00049M38 6.40049C38 6.40049 34.0324 9.17387 32.6 11.8005"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default ArrowLong;
