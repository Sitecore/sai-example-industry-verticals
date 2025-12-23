import React from 'react';
import { LinkField, Link as ContentSdkLink, Field } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

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
  ];

  return (
    <div className="flex space-x-4" id={id}>
      {socialLinks.map(({ icon: Icon, field, key }) => (
        <ContentSdkLink field={field} key={key} className="text-foreground">
          <Icon className="h-5 w-5 cursor-pointer text-accent-gray hover:text-white" />
        </ContentSdkLink>
      ))}
    </div>
  );
};
