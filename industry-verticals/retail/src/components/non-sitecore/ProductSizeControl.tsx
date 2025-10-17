import { Product } from '@/types/products';

interface ProductSizeControlProps {
  sizes?: Product['Size'];
  selectedSize?: Product['Size'][number];
  onSelect: (size: Product['Size'][number]) => void;
}

export const ProductSizeControl = ({
  sizes = [],
  selectedSize,
  onSelect,
}: ProductSizeControlProps) => {
  if (!sizes.length) return null;

  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => onSelect(size)}
          className={`size-8 rounded text-sm transition-colors ${
            selectedSize?.id === size.id
              ? 'bg-accent text-background'
              : 'bg-background-accent hover:bg-accent/20'
          }`}
        >
          {size.fields?.ProductSize?.value ?? '-'}
        </button>
      ))}
    </div>
  );
};
