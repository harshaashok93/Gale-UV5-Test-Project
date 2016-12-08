import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
export default class ResourceCard extends UnchainedBaseComponent {

    componentDidMount() {
        $('.playvideo').on('hidden.bs.modal', function () {
            $('.playvideo iframe').each(function(){
                $(this).attr("src",$(this).attr("src"));
            });
        });
    }

    getCards(){
        const cards = this.props.data.data;
        const markUp = cards.map((card,i) => {
            if(card.video_url){
                return <div className="featured_text featured-card-block" key={i}>
                            <div className="richtext">
                                <div className="rich-text">
                                    <h4>{card.title}</h4>
                                </div>
                            </div>
                            <div className="image-block">
                                <img data-analytics-id="image" src={card.image} className="img-responsive "/>
                            </div>
                            <div className="links ">
                                <span>
                                    <a data-target={"#playvideo_"+card.id} data-toggle="modal" target="_self">Play Video</a>
                                </span>
                            </div>
                            <div className="modal fade playvideo" id={"playvideo_"+card.id} role="dialog">
                                    <div className="modal-dialog">
                                        <div className={"modal-content"}>
                                            <div className="modal-body">
                                                <iframe width="100%" height="100%" frameborder="0" allowfullscreen={true} src={card.video_url}></iframe>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
            }
            if(card.type === "article"){
                return <div className="featured_text featured-card-block" key={i}>
                    <div className="richtext">
                        <div className="rich-text">
                            <h4>{card.title}</h4>
                        </div>
                    </div>
                    <div className="image-block">
                        <img data-analytics-id="image" src={card.image} className="img-responsive " alt="girl-with-flower"/>
                    </div>
                    <div className="links ">
                        <span>
                            <a href={card.url} target="_self">Read More</a>
                        </span>
                    </div>

                    <div className={card.description ? 'description' : 'hidden'}>
                        <p>{card.teaser}</p>
                        <a href={card.url} className="category-link">Read More</a>
                    </div>
                </div>
            }
        })
        return markUp;
    }

    getRenderedComponent(){
        return(
            <div className="article-cards">{this.getCards()}</div>
        )
    }
}
