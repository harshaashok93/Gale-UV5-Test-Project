import React from 'react';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';


export default class FeaturedCategory extends UnchainedBaseComponent{
    getRenderedComponent(){
        return(
            <div className={"featured-category text-center"}>
                <h2><img src='/static/img/Products_Leaves@2x.png'/>{this.props.data.name}</h2>
                <img src={this.props.data.images.length > 0 ? this.props.data.images[0].url : " "} className="category-image img-responsive"/>
                <a href={this.props.data.url + '#' + this.props.data.slug} className="category-link">
                    Learn More
                </a>
                <div className="description">
                    <p>{this.props.data.description}</p>
                    <a href={this.props.data.url + '#' + this.props.data.slug} className="category-link">Learn More</a>
                </div>
            </div>
        )
    }
}
