import React, { JSX } from 'react';
import { User, Heart, ShoppingCart, X } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { MiniCart } from '../non-sitecore/MiniCart';
import { LinkField } from '@sitecore-content-sdk/nextjs';

export type NavigationIconsProps = ComponentProps & {
  fields: {
    CheckoutPage: LinkField;
    AccountPage: LinkField;
    WishlistPage: LinkField;
  };
  params: { [key: string]: string };
};

const IconDropdown = ({
  icon,
  label,
  children,
}: {
  icon: JSX.Element;
  label: string;
} & React.PropsWithChildren) => (
  <Popover>
    <PopoverTrigger
      className="text-foreground hover:text-accent data-[state=open]:text-accent transition-colors"
      aria-label={label}
    >
      {icon}
    </PopoverTrigger>
    <PopoverContent className="flex w-xl flex-col">
      <PopoverClose className="surface-btn !text-foreground shrink-0 self-end">
        <X className="size-4" />
      </PopoverClose>
      <div className="">{children}</div>
    </PopoverContent>
  </Popover>
);

export const Default = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const showWishlistIcon = !isParamEnabled(props.params.HideWishlistIcon);
  const showAccountIcon = !isParamEnabled(props.params.HideAccountIcon);
  const showCartIcon = !isParamEnabled(props.params.HideCartIcon);

  const { t } = useI18n();

  return (
    <div className={`component navigation-icons ${props?.params?.styles?.trimEnd()}`} id={id}>
      <div className="flex items-center gap-3 p-4 lg:gap-5 [.component.header_&]:justify-end [.component.header_&]:px-0">
        {showAccountIcon && (
          <IconDropdown icon={<User className="size-5" />} label="Account">
            <p>{t('account-empty') || 'You are not logged in.'}</p>
          </IconDropdown>
        )}

        {showWishlistIcon && (
          <IconDropdown icon={<Heart className="size-5" />} label="Wishlist">
            <p>{t('wishlist-empty') || 'Your wishlist is empty.'}</p>
          </IconDropdown>
        )}

        {showCartIcon && (
          <IconDropdown icon={<ShoppingCart className="size-5" />} label="Cart">
            <MiniCart showWishlist={showWishlistIcon} checkoutPage={props.fields?.CheckoutPage} />
          </IconDropdown>
        )}
      </div>
    </div>
  );
};
