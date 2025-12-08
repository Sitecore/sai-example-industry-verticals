'use client';

import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  LinkField,
  Link as ContentSskLink,
  RichTextField,
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text,
} from '@sitecore-content-sdk/nextjs';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Article } from '@/types/article';
import Link from 'next/link';
import { cn } from '@/shadcn/lib/utils';
import { CommonStyles, LayoutStyles } from '@/types/styleFlags';

interface Fields {
  CarouselTitle: Field<string>;
  CarouselDescription: RichTextField;
  CarouselExplore: LinkField;
  Articles: Array<Article>;
}

export type CarouselProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const id = props.params.RenderingIdentifier;
  const articles = props.fields?.Articles || [];
  const slidesPerViewByArticleSize = articles.length <= 2 ? 1 : 2;
  const multipleArticles = articles.length > 1;
  const isReversed = props?.params?.styles?.includes(LayoutStyles.Reversed);
  const swiperFirstRef = useRef<SwiperClass | null>(null);
  const swiperSecondRef = useRef<SwiperClass | null>(null);
  const hideAccentLine = props.params.styles?.includes(CommonStyles.HideAccentLine);

  const handleNext = () => {
    if (currentIndex < articles.length - 1) {
      swiperFirstRef.current?.slideNext();
      swiperSecondRef.current?.slideNext();
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      swiperFirstRef.current?.slidePrev();
      swiperSecondRef.current?.slidePrev();
      setCurrentIndex(currentIndex - 1);
    }
  };

  const containerAlignment = isReversed ? 'container-align-left' : 'container-align-right';

  const flexDirectionClass = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';

  const translateClass =
    articles.length > 1 ? (isReversed ? 'lg:-translate-x-3' : 'lg:translate-x-3') : '';

  const aspectClass = articles.length >= 2 ? 'lg:aspect-2/3' : 'lg:aspect-2/1';

  const gridItemClass = cn(
    'col-span-1',
    articles.length === 1 ? 'lg:col-span-full' : 'lg:col-span-1',
    isReversed && 'lg:order-2'
  );

  return (
    <section className={`${props.params.styles} py-20`} id={id ? id : undefined}>
      <div className={cn(containerAlignment, 'relative overflow-hidden')}>
        <div
          className={cn('flex', 'flex-col', flexDirectionClass, 'items-center', 'w-full', 'gap-10')}
        >
          <div className="w-full space-y-5 md:w-1/3">
            <h2 className="inline-block max-w-md">
              <Text field={props.fields.CarouselTitle} />
              {!hideAccentLine && <AccentLine className="w-full max-w-xs" />}
            </h2>

            <div className="max-w-md">
              <ContentSdkRichText field={props.fields.CarouselDescription} />
            </div>

            <ContentSskLink field={props.fields.CarouselExplore} className="arrow-btn" />
          </div>

          <div className={cn('w-full', 'md:w-2/3', 'lg:transform', translateClass)}>
            <div className="relative overflow-hidden">
              <div className={`grid grid-cols-1 gap-5 lg:grid-cols-3`}>
                <div className={gridItemClass}>
                  <div className="relative">
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      slidesPerView={1}
                      initialSlide={0}
                      loop={true}
                      autoplay={false}
                      className="article-carousel-first"
                      autoHeight={true}
                      pagination={{
                        el: '.article-carousel-pagination',
                        clickable: false,
                      }}
                      allowTouchMove={false}
                      simulateTouch={false}
                      onSwiper={(swiper) => {
                        swiperFirstRef.current = swiper;
                      }}
                    >
                      {articles.map((article) => {
                        return (
                          <SwiperSlide key={article.id}>
                            <Link href={article.url}>
                              <div className={`overflow-hidden rounded-lg`}>
                                <ContentSdkImage
                                  field={article.fields.Image}
                                  className={cn(
                                    'aspect-square h-full w-full object-cover',
                                    aspectClass
                                  )}
                                />
                              </div>

                              {article.fields?.Title?.value && (
                                <div className="absolute bottom-0 z-20 m-3 max-w-full xl:m-4">
                                  <div className="flex items-end">
                                    <div className="bg-background/75 max-w-full space-y-1 overflow-hidden p-5 text-ellipsis">
                                      <div className="flex items-center gap-1 overflow-hidden text-xs font-extralight text-ellipsis whitespace-nowrap">
                                        <div className="h-[1px] w-7 bg-black"></div>
                                        <div className="text-foreground/75">
                                          <Text
                                            editable={false}
                                            field={article.fields?.Category?.fields?.Category}
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <h6 className="line-clamp-2 max-w-full overflow-hidden wrap-anywhere text-ellipsis">
                                          <Text editable={false} field={article.fields?.Title} />
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="bg-accent inline-block p-2">
                                      <ArrowRight
                                        size={16}
                                        strokeWidth={1}
                                        className="text-background"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Link>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>

                {multipleArticles && (
                  <div className="lg:col-span-2">
                    <div className="flex h-full flex-col">
                      <div className="hidden flex-shrink-0 lg:block">
                        <Swiper
                          modules={[Autoplay]}
                          slidesPerView={slidesPerViewByArticleSize}
                          loop={true}
                          spaceBetween={20}
                          autoplay={false}
                          allowTouchMove={false}
                          simulateTouch={false}
                          className="article-carousel-second"
                          onSwiper={(swiper) => {
                            swiperSecondRef.current = swiper;
                          }}
                          initialSlide={1}
                          breakpoints={{
                            640: {
                              slidesPerView: 1,
                              spaceBetween: 20,
                            },
                            1024: {
                              slidesPerView: slidesPerViewByArticleSize,
                              spaceBetween: 20,
                            },
                          }}
                        >
                          {articles.map((article) => (
                            <SwiperSlide key={article.id}>
                              <Link href={article.url}>
                                <div className="overflow-hidden rounded-lg">
                                  <ContentSdkImage
                                    field={article.fields.Image}
                                    className={`h-full w-full object-cover ${articles.length >= 3 ? 'aspect-4/5' : 'aspect-[3/1.8]'}`}
                                  />
                                </div>
                              </Link>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <div className={`mx-auto my-auto`}>
                        <div className="inline-flex flex-row items-center gap-5">
                          <div className="flex items-center">
                            <button
                              className={`swiper-btn-prev text-accent ${
                                currentIndex === 0 && 'article-carousel-btn-disabled'
                              }`}
                              disabled={currentIndex === 0}
                              name="previous-article"
                              aria-label="Previous article"
                              onClick={handlePrev}
                            >
                              <ChevronLeft />
                            </button>
                          </div>
                          <div className="article-carousel-pagination flex flex-wrap"></div>
                          <div className="flex items-center">
                            <button
                              disabled={currentIndex === articles.length - 1}
                              className={`swiper-btn-prev text-accent ${
                                currentIndex === articles.length - 1 &&
                                'article-carousel-btn-disabled'
                              }`}
                              name="next-article"
                              aria-label="Next article"
                              onClick={handleNext}
                            >
                              <ChevronRight />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
