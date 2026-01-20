import React from 'react';
import { LinkField, Link as ContentSdkLink, Field } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    { icon: faFacebookF, field: props.fields.FacebookLink, key: 'facebook' },
    { icon: faTwitter, field: props.fields.TwitterLink, key: 'twitter' },
    { icon: faInstagram, field: props.fields.InstagramLink, key: 'instagram' },
    { icon: faLinkedinIn, field: props.fields.LinkedinLink, key: 'linkedin' },
    { icon: faYoutube, field: props.fields.YoutubeLink, key: 'youtube' },
  ];

  return (
    <div className="flex space-x-4" id={id}>
      {socialLinks.map(({ icon, field, key }) => (
        <ContentSdkLink field={field} key={key}>
          <FontAwesomeIcon
            icon={icon}
            className="text-accent-light hover:text-background h-5 w-5 cursor-pointer"
          />
        </ContentSdkLink>
      ))}
    </div>
  );
};
