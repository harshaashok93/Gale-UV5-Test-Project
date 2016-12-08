import React from 'react';
import ReactDOM from 'react-dom';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import Slick from 'react-slick';


export default class RelatedProductCarousel extends UnchainedBaseComponent {

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
      slidesToScroll: 4,
      infinite: false,
      draggable: false,
      swipe : true,
      dots: false,
      speed: 500,
      slidesToShow: 4,
      autoplay: false, // Set to false for debugging
      autoplaySpeed: 1000,
      pauseOnHover: true,
      arrows: true,
      lazyLoad: false,
      prevArrow: <NavButton className= "slick-prev" indicator={'/static/img/Default_Chevrons_Left_DrkGreen.png'}/>,
      nextArrow: <NavButton className= "slick-next" indicator={'/static/img/Default_Chevrons_Right_DrkGreen.png'}/>,
      centerMode: false,
      centerPadding: '0px',
      responsive: [ { breakpoint: 992, settings: { draggable: true, arrows: false, centerMode: true, centerPadding: '25px', slidesToShow: 1, slidesToScroll: 1 }}, { breakpoint: 1200, settings: {  slidesToShow: 2, slidesToScroll: 2 }} ]

    };
    return (
      <div className="product-detail-related-carousel product-detail-carousel">
        <h2 className="carousel-title">More from Live Clean<span>®</span></h2>
        <Slick {...settings}>
          {this.props.data.map((item, i) =>
            <div key = {i}>
              <RelatedProductCarouselItem key = {i}  data = {item}/>
            </div>
          )}
        </Slick>
      </div>
    );
  }
}


class RelatedProductCarouselItem extends UnchainedBaseComponent {
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
      <div className="related-product-carousel-item product-carousel-item">
        <div className="related-product-image-wrap product-image-wrap">
          <img className="related-product-image product-image" src={this.props.data.images[0].large_url} />
        </div>
        <h3 className="related-product-collection product-collection-name">{this.getCollectionName()}</h3>
        <h4 className="related-product-name product-name">{this.props.data.name}</h4>
        <a href={this.props.data.url} className="related-product-learn-more product-learn-more"><span>Learn More</span></a>
      </div>
    );
  }
}

class NavButton extends UnchainedBaseComponent {
  getRenderedComponent() {
    const {indicator, ...rest} = this.props;
    return (
      <a href="javascript:void(0);" {...rest}><img src={indicator}/></a>
    )

  }
}
