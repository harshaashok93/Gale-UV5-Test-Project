import React from 'react';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import SearchSuggestion from './search_auto_complete.jsx';

var url;

export default class LiveCleanLinks extends UnchainedBaseComponent{
  constructor(props) {
    super(props);
    if(props.data.url) {
      this.checkAndReplaceHighlightLink((props.data.url + window.location.hash), props);
    }
  }
    getRenderedComponent(){
      let componentName = "links";
        if(this.props.data.link_type === "ecommerceCategoryLinks"){
            if(this.props.data.url_prefix){
              url = this.props.data.url_prefix;
            }
            return(
                <div className={this.props.data.highlight_link ? 'active links ' + this.props.data.custom_class : "links " + this.props.data.custom_class} data-collapsible = {this.props.data.is_collapsible}>
                    <span>
                        <a className={this.props.data.custom_class}
                        data-analytics-id={this.getAnalyticsData(componentName+"_link")}
                        target="_self">{this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}</a>
                        <Sublinks data = {this.props.data.category_info} />
                    </span>
                </div>
            )
        }

        if(this.props.data.link_type === "search"){
          return(
            <div className={this.props.data.highlight_link ? 'active search-box ' + this.props.data.custom_class : "search-box " }>
              <span>{this.props.data.title}</span>
              <form action={this.props.data.url} method="get"
              data-analytics-id={this.getAnalyticsData(componentName+"_form")}
              name={this.props.data.title}>
                <SearchSuggestion data={this.props.data} />
                <button type="submit" data-analytics-id={this.getAnalyticsData(componentName+"_submit")}><span className="glyphicon glyphicon-search"></span></button>
              </form>
            </div>
          )
        }

        if(this.props.data.link_target === "sameTab"){
            return(
                <div className={this.props.data.highlight_link ? 'active links ' + this.props.data.custom_class : "links " + this.props.data.custom_class }>
                    <span>
                        <a href={this.props.data.url}
                        data-analytics-id={this.getAnalyticsData(componentName+"_link")}
                        className={this.props.data.custom_class} target="_self">{this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}</a>
                    </span>
                </div>
            )
        }

        else{
            return(
                <div className={this.props.data.highlight_link ? 'active links ' + this.props.data.custom_class : "links " + this.props.data.custom_class }>
                    <span>
                        <a href={this.props.data.url}
                        data-analytics-id={this.getAnalyticsData(componentName+"_link")}
                        className={this.props.data.custom_class} target="_blank">{this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div> : this.props.data.title}</a>
                    </span>
                </div>
            )
        }
    }
}

class Sublinks extends UnchainedBaseComponent{
  getRenderedComponent(){
    let componentName = "sublinks";
    return(
      <ul>
          {this.props.data.map((category, i) =>
            <li key={i} className="second-level">
              <a href={url + category.slug} data-analytics-id={this.getAnalyticsData(componentName+"_"+i)}>
              {category.icon !== null? <div><img src={category.icon} /> {category.name}</div> : category.name}
              </a>
              <ul>
                {category.sub_categories.map((sub_category,i) =>
                  <li key={i}>
                    <a href={url + sub_category.slug}  data-analytics-id={this.getAnalyticsData(componentName+"_"+i)}>
                      {sub_category.icon !== null? <div><img src={sub_category.icon} /> {sub_category.name}</div> : sub_category.name}
                    </a>
                  </li>
                )}
              </ul>
            </li>
          )}
      </ul>
    )
  }
}
