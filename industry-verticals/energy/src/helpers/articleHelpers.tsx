import { ArticleFields } from '@/types/article';

export const getArticlesCountsByCategory = (articles: { fields: ArticleFields }[]) =>
  Object.values(
    articles.reduce(
      (acc, article) => {
        const name = article.fields.Category?.fields?.Category?.value;

        if (name) {
          acc[name] = {
            name,
            count: (acc[name]?.count || 0) + 1,
            icon: article.fields.Category?.fields?.CategoryIcon,
          };
        }

        return acc;
      },
      {} as Record<string, { name: string; count: number; icon: any }>
    )
  );
