import React from 'react';
import ReactDOM from 'react-dom';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import Slick from 'react-slick';
import ConstructUnchainedComponent from 'unchained_ui/unchained_ui/themes/default/components/component_constructor.jsx';


export default class RelatedArticleCarousel extends UnchainedBaseComponent {

  constructor(props){
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      "desktopSize": false
    };
  }

  componentDidMount() {
      window.addEventListener('resize', this.handleResize);
  }

  // handle the resize of the window
  // There is a maximum of three related articles at desktop for the related article carousel
  handleResize () {
      var reactThis = this;
      if (window.innerWidth > 1024){
        if (reactThis.state.desktopSize === false){
          reactThis.setState({"desktopSize": true});
          reactThis.refs.relatedArticlesSlick.slickGoTo(0);
        }
      } else {
        reactThis.setState({"desktopSize": false});
      }
  }

  // Related Article Carousel
  // - intended child component: NewsListingItem
  // This component is meant to take a group of Resource items with type article and turn them into
  // a carousel
  // How to use:
  // - Assign the component ID in the registry to the column for the related articles (news_related)
  // - Add Resource > Article items as children of the column with appropriate type (news_listing_item)
  getRenderedComponent() {
    let settings = {
      slidesToScroll: 3,
      infinite: false,
      draggable: false,
      dots: false,
      speed: 500,
      slidesToShow: 3,
      autoplay: false, // Set to false for debugging
      autoplaySpeed: 1000,
      pauseOnHover: true,
      arrows: true,
      lazyLoad: false,
      prevArrow: <NavButton className= "slick-prev" indicator={'/static/img/Default_Chevrons_Left_DrkGreen.png'}/>,
      nextArrow: <NavButton className= "slick-next" indicator={'/static/img/Default_Chevrons_Right_DrkGreen.png'}/>,
      centerMode: false,
      centerPadding: '0px',
      responsive: [ { breakpoint: 768, settings: { arrows: false, centerMode: true, centerPadding: '25px', draggable: true, slidesToShow: 1, slidesToScroll: 1 }}, { breakpoint: 1025, settings: { draggable: true, slidesToShow: 2, slidesToScroll: 2, centerMode: false }} ]

    };
    return (
      <div className="news-detail-related-carousel">
        <h2 className="carousel-title">Related Articles</h2>
        <Slick {...settings} ref="relatedArticlesSlick">
          {this.props.data.content.map((comp, i) =>
            <div key = {i}>
              <ConstructUnchainedComponent key={i} component = {this.getComponentName(comp)} data = {comp[this.getComponentName(comp)]}/>
            </div>
          )}
        </Slick>
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