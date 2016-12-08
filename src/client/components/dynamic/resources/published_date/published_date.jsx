import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import ConstructUnchainedComponent from 'unchained_ui/unchained_ui/themes/default/components/component_constructor.jsx';


const getDate = function() {
    var published = ""
    try{
    const dataEl = document.getElementById("unchained");
    if(dataEl) {
      var pageObj = JSON.parse(dataEl.getAttribute("data"));
      if(typeof pageObj === "object"){
        published = pageObj.page ? (pageObj.page.published_date) || "" : ""
      }
    }
    } catch(e){
        console.error(e)
    }

    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var ddSplit = published.split('-');
    return months[ddSplit[1]-1]+' '+ddSplit[2]+ ', ' + ddSplit[0]
}



export default class PublishedDate extends UnchainedBaseComponent {
    getRenderedComponent(){
        return(
            <div className="published-date"> Published: <span>{getDate()}</span></div>
        )
    }
}
