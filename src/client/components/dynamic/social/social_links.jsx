import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import ConstructUnchainedComponent from 'unchained_ui/unchained_ui/themes/default/components/component_constructor.jsx';
import SocialShare from "unchained_ui/unchained_ui/themes/default/components/dynamic/social_share/socialshare.jsx";

export default class SocialShareIcons extends UnchainedBaseComponent{
     getRenderedComponent(){
        const socialShareProps = {
            shareUrl: window.location.href,
            title: this.props.data.title,
            showinline: true,
            inlineTxt: 'Share',
            providers: "facebook,pinterest,twitter,instagram"
        }

        return(
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 social-icons">
                <SocialShare {...socialShareProps}/>
            </div>
        )
    }
}
