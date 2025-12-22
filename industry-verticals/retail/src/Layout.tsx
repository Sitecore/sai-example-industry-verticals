/**
 * This Layout is needed for Starter Kit.
 */
import React, { JSX } from 'react';
import Head from 'next/head';
import { Placeholder, Field, Page, ImageField } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'src/components/content-sdk/SitecoreStyles';
import { DesignLibraryLayout } from './DesignLibraryLayout';
import { useRouter } from 'next/router';

interface LayoutProps {
  page: Page;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  metadataTitle?: Field;
  metadataKeywords?: Field;
  metadataDescription?: Field;
  pageSummary?: Field;
  ogImage?: ImageField;
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const router = useRouter();
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const fields = route?.fields as RouteFields;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';

  const metaDescription =
    fields?.metadataDescription?.value?.toString() || fields?.pageSummary?.value?.toString() || '';
  const metaKeywords = fields?.metadataKeywords?.value?.toString() || '';
  const ogTitle = fields?.metadataTitle?.value?.toString() || 'Page';
  const ogImage = fields?.ogImage?.value?.src;
  const ogDescription =
    fields?.metadataDescription?.value?.toString() || fields?.pageSummary?.value?.toString() || '';
  const currentPath = router.asPath;
  const ogUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}${currentPath}`;

  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href="/favicon.ico" />
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="icon" href="/favicon.ico" />
        {ogTitle && <meta property="og:title" content={ogTitle} />}
        {ogDescription && <meta property="og:description " content={ogDescription} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogUrl && <meta property="og:url" content={ogUrl} />}
        {/* Custom meta tag for current relative path - used in Search */}
        {currentPath && <meta name="page-path" content={currentPath} />}
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        {mode.isDesignLibrary ? (
          <DesignLibraryLayout />
        ) : (
          <>
            <header>
              <div id="header">
                {route && <Placeholder name="headless-header" rendering={route} />}
              </div>
            </header>
            <main>
              <div id="content">
                {route && <Placeholder name="headless-main" rendering={route} />}
              </div>
            </main>
            <footer>
              <div id="footer">
                {route && <Placeholder name="headless-footer" rendering={route} />}
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
