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
        <ContentSdkLink field={field} key={key} className="text-foreground">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 items-center justify-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100 transition-all outline-none">
              <Icon className="h-4 w-4 cursor-pointer text-foreground" />
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
        <span className="font-bold text-md text-black">Follow</span>
      </button>
      {socialLinks.map(({ icon: Icon, field, key }) => (
        <ContentSdkLink field={field} key={key} className="text-foreground">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 items-center justify-center gap-2 rounded-md p-2 text-sm font-medium transition-all outline-none hover:bg-gray-100">
            <Icon className="text-foreground h-4 w-4 cursor-pointer" />
          </button>
        </ContentSdkLink>
      ))}
    </div>
  );
};
