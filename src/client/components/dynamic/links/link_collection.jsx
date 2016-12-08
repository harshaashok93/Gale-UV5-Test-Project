import React from 'react';
import ReactDOM from 'react-dom';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import RichText from 'unchained_ui/unchained_ui/themes/default/components/dynamic/rich_text/rich_text.jsx';
import SearchSuggestion from './search_auto_complete.jsx';

var url;

export default class LiveCleanLinkCollection extends UnchainedBaseComponent {

  componentDidMount() {
    $('.search-box form').on('submit', function(){
      var query = $(this).find('input').val();
      if (query !== "")
        return true
      else
        return false
    });
  }

  getLinkComponents() {
    let markup;
    markup = this.props.data.content.map((comp,i) =>{
      if(comp.link) {
         return <Navlinks key={i} data={comp.link} />
      } else if(comp.rich_text){
        return <RichText key={i} data={comp.rich_text}/>
      } else if(comp.nested_links){
        return <NestedLinks key={i} data={comp.nested_links} />
      }
    });
    return markup;

  }

  getRenderedComponent()
  {
    return (
      <div data-collapsible = {this.props.data.is_collapsible} className={"link-group " + this.props.data.custom_class}>
          <div className={'title '+ this.props.data.custom_class}>
            <a className={'title-link '+ this.props.data.custom_class} href={this.props.data.generic_url ? this.props.data.generic_url : 'javascript:void(0)'} target={this.props.data.link_target === "sameTab" ? "_self" : "_blank"}>{this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}</a>
            <ul>
            {this.getLinkComponents()}
            </ul>
          </div>
      </div>
    )
  }
}

class Navlinks extends UnchainedBaseComponent{
  getRenderedComponent(){
    if(this.props.data.link_type === "ecommerceCategoryLinks"){
      if(this.props.data.url_prefix){
        url = this.props.data.url_prefix;
      }
      return(
        <li className={this.props.data.custom_class}>
           <a href={this.props.data.url_prefix}>{this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}</a>
           <Sublinks data = {this.props.data.category_info} />
        </li>
      )
    }

    if(this.props.data.link_type === "search"){
      return(
        <li className="search-box">
          <a>{this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}</a>
          <form action={this.props.data.url} method="get"
            data-analytics-id={this.getAnalyticsData(componentName+"_form")}
            name={this.props.data.title}>
            <button type="image" className="search-back-btn">back</button>
            <SearchSuggestion data={this.props.data} />
            <button type="submit" data-analytics-id={this.getAnalyticsData(componentName+"_submit")}><span className="glyphicon glyphicon-search"></span></button>
          </form>
        </li>
      )
    }

   if (this.props.data.link_target === "sameTab"){
      return (
        <li className={this.props.data.custom_class}>
         <a href={this.props.data.url} className={this.props.data.custom_class} target="_self">
           {this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}
         </a>
        </li>
      )
    }else{
       return (
        <li className={this.props.data.custom_class}>
         <a href={this.props.data.url} className={this.props.data.custom_class} target="_blank">
            {this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}
         </a>
        </li>
      )
    }
  }
}


class Sublinks extends UnchainedBaseComponent{
  getRenderedComponent(){
    return(
      <ul>
      {this.props.data.map((category, i) =>
        <li key={i} className="second-level">
          <a href={url + category.slug}>
            {category.icon !== null? <div><img src={category.icon} /> {category.name}</div> : category.name}
          </a>
          <ul>
            {category.sub_categories.map((sub_category,i) =>
              <li key={i}>
                <a href={url + sub_category.slug}>
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

class NestedLinks extends UnchainedBaseComponent{
  getLinkComponents() {
    let markup;
    markup = this.props.data.content.map((comp,i) =>{
      if(comp.rich_text){
        return <RichText key={i} data={comp.rich_text}/>
      } else if(comp.link){
        return <NestedSublinks key={i} data={comp} />
      }
    });
    return markup;

  }
  getRenderedComponent(){
    return(
      <li className={this.props.data.custom_class} data-collapsible = {this.props.data.is_collapsible}>
          {this.props.data.link_target === "sameTab" ?
             <a href={this.props.data.generic_url} target="_self">
              {this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}
             </a>
             :
             <a href={this.props.data.generic_url} target="_blank">
              {this.props.data.icon !== null? <div><img src={this.props.data.icon} /> {this.props.data.title}</div>: this.props.data.title}
             </a>
          }
          <ul className="second-nested-level">{this.getLinkComponents()}</ul>
      </li>
    )
  }
}

class NestedSublinks extends UnchainedBaseComponent {
  getRenderedComponent(){
    return(
        <li>
          {this.props.data.link.link_target === "sameTab" ?
          <a href={this.props.data.link.url} target="_self" className={this.props.data.link.custom_class}>
            {this.props.data.link.icon !== null? <div><img src={this.props.data.link.icon} /> {this.props.data.link.title}</div>: this.props.data.link.title}
          </a>
          :
           <a href={this.props.data.link.url} target="_blank" className={this.props.data.link.custom_class}>
            {this.props.data.link.icon !== null? <div><img src={this.props.data.link.icon} /> {this.props.data.link.title}</div>: this.props.data.link.title}
           </a>
          }
        </li>
    )
  }
}
