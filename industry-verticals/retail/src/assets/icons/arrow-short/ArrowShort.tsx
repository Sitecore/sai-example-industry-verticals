interface ShortArrowProps {
  className?: string;
}

const ShortArrow = ({ className = '' }: ShortArrowProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 15"
    fill="none"
    className={`inline-block h-4 w-5 ${className}`}
  >
    <path
      d="M1.3042 7.43548H18.5143M18.5143 7.43548C18.5143 7.43548 13.636 4.22725 12.6448 1.56592M18.5143 7.43548C18.5143 7.43548 14.2017 10.45 12.6448 13.305"
      stroke="currentColor"
      strokeWidth="2.17391"
      strokeLinecap="square"
    />
  </svg>
);

export default ShortArrow;
