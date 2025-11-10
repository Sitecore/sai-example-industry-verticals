import React, { JSX } from 'react';
import { User, Heart, ShoppingCart, X } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
// import { MiniCart } from '../non-sitecore/MiniCart';
import { LinkField } from '@sitecore-content-sdk/nextjs';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/shadcn/components/ui/drawer';
import { MiniCart } from '../non-sitecore/MiniCart';

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
  <Drawer direction="right">
    <DrawerTrigger
      className="text-foreground hover:text-accent data-[state=open]:text-accent transition-colors"
      aria-label={label}
    >
      {icon}
    </DrawerTrigger>
    <DrawerContent className="bg-background-muted !w-xl !max-w-full py-5">
      <DrawerClose className="surface-btn !text-foreground mx-5 shrink-0 self-end">
        <X className="size-4" />
      </DrawerClose>
      {children}
    </DrawerContent>
  </Drawer>
);

export const Default = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const showWishlistIcon = !isParamEnabled(props.params.HideWishlistIcon);
  const showAccountIcon = !isParamEnabled(props.params.HideAccountIcon);
  const showCartIcon = !isParamEnabled(props.params.HideCartIcon);

  const { t } = useI18n();

  return (
    <div className={`component navigation-icons ${props?.params?.styles?.trimEnd()}`} id={id}>
      <div className="flex items-center gap-3 p-4 lg:gap-6 [.component.header_&]:justify-end [.component.header_&]:px-0">
        {showAccountIcon && (
          <IconDropdown icon={<User className="size-5" />} label="Account">
            <div className="mx-5 lg:mx-18">
              <h4 className="drawer-heading">My Account</h4>
              <p>{t('account-empty') || 'You are not logged in.'}</p>
            </div>
          </IconDropdown>
        )}

        {showWishlistIcon && (
          <IconDropdown icon={<Heart className="size-5" />} label="Wishlist">
            <div className="mx-5 lg:mx-18">
              <h4 className="drawer-heading">My Wishlist</h4>
              <p>{t('wishlist-empty') || 'Your wishlist is empty.'}</p>
            </div>
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
