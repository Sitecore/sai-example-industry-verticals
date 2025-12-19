import React from 'react';
import { LinkField, Link as ContentSdkLink, Field } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react';

interface Fields {
  SocialTitle: Field<string>;
  FacebookLink: LinkField;
  YoutubeLink: LinkField;
  InstagramLink: LinkField;
  TwitterLink: LinkField;
  LinkedinLink: LinkField;
  PinterestLink: LinkField;
}

type SocialFollowProps = ComponentProps & {
  fields: Fields;
  params: { [key: string]: string };
};

export const Default = (props: SocialFollowProps) => {
  const id = props.params.RenderingIdentifier;

  const socialLinks = [
    { icon: Facebook, field: props.fields.FacebookLink, key: 'facebook' },
    { icon: Twitter, field: props.fields.TwitterLink, key: 'twitter' },
    { icon: Instagram, field: props.fields.InstagramLink, key: 'instagram' },
    { icon: Youtube, field: props.fields.YoutubeLink, key: 'youtube' },
    { icon: Linkedin, field: props.fields.LinkedinLink, key: 'linkedin' },
  ];

  return (
    <div className="flex items-center space-x-2" id={id}>
      <span className="text-sm text-gray-500">Share:</span>
      {socialLinks.map(({ icon: Icon, field, key }) => (
        <ContentSdkLink
          field={field}
          key={key}
          className="text-foreground"
          aria-label={`Share this on ${key}`}
        >
          <button
            type="button"
            role="presentation"
            aria-hidden="true"
            tabIndex={-1}
            className="bg-primary text-primary-foreground hover:bg-primary/90 items-center justify-center rounded-md p-2 transition-all outline-none hover:bg-gray-100"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
          </button>
        </ContentSdkLink>
      ))}
    </div>
  );
};

export const Follow = (props: SocialFollowProps) => {
  const id = props.params.RenderingIdentifier;

  const socialLinks = [
    { icon: Facebook, field: props.fields.FacebookLink, key: 'facebook' },
    { icon: Twitter, field: props.fields.TwitterLink, key: 'twitter' },
    { icon: Instagram, field: props.fields.InstagramLink, key: 'instagram' },
    { icon: Youtube, field: props.fields.YoutubeLink, key: 'youtube' },
    { icon: Linkedin, field: props.fields.LinkedinLink, key: 'linkedin' },
  ];

  return (
    <div className="flex items-center space-x-2" id={id}>
      <button className="simple-btn">
        <span className="text-md font-bold text-black">Follow</span>
      </button>
      {socialLinks.map(({ icon: Icon, field, key }) => (
        <ContentSdkLink
          field={field}
          key={key}
          className="text-foreground"
          aria-label={`Follow us on ${key}`}
        >
          <button
            type="button"
            role="presentation"
            aria-hidden="true"
            tabIndex={-1}
            className="bg-primary text-primary-foreground hover:bg-primary/90 items-center justify-center rounded-md p-2 transition-all outline-none hover:bg-gray-100"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
          </button>
        </ContentSdkLink>
      ))}
    </div>
  );
};
