import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { Share2 } from 'lucide-react';
import { useI18n } from 'next-localization';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'pinterest' | 'email';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  mediaUrl?: string;
  round?: boolean;
  className?: string;
  iconClassName?: string;
  platforms?: SocialPlatform[];
}

const SocialShare = ({
  url: currentUrl,
  title,
  description = '',
  mediaUrl = '',
  round = false,
  className = '',
  iconClassName = '',
  platforms = ['facebook', 'twitter', 'linkedin', 'pinterest', 'email'],
}: SocialShareProps) => {
  const { t } = useI18n();
  const iconClass = `size-7 md:size-8 rounded-sm ${iconClassName || ''}`;

  const renderSocialButton = (platform: SocialPlatform) => {
    switch (platform) {
      case 'facebook':
        return (
          <FacebookShareButton
            url={currentUrl}
            title={`Share "${title}" on Facebook`}
            aria-label={`Share "${title}" on Facebook`}
            key={platform}
            className="flex gap-2"
          >
            <FacebookIcon className={iconClass} round={round} />
          </FacebookShareButton>
        );
      case 'twitter':
        return (
          <TwitterShareButton
            url={currentUrl}
            title={title}
            aria-label={`Share "${title}" on Twitter`}
            key={platform}
          >
            <TwitterIcon className={iconClass} round={round} />
          </TwitterShareButton>
        );
      case 'linkedin':
        return (
          <LinkedinShareButton
            url={currentUrl}
            title={title}
            summary={description}
            aria-label={`Share "${title}" on LinkedIn`}
            key={platform}
          >
            <LinkedinIcon className={iconClass} round={round} />
          </LinkedinShareButton>
        );
      case 'pinterest':
        return (
          <PinterestShareButton
            url={currentUrl}
            media={mediaUrl}
            aria-label={`Share "${title}" on Pinterest`}
            key={platform}
          >
            <PinterestIcon className={iconClass} round={round} />
          </PinterestShareButton>
        );
      case 'email':
        return (
          <EmailShareButton
            url={currentUrl}
            subject={title}
            body={description}
            aria-label={`Share "${title}" via Email`}
            key={platform}
          >
            <EmailIcon className={iconClass} round={round} />
          </EmailShareButton>
        );
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="simple-btn" aria-label="Share">
            <Share2 /> {t('share_label') || 'Share'}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-none">
          {platforms.map((platform) => (
            <DropdownMenuItem>{renderSocialButton(platform)}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SocialShare;
