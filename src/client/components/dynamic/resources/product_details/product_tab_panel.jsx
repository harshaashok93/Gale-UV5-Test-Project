import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';

export default class ProductTabPanel extends UnchainedBaseComponent { 
  getRenderedComponent(){
      return (
            <div className="tabbable clearfix">
              <h2>{this.props.data.name}</h2>
              <ul className="nav nav-tabs">
                {this.props.data.attributes.map((panel, i) =>
                  <li key = {i} className={ (i === 0) ? 'active' : ''}>
                    <a className={"unchained-tabs unchained-tabs-"+this.props.data.id} data-toggle="tab" id={"top-tab-"+this.props.data.id +"-"+ i} href={"#tab-"+this.props.data.id +"-"+i}>
                      {panel.name}
                    </a>
                  </li>
                )}
              </ul>
              <div className="tab-content">
                {this.props.data.attributes.map((panel, i) =>
                  <div key = {i} id={"tab-"+this.props.data.id +"-"+i} className={ (i === 0) ? 'tab-pane fade in active' : 'tab-pane fade' }>
                    <h4>{panel.name} :</h4>
                    <ProductProperties data={panel.attributes} />
                  </div>
                )}
              </div>
            </div>
        );
    }
}

class ProductProperties extends UnchainedBaseComponent{
    getRenderedComponent(){
        return (
            <div className="properties-list">
                <ul>
                    {this.props.data.map((attr,i) =>
                        <li><span className="product-name">{attr.name}</span><span className="product-value">{attr.value}</span></li>
                    )}
                </ul>
            </div>

        );
    }
}
