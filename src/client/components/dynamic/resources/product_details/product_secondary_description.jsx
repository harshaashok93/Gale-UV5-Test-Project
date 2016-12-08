import React from 'react';
import ReactDOM from 'react-dom';
import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';


export default class SecondaryProductDescription extends UnchainedBaseComponent{
    constructor(props){
        super(props);
        this.state = {
          expanded : false,
          windowWidth: window.innerWidth
        }
        this.handleResize = this.handleResize.bind(this);
    }

    // truncate the secondary product description
    truncate (string) {
        var shorterText = string.substring(0,70);
        var lastSpace = shorterText.lastIndexOf(" ");
        var shortestText = shorterText.substring(0, lastSpace);
        var lastCharacter = shortestText.charAt(shortestText.length-1);
        if (lastCharacter === "." || lastCharacter === "," || lastCharacter === ";" || lastCharacter === ":" || lastCharacter === "-") {
            shortestText = shortestText.slice(0, -1);
        }
        var newText = shortestText + "...";
        return newText;
    }

    // toggle the expanded state on click of caret
    handleToggle () {
        this.setState({ expanded: !this.state.expanded });
    }

    // handle the resize of the window
    handleResize () {
        this.setState({ windowWidth: window.innerWidth });
        this.checkScreenWidth();
    }

    // toggle expanded based on window size
    checkScreenWidth () {
        var mobileWidth = 480;
        if (this.state.windowWidth >= mobileWidth) {
            this.setState({ expanded: true });
        } else {
            this.setState({ expanded : false });
        }
    }

    componentDidMount() {
        this.checkScreenWidth();
        window.addEventListener('resize', this.handleResize);
    }

    getRenderedComponent() {
        var caretClassName = this.state.expanded ? "expanded-caret" : "contracted-caret";

        return (
            <div className="product-secondary-description">
                <span className="secondary-description-text">{ this.state.expanded ? this.props.data[0].value : this.truncate(this.props.data[0].value)}</span>
                <div onClick={this.handleToggle.bind(this)} className={"expand-contract-caret " + caretClassName }></div>
            </div>
        )
    }
}
