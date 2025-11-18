import React from 'react';
import { LinkField, Link as ContentSdkLink, Field, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
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
    { icon: faYoutube, field: props.fields.YoutubeLink, key: 'youtube' },
    { icon: faLinkedin, field: props.fields.LinkedinLink, key: 'linkedin' },
  ];

  return (
    <div className={`component social-follow ${props?.params?.styles}`} id={id}>
      <h5 className="text-accent mb-5 text-lg">
        <Text field={props.fields.SocialTitle} />
      </h5>
      <div className="flex flex-col gap-y-4">
        {socialLinks.map(({ icon, field, key }) => (
          <div key={key} className="flex items-center gap-2">
            {field?.value?.href && (
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={icon} className="text-foreground text-xl" />
                <ContentSdkLink field={field} className="text-foreground hover:underline" />
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
