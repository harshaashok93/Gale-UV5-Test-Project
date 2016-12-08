import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';

export default class NewsListingItem extends UnchainedBaseComponent {

    getRenderedComponent() {
    	return 	<div className="news-listing">
                    {this.props.data.data.map((article, i) => {
    	    			return <div key={i} className="news-listing-card">
    	    						<div className="bgImg" style={{backgroundImage: 'url(' + article.image + ')'}}></div>
    	    						<div className="title">{article.title}</div>
    	    						<div className="readMore"><a href={article.url}>Read More</a></div>
    	    					</div>
    	    		})}
                </div>
    }
}
