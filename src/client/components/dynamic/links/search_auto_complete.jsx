import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import Autosuggest from 'react-autosuggest';
import ajax from 'superagent';


export default class SearchSuggestion extends UnchainedBaseComponent {
  constructor() {
    super();
    this.language = JSON.parse(document.getElementById('unchained').getAttribute('data')).page.language;
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      // Backend returns a list of objects which has the product name and slug
      // This list is stored in suggestions
    };
  }

  /*
   * When suggestion is clicked, Autosuggest needs to populate the input element
   * based on the clicked suggestion. Teach Autosuggest how to calculate the
   * input value for every given suggestion.
   * In this case populate it with the name
   */
  getSuggestionValue(suggestion) {
    if (suggestion.slug === "default") {
      let newValue = suggestion.name.replace("search for ", "");
      newValue = newValue.substring(1,newValue.length-1);  // Remove the leading and trailing quotes
      return newValue;
    }
    else {
      return suggestion.name;
    }
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
    if (suggestion.slug !== "default") {
      event.preventDefault();
      location.href = "/" + this.language + "/products/"+ suggestion.slug;
    }
    else {
      location.href = "/" + this.language + "/search/?q="+ suggestionValue;
    }
  }



  /**
   * The HTML to render the suggestion render suggestions.
   */
  renderSuggestion(suggestion,{query}) {
      var text = suggestion.name;
      var index = text.toLowerCase().indexOf(query.toLowerCase());
      var initalPart = text.substring(0, index);
      var middlePart = text.substring(index, index+query.length);
      var finalPart = text.substring(index+query.length);
      return (
        <div>
          {initalPart}<b>{middlePart}</b>{finalPart}
        </div>
        )
  }

  onChange(event, { newValue }){
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({value}) {
    if (value.length>1) {
      this.getSuggestions(value);
    }
    else {
      this.setState({
        suggestions: []
      });
    }
  };

  getSuggestions(value) {
    ajax.get('/api/search/suggest/')
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .query({'query': value})
    .end((error, response) => {
        if(!error && response) {
          // response is a list of objects which contains the name and slug of a product
          if (response.body.length > 0) {
            this.setState({
              suggestions: response.body,
            });
          }
          else {
            // Display this when there is nothing to suggest
            this.setState({
              suggestions: [{
                name: 'search for "' + value + '"',
                slug: "default",
              }],
            });
          }
        } else {
          // Display this when there is nothing to suggest
          this.setState({
            suggestions: [{
              name: 'search for "' + value + '"',
              slug: "default",
            }],
          });
          console.error('Error!', error.status, error.message);
        }
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  getRenderedComponent() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: this.props.data.search_placeholder,
      value,
      name: 'q',
      onChange: this.onChange.bind(this)
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
      />
    );
  }
}
