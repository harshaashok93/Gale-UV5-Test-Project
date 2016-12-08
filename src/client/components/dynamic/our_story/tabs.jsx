import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import ConstructUnchainedComponent from 'unchained_ui/unchained_ui/themes/default/components/component_constructor.jsx';
import Carousel from './carousel.jsx'


export default class Tabs extends UnchainedBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "",
            activeRow:""
        }
    }
    changeActiveItem(i, rowIndex){
        if(i!==undefined){
            this.setState({activeItem: i, activeRow: rowIndex});
        }
    }

    getTabsMarkup(i, panel, rowIndex){
        const componentName = "tabpanel";
        const bgImage = {
            backgroundImage: 'url('+(this.state.activeItem === i ? this.props.data.panels[i].tab.active_image : this.props.data.panels[i].tab.initial_image)+")"
        }
        return <li key = {i} className={ ((this.state.activeItem === i) ? 'active' : '')}>
                    <a className={"unchained-tabs unchained-tabs-"+this.props.data.id}
                    style={bgImage}
                    data-analytics-id={this.getAnalyticsData(componentName+"_"+i)}
                    data-toggle="tab" id={"top-tab-"+this.props.data.id +"-"+ i} href={"#tab-"+this.props.data.id +"-"+i}
                    onClick = { this.changeActiveItem.bind(this, i, rowIndex) }>
                        <span>{panel.tab.title}</span>
                    </a>
                </li>
    }
    getTabContentMarkup(i, panel){
        return <div key = {i} id={"tab-"+this.props.data.id +"-"+i} className={'tab-pane fade in '+ ((this.state.activeItem === i) ? 'active' : '') }>
                    {panel.tab.content.map((comp, i) =>
                        <ConstructUnchainedComponent key = {i} component = {this.getComponentName(comp)} data = {comp[this.getComponentName(comp)]}/>
                    )}
                </div>
    }

    getTabbedContent(){
        const markupArr = [];
        let tabs = [], tabContents = [];
        let rowIndex = 1;
        this.props.data.panels.map((panel, i) =>{
            if((i===0 || (i%3>0)) && i<this.props.data.panels.length-1){
                tabs.push(this.getTabsMarkup(i,panel, rowIndex));
                tabContents.push(this.getTabContentMarkup(i, panel));
            }else{
                if(i === this.props.data.panels.length-1){
                    tabs.push(this.getTabsMarkup(i,panel, rowIndex));
                    tabContents.push(this.getTabContentMarkup(i, panel));
                }
                markupArr.push(<ul className="nav nav-tabs ">{tabs}</ul>);
                markupArr.push(<div className={"tab-content "+(rowIndex === this.state.activeRow ? "" : "hide")}>{tabContents}</div>);
                tabs=[];
                tabContents=[];
                rowIndex+=1;
                tabs.push(this.getTabsMarkup(i,panel, rowIndex));
                tabContents.push(this.getTabContentMarkup(i, panel));
            }

        });
        return  <div>
                   {markupArr}
                </div>;
    }

    getRenderedComponent(){
            return (
                <div className="tab-wrap">
                    <div>
                        <h2>All the <span>Good,</span> Without the <span>Bad</span></h2>
                    </div>
                    <div className={"hidden-xs hidden-sm tabbable clearfix tabs-" + this.props.data.tab_position + " " + this.props.data.custom_class}>
                        {this.getTabbedContent()}
                    </div>

                    <div className={"hidden-md hidden-lg our-story-mobile-tabs mobile-tabs"}>
                        <Carousel data = {this.props.data} />
                    </div>
                </div>
            );
        }
}
