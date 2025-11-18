import { ImageField, NextImage as ContentSdkImage } from '@sitecore-content-sdk/nextjs';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Product } from '@/types/products';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const images: ImageField[] = useMemo(
    () =>
      [product.Image1, product.Image2, product.Image3, product.Image4, product.Image5].filter(
        (img): img is ImageField => Boolean(img?.value?.src)
      ),
    [product]
  );

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    const target = imageRefs.current[index];
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = imageRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    imageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (images.length === 0) return null;

  return (
    <>
      {/* Dots */}
      <div className="col-start-1 row-start-1 w-4 -translate-x-full max-lg:hidden">
        {images.length > 1 && (
          <div className="sticky top-0 left-0 mt-4 flex h-screen flex-col items-center justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`size-2 rounded-full transition-all ${
                  idx === activeIndex ? 'bg-accent' : 'bg-background-accent'
                } `}
                aria-label={`Scroll to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image list */}
      <div className="col-start-1 row-start-1 flex w-full flex-col max-lg:hidden">
        {images.map((img, idx) => (
          <div
            key={idx}
            ref={(el) => {
              imageRefs.current[idx] = el;
            }}
            className="scroll-mt-24"
          >
            <ContentSdkImage
              field={img}
              className="bg-background-accent h-screen w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      <div className="lg:hidden">
        <Swiper>
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <ContentSdkImage field={img} className="aspect-square rounded-lg object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
