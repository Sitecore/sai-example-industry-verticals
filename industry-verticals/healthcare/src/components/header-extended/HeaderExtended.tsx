import { ComponentProps } from '@/lib/component-props';
import {
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

interface Fields {
  LogoLight: ImageField;
  LogoDark: ImageField;
  PhoneLink: LinkField;
  MailLink: LinkField;
}

interface HeaderProps extends ComponentProps {
  fields: Fields;
}

export const DefaultHeaderExtended = (props: HeaderProps) => {
  const id = props.params.RenderingIdentifier;

  return (
    <section
      className={`bg-background dark:bg-background-dark relative py-8 ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div className="container flex items-center gap-2 lg:gap-4">
        <div className="mr-auto max-w-50">
          <Link href={'/'}>
            <ContentSdkImage
              field={props.fields.LogoLight}
              width={345}
              height={45}
              className="dark:hidden"
              priority
            />
            <ContentSdkImage
              field={props.fields.LogoDark}
              width={345}
              height={45}
              className="hidden dark:block"
              priority
            />
          </Link>
        </div>
        <div className="order-last lg:order-0 lg:mr-4 xl:mr-8">
          <Placeholder
            name={`header-extended-nav-${props?.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="mx-2 lg:mx-0">
          <Placeholder
            name={`header-extended-theme-switcher-${props?.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="flex items-center gap-2">
          <ContentSdkLink
            field={props.fields.MailLink}
            className="flex h-6 w-6 items-center justify-center"
          >
            <FontAwesomeIcon icon={faEnvelope} width={16} height={16} />
          </ContentSdkLink>
          <ContentSdkLink
            field={props.fields.PhoneLink}
            className="flex h-6 w-6 items-center justify-center"
          >
            <FontAwesomeIcon icon={faPhone} width={14} height={14} />
          </ContentSdkLink>
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<HeaderProps>(DefaultHeaderExtended);
