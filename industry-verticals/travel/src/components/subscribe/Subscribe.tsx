import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { useI18n } from 'next-localization';

export type SubscribeBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: {
    Title: Field<string>;
    HelperText?: RichTextField;
  };
};

export const Default = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const { t } = useI18n();

  return (
    <section
      className={`component subscribe-banner group py-10 md:py-14 ${styles ?? ''}`}
      id={id || undefined}
    >
      <div className="container max-w-4xl md:max-w-5xl md:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-foreground leading-tight font-bold">
            <Text field={props.fields?.Title} />
          </h3>

          <div className="text-foreground text-center text-base leading-tight">
            <RichText field={props.fields?.HelperText} />
          </div>

          <form className="mt-2 w-full max-w-md" action="">
            <label htmlFor="subscribe-email" className="sr-only">
              {t('your_email_label') || 'your@email.com'}
            </label>

            <div className="relative flex items-center gap-3">
              <input
                id="subscribe-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={t('your_email') || 'Your email address'}
                className="bg-background ring-foreground/20 focus:ring-foreground/40 !text-foreground placeholder:text-foreground/70 h-9 w-full rounded-md ps-5 ring-1 focus:ring-2 focus:outline-none md:h-10"
              />

              <button type="submit" className="btn-accent">
                {t('button_text') || 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
