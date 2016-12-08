import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import NewsListingItem from './news_listing_item.jsx';

export default class NewsListing extends UnchainedBaseComponent {
	constructor(props) {
        super(props);
        this.state = {
        	'seemore': false
        }
    }

    defaultListingCount = 6

    seeMoreListings() {
    	this.setState({'seemore': true});
    }

    getArticleList(){
    	const article = this.props.data.listing.resources.article;
    	return article.slice(0, (this.state.seemore ? article.length : this.defaultListingCount));
    }

    getRenderedComponent() {
    	return 	<div className=" main-container">
    				<div className="header">News</div>
		    		{this.getArticleList().map((article, i) => {
		    			const data = {data:[article]};
		    			return <div key={i} className="col-sm-6 col-md-4 col-xs-12">
		    						<NewsListingItem data={data}/>
		    					</div>
		    		})}
		    		{((this.props.data.listing.resources.article.length > this.defaultListingCount) && !this.state.seemore) ? <a className="see-more" href="javascript:void(0)" onClick={this.seeMoreListings.bind(this)}>See more</a> : ""}
		    	</div>
    }
}
