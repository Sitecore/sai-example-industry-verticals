'use client';

import React from 'react';
import { useI18n } from 'next-localization';
import type { JSX } from 'react';
import type { ComponentProps } from '@/lib/component-props';
import { Text, type TextField } from '@sitecore-content-sdk/nextjs';

export type ContactFormProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: {
    SubmitText?: TextField;
  };
};

export default function ContactForm(props: ContactFormProps): JSX.Element {
  const { t } = useI18n();
  const { styles, RenderingIdentifier: id } = props.params;

  const FirstName = t('first_name') || 'First name';
  const LastName = t('last_name') || 'Last name';
  const Email = t('email') || 'Email';
  const City = t('city') || 'City';
  const Message = t('message') || 'Message';
  const SubmitText = props.fields?.SubmitText;

  return (
    <section className={`component contact-form group ${styles ?? ''}`} id={id || undefined}>
      <div className="container py-8 md:max-w-2xl md:py-12 lg:max-w-3xl xl:max-w-4xl">
        <form className="grid gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="firstName" className="sr-only">
                {FirstName}
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="form-input"
                placeholder={FirstName}
                autoComplete="given-name"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="lastName" className="sr-only">
                {LastName}
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="form-input"
                placeholder={LastName}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="email" className="sr-only">
                {Email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className="form-input"
                placeholder={Email}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="city" className="sr-only">
                {City}
              </label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                className="form-input"
                placeholder={City}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="message" className="sr-only">
              {Message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="form-textarea"
              placeholder={Message}
            />
          </div>

          <div className="mt-4 text-center">
            <button
              type="submit"
              className="arrow-btn inline-flex cursor-pointer items-center gap-2"
            >
              <Text field={SubmitText} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
