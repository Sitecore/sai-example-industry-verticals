// Below are built-in components that are available in the app, it's recommended to keep them as is
import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';
// end of built-in components

// Components imported from the app itself
import * as Title from 'src/components/title/Title';
import * as Subscribe from 'src/components/subscribe/Subscribe';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
import * as SocialFeed from 'src/components/social-feed/SocialFeed';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as RelatedProducts from 'src/components/related-products/RelatedProducts';
import * as Promo from 'src/components/promo/Promo';
import * as ProductCarouselWrapper from 'src/components/product-carousel-wrapper/ProductCarouselWrapper';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Offers from 'src/components/offers/Offers';
import * as NavigationIcons from 'src/components/navigation-icons/NavigationIcons';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as LanguageSwitcher from 'src/components/language-switcher/LanguageSwitcher';
import * as Image from 'src/components/image/Image';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as Header from 'src/components/header/Header';
import * as Footer from 'src/components/footer/Footer';
import * as Features from 'src/components/features/Features';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ContactForm from 'src/components/contact-form/ContactForm';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as Breadcrumb from 'src/components/breadcrumb/Breadcrumb';
import * as ArticleListing from 'src/components/article-listing/ArticleListing';
import * as ArticleDetails from 'src/components/article-details/ArticleDetails';
import * as ArticleCarousel from 'src/components/article-carousel/ArticleCarousel';
import * as AllProductsCarousel from 'src/components/all-products-carousel/AllProductsCarousel';

// Components must be registered within the map to match the string key with component name in Sitecore
export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', Title],
  ['Subscribe', Subscribe],
  ['SocialFollow', SocialFollow],
  ['SocialFeed', SocialFeed],
  ['RowSplitter', RowSplitter],
  ['RichText', RichText],
  ['RelatedProducts', RelatedProducts],
  ['Promo', Promo],
  ['ProductCarouselWrapper', ProductCarouselWrapper],
  ['PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder],
  ['PageContent', PageContent],
  ['Offers', Offers],
  ['NavigationIcons', NavigationIcons],
  ['Navigation', Navigation],
  ['LinkList', LinkList],
  ['LanguageSwitcher', LanguageSwitcher],
  ['Image', Image],
  ['HeroBanner', HeroBanner],
  ['Header', Header],
  ['Footer', Footer],
  ['Features', Features],
  ['ContentBlock', ContentBlock],
  ['Container', Container],
  ['ContactForm', ContactForm],
  ['ColumnSplitter', ColumnSplitter],
  ['Breadcrumb', Breadcrumb],
  ['ArticleListing', ArticleListing],
  ['ArticleDetails', ArticleDetails],
  ['ArticleCarousel', ArticleCarousel],
  ['AllProductsCarousel', AllProductsCarousel],
]);

export default componentMap;
