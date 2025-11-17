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
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            aria-label="Select Color"
            key={color.id}
            onClick={() => onSelect(color)}
            className={`size-8 rounded-full transition-all ${
              selectedColor?.id === color.id ? 'ring-accent ring ring-offset-2' : ''
            }`}
            title={color.fields?.Name?.value}
            style={{ backgroundColor: color.fields?.HexCode?.value }}
          />
        ))}
      </div>
      <p className="text-foreground-light text-sm">{selectedColor?.fields.Name.value}</p>
    </div>
  );
};
