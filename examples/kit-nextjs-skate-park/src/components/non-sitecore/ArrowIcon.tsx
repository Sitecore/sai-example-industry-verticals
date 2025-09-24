import React from 'react';

type ArrowIconProps = {
  direction?: 'left' | 'right';
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
};

const ArrowIcon = ({
  direction = 'left',
  size = 24,
  color = '#1E1E1E',
  strokeWidth = 2,
  className,
}: ArrowIconProps) => {
  const paths = {
    left: 'M19.6958 7.43548H2.48568M2.48568 7.43548C2.48568 7.43548 7.36397 4.22725 8.35524 1.56592M2.48568 7.43548C2.48568 7.43548 6.79826 10.45 8.35524 13.305',
    right:
      'M1.3042 7.43548H18.5143M18.5143 7.43548C18.5143 7.43548 13.636 4.22725 12.6448 1.56592M18.5143 7.43548C18.5143 7.43548 14.2017 10.45 12.6448 13.305',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 15) / 21}
      viewBox="0 0 21 15"
      fill="none"
      className={className}
    >
      <path d={paths[direction]} stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" />
    </svg>
  );
};

export default ArrowIcon;
