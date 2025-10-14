import React from 'react';

interface QuantityControlProps {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isLarge?: boolean;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity = 1,
  onChange,
  min = 1,
  max = 99,
  isLarge,
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
        className={`surface-btn ${isLarge ? 'surface-btn-lg' : ''}`}
      >
        −
      </button>
      <span className={`text-center font-bold ${isLarge ? 'w-8 text-lg' : 'w-6'}`}>{quantity}</span>
      <button
        type="button"
        onClick={() => handleChange(quantity + 1)}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`surface-btn ${isLarge ? 'surface-btn-lg' : ''}`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
