import { Product } from '@/types/products';

interface ProductColorControlProps {
  colors?: Product['Color'];
  selectedColor?: Product['Color'][number];
  onSelect: (color: Product['Color'][number]) => void;
}

export const ProductColorControl = ({
  colors = [],
  selectedColor,
  onSelect,
}: ProductColorControlProps) => {
  if (!colors.length) return null;

  return (
    <div className="flex gap-3">
      {colors.map((color) => (
        <button
          aria-label="Select Color"
          key={color.id}
          onClick={() => onSelect(color)}
          className={`size-8 rounded-full border-2 transition-all ${
            selectedColor?.id === color.id
              ? 'ring-accent ring-2 ring-offset-2'
              : 'border-muted hover:ring-accent/50'
          }`}
          title={color.fields?.Name?.value}
          style={{ backgroundColor: color.fields?.HexCode?.value }}
        />
      ))}
    </div>
  );
};
