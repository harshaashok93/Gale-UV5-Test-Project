import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';

export default class Search extends UnchainedBaseComponent {

    constructor(props){
        super(props);
        this.state = {
            results : props.data,
            showMore : true,
            limit : 6,
        }
    }

    showMore(){
        this.setState({
            showMore : false,
            limit : this.props.data.length
        })
    }

    getQueryParam(){
        const qstring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < qstring.length; i++) {
            var urlparam = qstring[i].split('=');
            if (urlparam[0] === "q") {
                return decodeURIComponent(urlparam[1].split("+").join(" "));
            }
        }
    }

    seeMoreButton(){
        if (!this.state.showMore){
            return null
        }else{
            return (
              <button onClick={this.showMore.bind(this)}>See all</button>
            );
        }
    }

    getIcon(icon, video){
        if(icon === "product" && !video){
            return "/static/img/Leaf_Icon@2x.png.png"
        }else if(icon === "article" && !video){
            return "/static/img/Document_Icon@2x.png.png"
        }else if(icon === "article" && video){
            return "/static/img/Movie_Icon@2x.png.png"
        }else{
            return
        }
    }

     getResults(results){
        return results.map((search, i) =>
                    <div className="search-wrap" key={i}>
                        <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12 search-img">
                            <img src={search.images ? search.images[0].url : search.image} alt={search.name}/>
                        </div>
                        <div className="col-md-9 col-lg-9 col-xs-12 col-sm-12 description">
                            <h2>
                            {search.name ? search.name : search.title}
                            <div className="type-icon">
                                <img src={this.getIcon(search.type, search.video_url)} />
                            </div>
                            </h2>
                            <p>{search.description ? search.description : search.teaser}</p>
                            <a href={search.url}>Learn More</a>
                        </div>
                    </div>
                )
    }

    getRenderedComponent(){
        const results = this.state.results.slice(0,this.state.limit);
        return(
            <div>
                <h2 className="results-head">Search Results ({this.props.data.length}) for : <br/> <span>{this.getQueryParam()}</span></h2>
                <div className="search-list col-md-10 col-lg-10 col-xs-12 col-sm-12 search-panel">
                    {results.length > 0 ? this.getResults(results) : <h3>Sorry! No results found. Please try a different search.</h3>}
                    <div className={"show-more-results " + (this.state.results.length  > 6 ? "show" : "hide")}>
                        {this.seeMoreButton()}
                    </div>
                </div>
            </div>
        )
    }
}
