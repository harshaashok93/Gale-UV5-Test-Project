import componentRegistry from 'unchained_ui/unchained_ui/themes/default/components/component_registry.jsx';

import ProductDetails from './dynamic/resources/product_details/product_details.jsx';
import ProductListing from './dynamic/resource_listing/product_listing/product_listing.jsx';
import Social from './dynamic/social/social_links.jsx';
import FeaturedCategory from './dynamic/featured_category/featured_category.jsx';
import NewsListing from './dynamic/resource_listing/product_listing/news_listing.jsx';
import NewsListingItem from './dynamic/resource_listing/product_listing/news_listing_item.jsx';
import RelatedArticleCarousel from './dynamic/resource_listing/product_listing/news_related.jsx';
import SocialPost from './dynamic/social_post/social_post.jsx';
import SocialShare from './dynamic/social/social_links.jsx';
import StoreLocator from './dynamic/store_locator/store_locator.jsx';
import ResourceCard from './dynamic/resources/resource_card/resource_card.jsx';
import LiveCleanLinks from './dynamic/links/link.jsx';
import LiveCleanLinkCollection from './dynamic/links/link_collection.jsx';
import Search from './dynamic/search/search.jsx';
import MostArticles from './dynamic/most_read_articles/most_articles.jsx'
import PublishedDate from './dynamic/resources/published_date/published_date.jsx'
import Tabs from './dynamic/our_story/tabs.jsx'

// List of components
var COMPONENT_REGISTRY = {
    'product_details':(component_data) => {
        return <ProductDetails data={component_data}/>;
    },
    'product_listing':(component_data) => {
        return <ProductListing data={component_data}/>;
    },
    'hidden_row':(component_data) => {
        return <HiddenRow data={component_data}/>;
    },
    'social_links':(component_data) =>{
        return <Social data={component_data} />;
    },
    'featured_category':(component_data) =>{
        return <FeaturedCategory data={component_data} />;
    },
    'news_listing':(component_data) => {
        return <NewsListing data={component_data}/>;
    },
    'news_listing_item':(component_data) => {
        return <NewsListingItem data={component_data}/>;
    },
    'news_related':(component_data) => {
        return <RelatedArticleCarousel data={component_data}/>;
    },
    'social_post' : (component_data) =>{
        return <SocialPost data={component_data} />
    },
    'social_share' : (component_data) =>{
        return <SocialShare data={component_data} />
    },
    'store_locator' : (component_data) =>{
        return <StoreLocator data={component_data} />
    },
    'resource_card' : (component_data) => {
        return <ResourceCard data={component_data} />
    },
    'link': (component_data) =>{
        return <LiveCleanLinks data={component_data}/>;
    },
    'link_collection': (component_data) => {
        return <LiveCleanLinkCollection data={component_data} />
    },
    'search': (component_data) => {
        return <Search data={component_data} />
    },
    'most_articles': (component_data) => {
        return <MostArticles data={component_data} />
    },
    'published_date' : (component_data) =>{
        return <PublishedDate data = {component_data} />
    },
    'tabs':(component_data) => {
        return <Tabs data = {component_data} />
    }
}

// Register the components
var componentList = componentRegistry(COMPONENT_REGISTRY)

// Make them available
export default componentList
