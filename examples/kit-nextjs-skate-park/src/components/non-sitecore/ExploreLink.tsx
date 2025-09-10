import { ArrowLong } from '@/assets/icons/arrow-long/arrow-long';
import { Link, LinkField } from '@sitecore-content-sdk/nextjs';

interface ButtonProps {
  linkText: LinkField;
}

export const ExploreLink = (props: ButtonProps) => {
  return (
    <div className="text-md inline-flex flex-col w-fit">
      <div className="border-b-[1px] border-b-accent leading-8 text-accent gap-3.5 inline-flex items-center justify-start">
        <Link field={props.linkText} />
        <ArrowLong />
      </div>
    </div>
  );
};
