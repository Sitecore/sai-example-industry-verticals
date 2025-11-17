'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useI18n } from 'next-localization';

export const ParentPathLink = ({ text }: { text: string }) => {
  const pathname = usePathname();
  const { t } = useI18n();

  // Split path into segments and remove the last one
  const segments = pathname?.split('/').filter(Boolean);
  segments?.pop();

  // Construct parent path
  const parentPath = '/' + segments?.join('/');

  return (
    <Link href={parentPath || '/'} className="action-btn">
      <ChevronLeft className="size-4" />
      {text || t('back_button_label') || 'Back'}
    </Link>
  );
};
