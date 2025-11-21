import React from 'react';

type StripedBlobProps = {
  shape?: 'blob' | 'circle';
  fill?: 'stripe' | 'solid';
  size?: 'sm' | 'md' | 'lg' | 'full';
  colorScheme?: 'primary' | 'secondary' | 'tertiary';
  mirrored?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const BlobAccent = ({
  shape = 'blob',
  fill = 'stripe',
  size = 'md',
  colorScheme = 'primary',
  mirrored,
  className,
}: StripedBlobProps) => {
  const sizeMap: Record<NonNullable<StripedBlobProps['size']>, string> = {
    sm: 'w-26',
    md: 'w-64 max-w-full sm:max-w-1/2 lg:max-w-1/3',
    lg: 'w-128 max-w-full sm:max-w-1/2 lg:max-w-1/3',
    full: 'w-full',
  };

  const colorMap: Record<NonNullable<StripedBlobProps['colorScheme']>, string> = {
    primary: 'text-background-secondary-dark dark:text-foreground-dark',
    secondary: 'text-background-secondary dark:text-background-secondary-dark',
    tertiary: 'text-background-tertiary dark:text-background-tertiary-dark',
  };

  return (
    <div className={`${colorMap[colorScheme]} ${sizeMap[size]} ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 465.52 462.09"
        aria-hidden="true"
        overflow="visible"
        className={`${mirrored ? 'rotate-x-180 rotate-y-180' : ''}`}
      >
        <defs>
          <clipPath id="clip-blob">
            <path
              fill="none"
              d="M25.38,349.03C5.1,241.47-28.44,154.39,45.93,46.57c74.36-107.82,271.47-11.09,393,113.88,121.53,124.97-210.53,295.66-252.88,299.14s-132.41,19.58-160.66-110.55Z"
            />
          </clipPath>
          <clipPath id="clip-circle">
            <circle cx="232.76" cy="231.05" r="231" />
          </clipPath>
        </defs>
        {fill === 'stripe' ? (
          <g clipPath={`url(#clip-${shape})`}>
            {Array.from({ length: 30 }).map((_, index) => {
              const x = -394.81 + index * 25.93;
              const rotate = -60;
              const translateX = -262 + index * 12.81;
              const translateY = 18.4 + index * 22.37;
              const transform = `translate(${translateX} ${translateY}) rotate(${rotate})`;

              return (
                <rect
                  key={index}
                  x={x}
                  y="237.43"
                  width="559.75"
                  height="1"
                  fill="currentColor"
                  transform={transform}
                />
              );
            })}
          </g>
        ) : shape === 'blob' ? (
          <path
            d="M25.38,349.03C5.1,241.47-28.44,154.39,45.93,46.57c74.36-107.82,271.47-11.09,393,113.88,121.53,124.97-210.53,295.66-252.88,299.14s-132.41,19.58-160.66-110.55Z"
            fill="currentColor"
            style={{
              filter: 'drop-shadow(var(--shadow-soft))',
            }}
          />
        ) : (
          <circle
            cx="232.76"
            cy="231.05"
            r="231"
            fill="currentColor"
            style={{
              filter: 'drop-shadow(var(--shadow-soft))',
            }}
          />
        )}
      </svg>
    </div>
  );
};

export default BlobAccent;
