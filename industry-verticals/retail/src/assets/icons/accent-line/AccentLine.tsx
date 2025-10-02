const AccentLine = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 441 25"
      fill="none"
      className={`mt-1 block h-[0.5em] w-[7ch] max-w-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className} text-accent`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 22C93.4059 7.66215 306.974 -12.4108 438 22"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AccentLine;
