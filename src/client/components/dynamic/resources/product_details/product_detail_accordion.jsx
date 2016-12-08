import React from 'react';
import ReactDOM from 'react-dom';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';


export default class ProductAccordionBlock extends UnchainedBaseComponent{
    constructor(props){
        super(props);
    }
    getRenderedComponent() {
        return (
            <div className="product-info-accordion">
                {this.props.data.map((item, i) => {
                    let obj = item;
                    obj.expand_default = false;
                    return <div className="product-detail-accordion-item-wrap" key = {i}>
                      <ProductAccordionItem key = {i}  data = {obj}/>
                    </div>
                    }
                )}
            </div>
        )
    }
}


class ProductAccordionItem extends UnchainedBaseComponent {
    // IMPORTANT NOTE: accordion presentation names should be defined in Wagtail CMS
    // - Name in Wagtail CMS should match name in Solidus
    constructor(props){
        super(props);
        this.state = {
            'collapse':  false
        }
    }

    componentDidMount() {
        var reactThis = this;
        function toggleChevron(el) {
            el.closest('.panel-body').find("i.indicator").toggleClass('glyphicon-plus glyphicon-minus');
        }
        const currentAccordion = $(ReactDOM.findDOMNode(reactThis));
        currentAccordion.on('hidden.bs.collapse', function (event){
            var el = $(event.target);
            toggleChevron(el);
            el.closest(".panel").find('[data-analytics-id]').click();
            reactThis.setState({'collapse': false});

        });
        currentAccordion.on('shown.bs.collapse', function (event){
            var el = $(event.target);
            toggleChevron(el);
            el.closest(".panel").find('[data-analytics-id]').click();
            reactThis.setState({'collapse': true});
        });
    }

    createNameMarkup(data) {
      return {__html: data.presentation_name};
    }

    getRenderedComponent() {
        const componentName = "product-detail-ingredients-instructions";
        return (
            <div className="product-info-accordion-item">
                <div className="panel-body" >
                    <div className="panel-group sub-group" id={"accordion-"+this.props.data.id}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a className="panel-toggle" data-toggle="collapse" data-parent={"#accordion-"+this.props.data.id} href={"#collapse-"+this.props.data.id}>
                                        <i className="indicator glyphicon glyphicon-plus"></i>
                                        <div className="title-block" dangerouslySetInnerHTML={this.createNameMarkup(this.props.data)}></div>
                                    </a>
                                </h4>
                                <input type="hidden" data-analytics-id={this.getAnalyticsData(componentName + '_' + (this.state.collapse ? 'close' : 'open') )}/>
                            </div>

                            <div id={"collapse-"+this.props.data.id} className={"panel-collapse collapse " + (this.props.data.expand_default ? 'in' : '')}>
                                <div className="info-block-wrapper">
                                    <div className="info-block">{this.props.data.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}