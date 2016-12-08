import React from 'react';
import ReactDOM from 'react-dom';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import Slick from 'react-slick';


export default class PairedProductCarousel extends UnchainedBaseComponent {

  constructor(props){
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
      window.addEventListener('resize', this.handleResize);
  }

  // handle the resize of the window
  // This is a patch for a React Slick bug that calculates slide widths
  // incorrectly at center mode
  handleResize () {
      var reactThis = this;
      const currentCarousel = $(ReactDOM.findDOMNode(reactThis));
      if (window.innerWidth < 992){
        $(currentCarousel.context).find(".slick-slide").css("left", "-10px");
      } else {
        $(currentCarousel.context).find(".slick-slide").css("left", "0px");
      }
  }

  getRenderedComponent() {
    let settings = {
      slidesToScroll: 2,
      infinite: false,
      draggable: false,
      dots: false,
      swipe : true,
      speed: 500,
      slidesToShow: 2,
      autoplay: false, // Set to false for debugging
      autoplaySpeed: 1000,
      pauseOnHover: true,
      arrows: false,
      lazyLoad: false,
      centerMode: false,
      centerPadding: '0px',
      responsive: [ { breakpoint: 992, settings: { draggable: true, centerMode: true, centerPadding: '25px', slidesToShow: 1 , slidesToScroll : 1}} ]
    };
    return (
      <div className="product-detail-paired-carousel product-detail-carousel">
        <h2 className="carousel-title">Try It With</h2>
        <Slick {...settings}>
          {this.props.data.map((item, i) =>
            <div key = {i}>
              <PairedProductCarouselItem key = {i}  data = {item}/>
            </div>
          )}
        </Slick>
      </div>
    );
  }
}


class PairedProductCarouselItem extends UnchainedBaseComponent {
  // TODO: get correct item data in
  // - Description under the product's main details (this is the shorter description)
  constructor(props){
    super(props);
    this.language = JSON.parse(document.getElementById('unchained').getAttribute('data')).page.language;
  }

  // Retrieve the collection name
  getCollectionName(){
      var collectionName,
          nameToReturn;
      collectionName = this.props.data.attributes.filter(item => item.name.toLowerCase() === "collection");
      if (collectionName){
        nameToReturn = collectionName[0].value;
      } else {
        nameToReturn = null;
      }
      return nameToReturn;
  }

  getRenderedComponent()
  {
    return (
      <div className="paired-product-carousel-item product-carousel-item">
        <div className="paired-product-image-wrap product-image-wrap">
          <img className="paired-product-image product-image" src={this.props.data.images[0].large_url} />
        </div>
        <div className="paired-product-details-wrap">
          <h4 className="paired-product-collection product-collection-name">{this.getCollectionName()}</h4>
          <h3 className="paired-product-name product-name">{this.props.data.name}</h3>
          <p className="paired-product-short-description product-short-description">{this.props.data.description}</p>
          <a href={this.props.data.url} className="paired-product-learn-more product-learn-more"><span>Learn More</span></a>
        </div>
      </div>
    );
  }
}
