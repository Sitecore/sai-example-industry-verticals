import { Placeholder } from '@sitecore-content-sdk/nextjs';
import React, { JSX } from 'react';
import { extractMediaUrl } from '@/helpers/extractMediaUrl';
import { ComponentProps } from 'lib/component-props';

interface ContainerProps extends ComponentProps {
  params: ComponentProps['params'] & {
    BackgroundImage?: string;
    DynamicPlaceholderId: string;
  };
}

const Container = ({ params, rendering }: ContainerProps): JSX.Element => {
  const {
    styles,
    RenderingIdentifier: id,
    BackgroundImage: backgroundImage,
    DynamicPlaceholderId,
  } = params;
  const phKey = `container-${DynamicPlaceholderId}`;

  const mediaUrl = extractMediaUrl(backgroundImage);
  let backgroundStyle: { [key: string]: string } = {};
  if (mediaUrl) {
    backgroundStyle = {
      backgroundImage: `url('${mediaUrl}')`,
    };
  }

  return (
    <div className={`component container-default ${styles}`} id={id}>
      <div className="component-content" style={backgroundStyle}>
        <div className="row">
          <Placeholder name={phKey} rendering={rendering} />
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ContainerProps): JSX.Element => {
  const styles = props.params?.styles?.split(' ');

  return styles?.includes('container') ? (
    <div className="container-wrapper">
      <Container {...props} />
    </div>
  ) : (
    <Container {...props} />
  );
};
