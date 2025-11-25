// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as ThemeSwitcher from 'src/components/theme-switcher/ThemeSwitcher';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Reviews from 'src/components/reviews/Reviews';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as HeaderExtended from 'src/components/header-extended/HeaderExtended';
import * as Footer from 'src/components/footer/Footer';
import * as Features from 'src/components/features/Features';
import * as DoctorsListing from 'src/components/doctors-listing/DoctorsListing';
import * as DoctorDetails from 'src/components/doctor-details/DoctorDetails';
import * as ContentSection from 'src/components/content-section/ContentSection';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['ThemeSwitcher', { ...ThemeSwitcher }],
  ['SocialFollow', { ...SocialFollow }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Reviews', { ...Reviews }],
  ['Promo', { ...Promo, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image }],
  ['HeroBanner', { ...HeroBanner, componentType: 'client' }],
  ['HeaderExtended', { ...HeaderExtended }],
  ['Footer', { ...Footer, componentType: 'client' }],
  ['Features', { ...Features, componentType: 'client' }],
  ['DoctorsListing', { ...DoctorsListing }],
  ['DoctorDetails', { ...DoctorDetails }],
  ['ContentSection', { ...ContentSection, componentType: 'client' }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
]);

export default componentMap;
