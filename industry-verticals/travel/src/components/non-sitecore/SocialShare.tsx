import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import {
  faFacebookF,
  faLinkedinIn,
  faPinterestP,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  useCustomIcons?: boolean;
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
  useCustomIcons = false,
}: SocialShareProps) => {
  const { t } = useI18n();
  const iconClass = `size-7 md:size-8 ${useCustomIcons ? '' : 'rounded-sm'} ${iconClassName || ''}`;

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
            {useCustomIcons ? (
              <FontAwesomeIcon icon={faFacebookF} className={iconClass} />
            ) : (
              <FacebookIcon className={iconClass} round={round} />
            )}
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
            {useCustomIcons ? (
              <FontAwesomeIcon icon={faTwitter} className={iconClass} />
            ) : (
              <TwitterIcon className={iconClass} round={round} />
            )}
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
            {useCustomIcons ? (
              <FontAwesomeIcon icon={faLinkedinIn} className={iconClass} />
            ) : (
              <LinkedinIcon className={iconClass} round={round} />
            )}
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
            {useCustomIcons ? (
              <FontAwesomeIcon icon={faPinterestP} className={iconClass} />
            ) : (
              <PinterestIcon className={iconClass} round={round} />
            )}
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
            {useCustomIcons ? (
              <FontAwesomeIcon icon={faEnvelope} className={iconClass} />
            ) : (
              <EmailIcon className={iconClass} round={round} />
            )}
          </EmailShareButton>
        );
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {useCustomIcons ? (
        <div className="flex items-center gap-4">
          <p className="text-foreground-light">{t('share_label') || 'Share'}: </p>
          {platforms.map((platform) => renderSocialButton(platform))}
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="simple-btn" aria-label="Share">
              <Share2 /> {t('share_label') || 'Share'}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-none">
            {platforms.map((platform) => (
              <DropdownMenuItem key={platform}>{renderSocialButton(platform)}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default SocialShare;
