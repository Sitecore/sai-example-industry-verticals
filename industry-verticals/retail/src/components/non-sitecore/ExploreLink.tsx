import { ArrowLong } from '@/assets/icons/arrow-long/arrow-long';
import { Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ButtonType } from '@/types/enums';

interface ButtonProps {
  linkText?: LinkField;
  buttonText?: TextField;
  buttonType?: ButtonType;
}

export const ExploreLink = (props: ButtonProps) => {
  const isText = props.buttonType === ButtonType.TEXT;
  const linkTextValue = props.linkText?.value?.text ?? props.linkText?.value?.title ?? '';

  return (
    <div className="text-md inline-flex w-fit flex-col">
      <div className="border-b-accent text-accent inline-flex items-center justify-start gap-3.5 border-b-[1px] leading-8">
        {isText ? (
          <button type="submit" className="inline-flex cursor-pointer items-center gap-2">
            <Text field={props.buttonText} />
            <ArrowLong />
          </button>
        ) : (
          <Link field={props.linkText!} className="inline-flex cursor-pointer items-center gap-2">
            <span>{linkTextValue}</span>
            <ArrowLong />
          </Link>
        )}
      </div>
    </div>
  );
};
