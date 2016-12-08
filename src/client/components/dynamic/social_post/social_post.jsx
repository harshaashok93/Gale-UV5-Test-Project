import React from 'react';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';

export default class SocialPost extends UnchainedBaseComponent{
    createMarkup(html) {
        return {__html: html};
    }
    getSocialPost(){
        if(this.props.data.feed.type === "twitter"){
            return <div className="twitter-card">
                <div className="ribbon left-ribbon"><img src="/static/img/Twitter_Black@2x.png" alt=""/></div>
                <p className="twitter-card-text" dangerouslySetInnerHTML={this.createMarkup(this.props.data.feed.text)} />
                <a className="follow-us" href={this.props.data.feed.follow_link} target="_blank">Follow Us</a>
            </div>
        }
        if(this.props.data.feed.type === "instagram"){
            return <div className="instagram-card" style={{backgroundImage:'url('+ this.props.data.feed.images.medium.url +')'}}>
                <div className="ribbon left-ribbon"><img src="/static/img/Instagram_Black@2x.png" alt=""/></div>
                <a className="follow-us" href={this.props.data.feed.follow_link} target="_blank">Follow Us</a>
            </div>
        }
    }
    getRenderedComponent(){
        return(
            <div className="social-card">
                {this.getSocialPost()}
            </div>
        )
    }
}
