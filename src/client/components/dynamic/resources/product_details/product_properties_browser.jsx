import React from 'react';
import ReactDOM from 'react-dom';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import Slick from 'react-slick';


export default class ProductPropertiesBrowser extends UnchainedBaseComponent {

  constructor(props){
    super(props);
    this.state = {
      "activeTab": 0
    }
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
        $(currentCarousel.context).find(".slick-slide").css("left", "-15px");
      } else {
        $(currentCarousel.context).find(".slick-slide").css("left", "0px");
      }
  }

  setActiveTab(i) {
    // When "tab" is clicked, advance to the appropriate properties panel
    this.setState({"activeTab": i});
    this.refs.propertiesSlick.slickGoTo(i);
  }

  // Create slugified version of property name for styling purposes
  slugifyName(name) {
    var name,
        nameWords,
        slugified;
    name = name.toLowerCase();
    nameWords = name.split(" ");
    slugified = nameWords.join("-");
    return slugified.replace("&","and");
  }

  getRenderedComponent() {
    let self = this;
    let settings = {
      slidesToScroll: 1,
      infinite: false,
      draggable: false,
      dots: false,
      speed: 500,
      slidesToShow: 1,
      autoplay: false,
      autoplaySpeed: 1000,
      pauseOnHover: true,
      arrows: false,
      lazyLoad: false,
      centerMode: false,
      centerPadding: '0px',
      responsive: [ { breakpoint: 992, settings: { draggable: true, centerMode: true, centerPadding: '30px' }} ],
      afterChange: function (){
        self.setState({"activeTab": self.refs.propertiesSlick.innerSlider.state.currentSlide});
        var reactThis = self;
        const currentCarousel = $(ReactDOM.findDOMNode(reactThis));
        if (window.innerWidth < 992){
          $(currentCarousel.context).find(".slick-slide").css("left", "-15px");
        } else {
          $(currentCarousel.context).find(".slick-slide").css("left", "0px");
        }
      }
    };

    return (
      <div className="product-properties-browser">
        <h3 className="property-browser-intro">All the <span>Good</span>, Without the <span>Bad</span></h3>
        <ul className="property-browser-tabs">
          {this.props.data.map((property, i) =>
            <li key = {i} className={"property-browser-tab " + this.slugifyName(property.name)}>
              <a className={"property-browser-toggle browser-toggle-" + property.id + (this.state.activeTab === i ? ' prop-browser-toggle-active' : '')} 
              data-toggle={i} 
              onClick={() => { this.setActiveTab(i) }}>
                <span className="product-property-image-wrapper">
                  <img className="product-property-image" src={"/static/img/pdp/" + this.slugifyName(property.name) + ".png"} />
                  <img className="product-property-image-hover" src={"/static/img/pdp/" + this.slugifyName(property.name) + "-white.png"} />
                </span>
                <span className="toggle-name">{property.name}</span>
              </a>
            </li>
          )}
        </ul>
        <div className="product-properties-carousel">
          <Slick {...settings} ref='propertiesSlick'>
            {this.props.data.map((item, i) =>
              <div className={"product-properties-carousel-item carousel-item-wrap " + this.slugifyName(item.name)} key = {i}>
                <ProductPropertyPanel data={item} key={i} slugifyName={this.slugifyName}/>
              </div>
            )}
          </Slick>
        </div>
      </div>
    );
  }
}



class ProductPropertyPanel extends UnchainedBaseComponent{
    createMarkup(data) {
      return {__html: data};
    }
    getRenderedComponent(){
      return (
          <div className="product-property-panel-inner">
            <div className="product-property-image-wrapper">
              <img className="product-property-image" src={"/static/img/pdp/" + this.props.slugifyName(this.props.data.name) + ".png"} />
            </div>
            <h4 className="product-panel-name" dangerouslySetInnerHTML={this.createMarkup(this.props.data.presentation_name)}></h4>
            <p className="property-description" dangerouslySetInnerHTML={this.createMarkup(this.props.data.description)}></p>
            <ProductSubProperties data={this.props.data.attributes} />
          </div>
      );
    }
}


class ProductSubProperties extends UnchainedBaseComponent{
    createProductPropertyMarkup(attr) {
      return {__html: attr.presentation_name};
    }
    getRenderedComponent(){
        return (
            <div className="properties-list-wrapper">
                <ul className="property-list">
                    {this.props.data.map((attr,i) =>
                        <li className="property-list-item" key = {i}><span className="product-name" dangerouslySetInnerHTML={this.createProductPropertyMarkup(attr)}></span></li>
                    )}
                </ul>
            </div>
        );
    }
}
