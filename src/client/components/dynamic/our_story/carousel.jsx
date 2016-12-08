import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import ConstructUnchainedComponent from 'unchained_ui/unchained_ui/themes/default/components/component_constructor.jsx';
import Slick from 'react-slick';

export default class Carousel extends UnchainedBaseComponent {

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
        $(currentCarousel.context).find(".slick-slide").css("left", "-15px");
      } else {
        $(currentCarousel.context).find(".slick-slide").css("left", "0px");
      }
  }

  createMarkup(html) {
      return {__html: html};
  }

  getRenderedComponent() {
    const settings = {
      slidesToScroll: 1,
      infinite: false,
      draggable: false,
      dots: false,
      swipe: true,
      speed: 500,
      autoplay: false,
      arrows: false,
      lazyLoad: false,
      centerMode: false,
      adaptiveHeight: false,
      centerPadding: '0px',
      responsive: [ { breakpoint: 992, settings: { draggable: true, arrows: false, centerMode: true, centerPadding: '30px', slidesToShow: 1, slidesToScroll: 1 }}]
    }

    return (
        <Slick {...settings}>
          {this.props.data.panels.map((comp, i) =>
            <div key = {i} className="tab-cards">
              <div className="tab-cards-panel">
                <div className="icon-title">
                  <img src={comp.tab.initial_image} />
                  <span>{comp.tab.title}</span>
                </div>
                <div className="tab-details">
                  <div className="richtext" dangerouslySetInnerHTML={comp.tab.content[0] ? this.createMarkup(comp.tab.content[0].rich_text) : ''} />
                </div>
              </div>
            </div>
          )}
        </Slick>
    );
  }
}
