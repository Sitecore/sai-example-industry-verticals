import React from 'react';
import { LinkField, Link as ContentSdkLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Fields {
  FacebookLink: LinkField;
  InstagramLink: LinkField;
  TwitterLink: LinkField;
}

type SocialFollowProps = ComponentProps & {
  fields: Fields;
  params: { [key: string]: string };
};

export const Default = (props: SocialFollowProps) => {
  const id = props.params.RenderingIdentifier;

  const socialLinks = [
    { icon: faFacebook, field: props.fields.FacebookLink, key: 'facebook' },
    { icon: faTwitter, field: props.fields.TwitterLink, key: 'twitter' },
    { icon: faInstagram, field: props.fields.InstagramLink, key: 'instagram' },
  ];

  return (
    <div className="flex gap-2" id={id ? id : undefined}>
      {socialLinks.map((link) => {
        return (
          <ContentSdkLink field={link.field} className="social-icon" key={link.key}>
            <FontAwesomeIcon icon={link.icon} width={16} height={16} />
          </ContentSdkLink>
        );
      })}
    </div>
  );
};
