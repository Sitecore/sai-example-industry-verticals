import { newsDateFormatter } from '@/helpers/dateHelper';
import { ArticleFields } from '@/types/article';
import {
  NextImage as ContentSdkImage,
  DateField,
  useSitecore,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface ArticlesProps {
  fields: ArticleFields;
  id: string;
}

const Article = ({ fields, id }: ArticlesProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg shadow-md" key={id}>
      <div className="bg-background-accent relative h-72">
        <ContentSdkImage field={fields?.Image} className="h-full w-full object-cover" />
      </div>

      <div className="flex grow flex-col px-5 py-10">
        <div className="mb-3 flex items-center justify-end gap-2 text-sm">
          {(fields?.PublishedDate?.value || isPageEditing) && (
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <DateField
                tag="p"
                className="news-date"
                field={fields?.PublishedDate}
                render={newsDateFormatter}
              />
            </div>
          )}
        </div>
        {(fields?.Title?.value || isPageEditing) && (
          <div className="mb-3 font-bold wrap-break-word hyphens-auto">
            <ContentSdkText field={fields?.Title} />
          </div>
        )}
        {(fields?.ShortDescription?.value || isPageEditing) && (
          <div className="mb-4 grow text-sm leading-relaxed wrap-break-word hyphens-auto">
            <ContentSdkRichText field={fields?.ShortDescription} />
          </div>
        )}
        <div className="flex items-center justify-between border-t pt-4">
          {(fields?.PublishedDate?.value || isPageEditing) && (
            <div className="flex items-center gap-1 text-sm">
              <User className="size-3" />
              <ContentSdkText field={fields?.Author?.fields?.AuthorName} tag="p" />
            </div>
          )}
          <button className="hover:text-accent flex items-center gap-2 text-sm font-medium transition-colors">
            Read More
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Article;
