// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as ThemeEditor from 'src/components/theme-editor/ThemeEditor';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
import * as SelectedArticles from 'src/components/selected-articles/SelectedArticles';
import * as SectionWrapper from 'src/components/section-wrapper/SectionWrapper';
import * as SearchResults from 'src/components/search-results/SearchResults';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as SuggestionBlock from 'src/components/non-sitecore/search/SuggestionBlock';
import * as Spinner from 'src/components/non-sitecore/search/Spinner';
import * as SortOrder from 'src/components/non-sitecore/search/SortOrder';
import * as SearchResultsComponent from 'src/components/non-sitecore/search/SearchResultsComponent';
import * as SearchPagination from 'src/components/non-sitecore/search/SearchPagination';
import * as SearchFacets from 'src/components/non-sitecore/search/SearchFacets';
import * as ResultsPerPage from 'src/components/non-sitecore/search/ResultsPerPage';
import * as QuestionsAnswers from 'src/components/non-sitecore/search/QuestionsAnswers';
import * as QueryResultsSummary from 'src/components/non-sitecore/search/QueryResultsSummary';
import * as PreviewSearch from 'src/components/non-sitecore/search/PreviewSearch';
import * as HomeHighlighted from 'src/components/non-sitecore/search/HomeHighlighted';
import * as CardViewSwitcher from 'src/components/non-sitecore/search/CardViewSwitcher';
import * as ArticleHorizontalCard from 'src/components/non-sitecore/search/ArticleHorizontalCard';
import * as ArticleCard from 'src/components/non-sitecore/search/ArticleCard';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as Header from 'src/components/header/Header';
import * as GridStatusGauge from 'src/components/gridstatusgauge/GridStatusGauge';
import * as GridDemand from 'src/components/grid-demand/GridDemand';
import * as gridChartData from 'src/components/grid-demand/gridChartData';
import * as gridData from 'src/components/grid-conditions/gridData';
import * as GridConditions from 'src/components/grid-conditions/GridConditions';
import * as Footer from 'src/components/footer/Footer';
import * as Features from 'src/components/features/Features';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as ArticleListing from 'src/components/article-listing/ArticleListing';
import * as ArticleDetails from 'src/components/article-details/ArticleDetails';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['ThemeEditor', { ...ThemeEditor }],
  ['SocialFollow', { ...SocialFollow }],
  ['SelectedArticles', { ...SelectedArticles }],
  ['SectionWrapper', { ...SectionWrapper }],
  ['SearchResults', { ...SearchResults }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['SuggestionBlock', { ...SuggestionBlock }],
  ['Spinner', { ...Spinner }],
  ['SortOrder', { ...SortOrder }],
  ['SearchResultsComponent', { ...SearchResultsComponent }],
  ['SearchPagination', { ...SearchPagination }],
  ['SearchFacets', { ...SearchFacets }],
  ['ResultsPerPage', { ...ResultsPerPage }],
  ['QuestionsAnswers', { ...QuestionsAnswers }],
  ['QueryResultsSummary', { ...QueryResultsSummary }],
  ['PreviewSearch', { ...PreviewSearch }],
  ['HomeHighlighted', { ...HomeHighlighted }],
  ['CardViewSwitcher', { ...CardViewSwitcher }],
  ['ArticleHorizontalCard', { ...ArticleHorizontalCard }],
  ['ArticleCard', { ...ArticleCard }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image }],
  ['HeroBanner', { ...HeroBanner }],
  ['Header', { ...Header, componentType: 'client' }],
  ['GridStatusGauge', { ...GridStatusGauge }],
  ['GridDemand', { ...GridDemand }],
  ['gridChartData', { ...gridChartData }],
  ['gridData', { ...gridData }],
  ['GridConditions', { ...GridConditions }],
  ['Footer', { ...Footer }],
  ['Features', { ...Features, componentType: 'client' }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['ArticleListing', { ...ArticleListing }],
  ['ArticleDetails', { ...ArticleDetails }],
]);

export default componentMap;
