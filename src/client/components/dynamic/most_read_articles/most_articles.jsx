import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import ConstructUnchainedComponent from 'unchained_ui/unchained_ui/themes/default/components/component_constructor.jsx';

 const getIcon = function(type){
   if(type === 'instagram'){
    return "/static/img/Instagram_Black@2x.png"
   }else if(type === 'facebook'){
    return "/static/img/Instagram_Black@2x.png"
   }else if(type === 'twitter'){
    return "/static/img/Twitter_Black@2x.png"
   }else{
    return "/static/img/Instagram_Black@2x.png"
   }
}

export default class MostArticles extends UnchainedBaseComponent {
    constructor(props){
        super(props);
        this.state = {
            results : props.data.content,
        }
    }

    componentDidMount() {
       var leng = $('.most-article-wrap .row').length;
        $('.most-article-wrap .row:lt(2)').show();
        $('.showmore').click(function () {
            $('.most-article-wrap .row:lt('+leng+')').show();
            $(this).hide();
        });
    }

    getComps(){
        var arrays = [], size = 3;
        var a = this.props.data.content
        let markup;
        if(a.length > 4){
            while (a.length > 0)
            arrays.push(a.splice(0, size));
            markup = arrays.map((arr,i) => {
                if(i === 0){
                    return <ArticleTemplateOne key={i} data={arr} />
                }
                if(i > 0 && (i % 2) !== 1){
                    return <ArticleTemplateTwo key={i} data={arr} />
                }

                if(i > 0){
                    return <ArticleTemplateThree key={i} data={arr} />
                }
            })
        }else{
            return <ArticleTemplateFour key={i} data={this.props.data.content} />
        }

        return markup
    }

    getRenderedComponent() {
        return(
            <div className="most-article-wrap col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <div>{this.getComps()}</div>
                <div className="show-more"><button className="showmore">See More</button></div>
            </div>
        )
    }
}


class ArticleTemplateOne extends UnchainedBaseComponent{

    getRenderedComponent() {
        const classNames = ["col-md-5 col-lg-5 col-sm-12 col-xs-12", "col-md-3 col-lg-3 col-sm-12 col-xs-12", "col-md-4 col-lg-4 col-sm-12 col-xs-12"]
        return(
            <div className="row">
                {this.props.data.map((item, k)=>{
                    if(item.resources){
                        const data = (item.resources && item.resources.data) ? item.resources.data[0] : "";
                        const bgImgStyle = {backgroundImage: 'url(' + data.image + ')'};
                        return <div key={k} className={(classNames[k] || "") + " no-padding"}>
                                    <a href={data.url}><div className="bgImg" style={bgImgStyle}>
                                        {item.resources.data[0].title ? <span className="title">{item.resources.data[0].title}</span> : ""}
                                    </div></a>
                                </div>
                    }

                    if(item.social_post){
                        const type = item.social_post.feed.type;
                        const bgImgStyles = {backgroundImage : 'url('+item.social_post.feed.images.medium.url+')'}
                        return  <a href={item.social_post.feed.link} target="_blank" key={k} className={(classNames[k] || "") + " no-padding"}>
                                    <div className="bgImg"  style={bgImgStyles}>
                                        <span className="title social-title"><img src={getIcon(type)} alt=""/></span>
                                    </div>
                                </a>
                    }
                })}
            </div>
        )
    }
}

class ArticleTemplateTwo extends UnchainedBaseComponent{
    getRenderedComponent() {
        const classNames = ["col-md-5 col-lg-5 col-sm-12 col-xs-12", "col-md-4 col-lg-4 col-sm-12 col-xs-12", "col-md-3 col-lg-3 col-sm-12 col-xs-12"]
        return(
            <div className="row">
                {this.props.data.map((item, k)=>{
                    if(item.resources){
                        const data = (item.resources && item.resources.data) ? item.resources.data[0] : "";
                        const bgImgStyle = {backgroundImage: 'url(' + data.image + ')'};
                        return <div key={k} className={(classNames[k] || "") + " no-padding"}>
                                    <a href={data.url}><div className="bgImg" style={bgImgStyle}>
                                        {item.resources.data[0].title ? <span className="title">{item.resources.data[0].title}</span> : ""}
                                    </div></a>
                                </div>
                    }

                    if(item.social_post){
                        const type = item.social_post.feed.type;
                        const bgImgStyles = {backgroundImage : 'url('+item.social_post.feed.images.medium.url+')'}
                        return  <a href={item.social_post.feed.link} target="_blank" key={k} className={(classNames[k] || "") + " no-padding"}>
                                    <div className="bgImg"  style={bgImgStyles}>
                                        <span className="title social-title"><img src={getIcon(type)} alt=""/></span>
                                    </div>
                                </a>
                    }
                })}
            </div>
        )
    }
}

class ArticleTemplateThree extends UnchainedBaseComponent{
    getRenderedComponent() {
        const classNames = ["col-md-3 col-lg-3 col-sm-12 col-xs-12", "col-md-4 col-lg-4 col-sm-12 col-xs-12", "col-md-5 col-lg-5 col-sm-12 col-xs-12"]
        return(
             <div className="row">
                {this.props.data.map((item, k)=>{
                    if(item.resources){
                        const data = (item.resources && item.resources.data) ? item.resources.data[0] : "";
                        const bgImgStyle = {backgroundImage: 'url(' + data.image + ')'};
                        return <div key={k} className={(classNames[k] || "") + " no-padding"}>
                                    <a href={data.url}><div className="bgImg" style={bgImgStyle}>
                                        {item.resources.data[0].title ? <span className="title">{item.resources.data[0].title}</span> : ""}
                                    </div></a>
                                </div>
                    }

                    if(item.social_post){
                        const type = item.social_post.feed.type;
                        const bgImgStyles = {backgroundImage : 'url('+item.social_post.feed.images.medium.url+')'}
                        return  <a href={item.social_post.feed.link} target="_blank" key={k} className={(classNames[k] || "") + " no-padding"}>
                                    <div className="bgImg"  style={bgImgStyles}>
                                        <span className="title social-title"><img src={getIcon(type)} alt=""/></span>
                                    </div>
                                </a>
                    }
                })}
            </div>
        )
    }
}

class ArticleTemplateFour extends UnchainedBaseComponent{
    getRenderedComponent() {
        return(
             <div className="row">
                {this.props.data.map((item, k)=>{
                    if(item.resources){
                        const data = (item.resources && item.resources.data) ? item.resources.data[0] : "";
                        const bgImgStyle = {backgroundImage: 'url(' + data.image + ')'};
                        return <div key={k} className="col-md-6 col-lg-6 col-sm-12 col-xs-12 no-padding">
                                    <a href={data.url}><div className="bgImg" style={bgImgStyle}>
                                        {item.resources.data[0].title ? <span className="title">{item.resources.data[0].title}</span> : ""}
                                    </div></a>
                                </div>
                    }

                    if(item.social_post){
                        const type = item.social_post.feed.type;
                        const bgImgStyles = {backgroundImage : 'url('+item.social_post.feed.images.medium.url+')'}
                        return  <a href={item.social_post.feed.link} target="_blank" key={k} className={"col-md-6 col-lg-6 col-sm-12 col-xs-12 no-padding"}>
                                    <div className="bgImg"  style={bgImgStyles}>
                                        <span className="title social-title"><img src={getIcon(type)} alt=""/></span>
                                    </div>
                                </a>
                    }
                })}
            </div>
        )
    }
}
