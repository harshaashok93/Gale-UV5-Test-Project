import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
import ConstructUnchainedComponent from 'unchained_ui/unchained_ui/themes/default/components/component_constructor.jsx';
import ProductImageCarousel from './product_image_carousel.jsx';
import RelatedProductCarousel from './related_product_carousel.jsx';
import PairedProductCarousel from './paired_product_carousel.jsx';
import ProductAccordionBlock from './product_detail_accordion.jsx';
import ProductSecondaryDescription from './product_secondary_description.jsx'
import ProductPropertiesBrowser from './product_properties_browser.jsx';
import SocialShare from "unchained_ui/unchained_ui/themes/default/components/dynamic/social_share/socialshare.jsx";


export default class ProductDetails extends UnchainedBaseComponent{

    constructor(props){
        super(props);
    }

    // Retrieve Ingredients and Instructions (How to Use)
    getProductIngredientsInstructions(){
        // Find the ingredients and instructions
        var instructionsIngredients,
            dataToReturn;
        instructionsIngredients = this.props.data.data[0].attributes.filter(item => (item.name.toLowerCase() === "product ingredients" || item.name.toLowerCase() === "how to use" ));
        // Verify all data is present
        if (instructionsIngredients.length == 2){
            // Make sure ingredients are followed by instructions
            if (instructionsIngredients[0].name.toLowerCase() === "product ingredients"){
                dataToReturn = [instructionsIngredients[0], instructionsIngredients[1]];
            } else {
                dataToReturn = [instructionsIngredients[1], instructionsIngredients[0]];
            }
        } else if (instructionsIngredients.length === 1) {
            dataToReturn = [instructionsIngredients[0]];
        } else {
            dataToReturn = [];
        }
        return dataToReturn;
    }

    componentDidMount() {
        // Share hide and show
        $(".share-product-desktop h5").on("click", function(event){
            if ($(event.currentTarget).parent().hasClass("expanded")){
                $(event.currentTarget).parent().removeClass("expanded")
            } else {
                $(event.currentTarget).parent().addClass("expanded")
            }
        });
    }

    // Retrieve product properties
    getProductProperties(){
        // Any attributes that use true are the product properties, gather them here 
        return this.props.data.data[0].attributes.filter(item => item.value.toLowerCase() === "true");
    }

    // Retrieve the secondary product description
    getSecondaryDescription(){
        return this.props.data.data[0].attributes.filter(item => item.name.toLowerCase() === "product description 2");
    }

    // Get Related products
    getRelateds(type){
        // Find the related products with the specified type
        return this.props.data.data[0].related_products.filter(item => item.relation_type === type);
    }

    // Render the product details component
    getRenderedComponent() {
        let socialShareProps = {
            shareUrl: window.location.href,
            title: document.title || 'Check this one',
            showinline: true,
            inlineTxt: ' ',
            providers: "twitter,facebook,instagram,pintrest"
        }
        return (
            <section className="product-details">
                <div className="product-image-info-container">
                    <ProductImageCarousel data={this.props.data.data[0]}/>
                    <ProductInfo data={this.props.data.data[0]}/>
                    <div className="share-product-desktop">
                        <h5 className="share-product-title">Share</h5>
                        <SocialShare {...socialShareProps}/>
                    </div>
                </div>
                <div className="share-product-mobile">
                    <h5 className="share-product-title">Share</h5>
                    <SocialShare {...socialShareProps}/>
                </div>
                <ProductPropertiesBrowser data={this.getProductProperties()}/>
                <ProductSecondaryDescription data={this.getSecondaryDescription()}/>
                <ProductAccordionBlock data={this.getProductIngredientsInstructions()}/>
                <PairedProductCarousel data={this.getRelateds("Paired")}/>
                <RelatedProductCarousel data={this.getRelateds("Related")}/>
            </section>
        );
    }
}

class ProductInfo extends UnchainedBaseComponent{
    // Add language
    constructor(props){
        super(props);
        this.language = JSON.parse(document.getElementById('unchained').getAttribute('data')).page.language;
    }
    // Get category name
    getCategoryName(){
        var categoryName = "";
        if (this.props.data.category_names){
            categoryName = this.props.data.category_names[0]
        } else {
            categoryName = "Category";
        }
        return categoryName
    }
    // Get the buy now URL from the list of product attributes
    getBuyUrl(){
        var buyNow,
            url;
        buyNow = this.props.data.attributes.filter(item => item.name.toLowerCase().indexOf("buy") != -1);
        if (buyNow) {
            url = buyNow[0].value;
        } else {
            url = null;
        }
        return url;
    }
    // Render the product info block
    getRenderedComponent(){
        return(
            <div className="product-info-wrap">
                <div className="product-info-border">
                    <div className="product-info-content">
                        <h3 className="product-info-category">{this.getCategoryName()}</h3>
                        <h2 className="product-info-name">{this.props.data.name}</h2>
                        <p className="product-main-description">{this.props.data.description}</p>
                        <div className="product-links clearfix">
                            <a href={this.getBuyUrl()} className="buy-online" title="Click here to find out how to purchase"><span>Buy Now</span></a>
                            <a href={"/" + this.language + "/where-to-buy/"} className="find-in-store"><span>Find In Store</span></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
