import ReactDOM from 'react-dom';

// Load the unchained App
import UnchainedComponent from 'unchained_ui/unchained_ui/themes/default/main.jsx';

// Inject your components here
import componentList from './components/component_registry.jsx'
import './components/shared/custom.js'

// Render them
ReactDOM.render(<UnchainedComponent />, document.getElementById('unchained'));
