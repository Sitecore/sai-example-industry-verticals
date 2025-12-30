import { ArticleCard } from '@sitecore-search/ui';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/constants/search';
import Link from 'next/link';
import { EntityModel } from '@sitecore-search/react';

type ArticleCardItemCardProps = {
  className?: string;
  displayText?: boolean;
  article: EntityModel;
  onItemClick: React.MouseEventHandler<HTMLAnchorElement>;
  index: number;
};

const ArticleHorizontalItemCard = ({ className = '', article }: ArticleCardItemCardProps) => {
  let validImageUrl = article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL;

  if (validImageUrl.includes('filters:no_upscale')) {
    validImageUrl = undefined;
  }

  return (
    <Link
      href={article.url}
      className="focus:outline-accent"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root
        key={article.id}
        className={`group border-border hover:shadow-accent/20 bg-background relative my-4 flex max-h-52 w-full flex-row flex-nowrap rounded-md border p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
      >
        {validImageUrl && (
          <div className="bg-background-surface w-1/4 flex-none overflow-hidden rounded">
            <Image
              src={validImageUrl}
              className="h-full w-full rounded object-cover object-center lg:h-full lg:w-full"
              alt="alt"
              width={500}
              height={115}
            />
          </div>
        )}
        <div className="grow flex-col pl-4">
          <span aria-hidden="true" className="absolute inset-0"></span>
          <ArticleCard.Title className="text-foreground mb-2 text-lg font-semibold">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-foreground-light mt-3 line-clamp-2 text-sm">
            {article.description}
          </ArticleCard.Subtitle>
          <div className="text-foreground bg-background-accent absolute top-4 right-4 rounded-md px-2.5 py-0.5 text-xs font-semibold">
            {article.type}
          </div>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};
export default ArticleHorizontalItemCard;
