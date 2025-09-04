import React, { JSX } from 'react';
import { User, Heart, ShoppingCart } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';

export type NavigationIconsProps = ComponentProps & {
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
  <DropdownMenu>
    <DropdownMenuTrigger
      className="text-foreground hover:text-accent focus:text-accent transition-colors"
      aria-label={label}
    >
      {icon}
    </DropdownMenuTrigger>
    <DropdownMenuContent>{children}</DropdownMenuContent>
  </DropdownMenu>
);

export const Default = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const showWishlistIcon = !isParamEnabled(props.params.HideWishlistIcon);
  const showAccountIcon = !isParamEnabled(props.params.HideAccountIcon);
  const showCartIcon = !isParamEnabled(props.params.HideCartIcon);

  const { t } = useI18n();

  return (
    <div className={`component navigation-icons ${props?.params?.styles?.trimEnd()}`} id={id}>
      <div className="flex items-center gap-3 lg:gap-5 p-4 [.component.header_&]:px-0 [.component.header_&]:justify-end">
        {showAccountIcon && (
          <IconDropdown icon={<User className="size-5" />} label="Account">
            <p className="p-4">{t('account-empty') || 'You are not logged in.'}</p>
          </IconDropdown>
        )}

        {showWishlistIcon && (
          <IconDropdown icon={<Heart className="size-5" />} label="Wishlist">
            <p className="p-4">{t('wishlist-empty') || 'Your wishlist is empty.'}</p>
          </IconDropdown>
        )}

        {showCartIcon && (
          <IconDropdown icon={<ShoppingCart className="size-5" />} label="Cart">
            <p className="p-4">{t('cart-empty') || 'Your cart is empty.'}</p>
          </IconDropdown>
        )}
      </div>
    </div>
  );
};
