import React from 'react';
import ReactDOM from 'react-dom';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import Slick from 'react-slick';


export default class ProductImageCarousel extends UnchainedBaseComponent {
  constructor(props){
    super(props);
    this.language = JSON.parse(document.getElementById('unchained').getAttribute('data')).page.language;
    this.handleResize = this.handleResize.bind(this);
  }

  // Get category name
  getCategoryName(){
      var categoryName = {};
      if (this.props.data.category_names){
          categoryName.name = this.props.data.category_names[0];
          categoryName.slug = this.props.data.category_names[0].toLowerCase();
      } else {
          categoryName.name = "Category";
          categoryName.slug = "";
      }
      return categoryName
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
      slidesToScroll: 1,
      infinite: true,
      draggable: true,
      dots: false,
      speed: 500,
      slidesToShow: 1,
      autoplay: false, // Set to false for debugging
      autoplaySpeed: 1000,
      pauseOnHover: true,
      arrows: true,
      lazyLoad: false,
      prevArrow: <NavButton className= "slick-prev" indicator={'/static/img/Default_Chevrons_Left_DrkGreen.png'}/>,
      nextArrow: <NavButton className= "slick-next" indicator={'/static/img/Default_Chevrons_Right_DrkGreen.png'}/>,
      centerMode: false,
      responsive: [ { breakpoint: 992, settings: { centerMode: true, centerPadding: '25px', arrows: false, draggable: true }} ]
    };
    return (
      <div className="product-detail-image-carousel">
        <a className="category-back-link" href={"/" + this.language + "/products/#category/" + this.getCategoryName().slug }>Back to {this.getCategoryName().name}</a>
        <Slick {...settings} ref='productImagesSlick'>
          {this.props.data.images.map((image, i) =>
            <div className="product-detail-image-carousel-item carousel-item-wrap" key = {i}>
              <ProductCarouselImage key = {i}  data = {image}/>
            </div>
          )}
        </Slick>
      </div>
    );
  }
}


class ProductCarouselImage extends UnchainedBaseComponent {
  getRenderedComponent()
  {
    var divStyle = {
      backgroundImage: 'url(' + this.props.data.large_url + ')',
    };
    return (
      <div className="carousel_image_wrapper">
        <div className="carousel_image" style={divStyle}>
        </div>
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
