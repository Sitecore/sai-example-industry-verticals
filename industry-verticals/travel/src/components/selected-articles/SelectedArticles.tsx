import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  LinkField,
  Link as ContentSdkLink,
  RichTextField,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { Article } from '@/types/article';

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
  const id = props.params.RenderingIdentifier;
  const styles = props.params.styles || [];

  return (
    <section className={`py-16 ${styles}`} id={id}>
      <div className="container mx-auto px-4">
        {/* title section */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            <ContentSdkText field={props.fields.CarouselTitle} />
          </h2>
          <p className="text-foreground-muted">
            <ContentSdkRichText field={props.fields.CarouselDescription} />
          </p>
        </div>

        {/* carousel section */}
        <div></div>

        {/* cta section */}
        <div className="mt-12 text-center">
          <ContentSdkLink
            field={props.fields.CarouselExplore}
            className="text-foreground"
            aria-label={`link to ${props.fields.CarouselExplore?.value?.text || 'explore more'}`}
          >
            <button type="button" role="presentation" aria-hidden="true" className="simple-btn">
              <ContentSdkLink field={props.fields.CarouselExplore} />
            </button>
          </ContentSdkLink>
        </div>
      </div>
    </section>
  );
};
