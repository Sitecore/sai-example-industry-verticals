import React from 'react';

interface QuantityControlProps {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity = 1,
  onChange,
  min = 1,
  max = 99,
}) => {
  const handleChange = (newQuantity: number) => {
    if (newQuantity < min || newQuantity > max) return;
    onChange(newQuantity);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleChange(quantity - 1)}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`disabled:pointer-events-none disabled:opacity-50`}
      >
        −
      </button>
      <span className={`w-6 text-center`}>{quantity}</span>
      <button
        type="button"
        onClick={() => handleChange(quantity + 1)}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`disabled:pointer-events-none disabled:opacity-50`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
