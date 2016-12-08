import React from 'react';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import ConstructUnchainedComponent from 'unchained_ui/unchained_ui/themes/default/components/component_constructor.jsx';


export default class StoreLocator extends UnchainedBaseComponent {

  getRenderedComponent(){
    return (
      <div className={"store-locator-container " + this.props.data.custom_class}>
        <div className="wrapper clearfix">
          <div className="iframe-container">
            <iframe src={this.props.data.source_url} className="iframe-content" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    );
  }
}
