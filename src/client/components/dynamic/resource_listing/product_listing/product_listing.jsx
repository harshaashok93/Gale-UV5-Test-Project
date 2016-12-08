import UnchainedBaseComponent from 'unchained_ui/unchained_ui/themes/unchained_base.jsx';
var _ = require('lodash');

export default class ProductListing extends UnchainedBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.data.listing,
            selectedCategory: {},
            // Stores the selected category's data (initialise it to the first data)
            showMore : [],
            limit : 3,
            'collapse': false,
        }

        _(this.state.categories).forEach(function(category) {
            category.products = [];
        });

        if (window.location.hash) {
            var hashVal = window.location.hash;
            var categorySlug = hashVal.split("category/")[1] || "";
            this.state.selectedCategory = this.getCategory(categorySlug);
        }
        else {
            this.state.selectedCategory = this.state.categories[0];
            window.location.hash = 'category/'+this.state.selectedCategory.slug.split('/')[1];
        }

        // Bind all the event callbacks and functions
        this.getProducts = this.getProducts.bind(this);
   }

   /**
    * Returns a category object.
    * @param {String} categorySlug
    */
   getCategory(categorySlug) {
        var category;
        if(categorySlug) {
            category = _.find(this.state.categories, function(category) {
                if (category.slug.indexOf(categorySlug) > -1) {
                    return category;
                }
            });
        }
        if(!categorySlug || !category) {
            category = this.state.categories[0];
        }
        return category;
   }

    componentDidMount() {
        var reactThis = this;

        /* Once the components are mounted get the products under each category */
        this.getProducts(this.state.selectedCategory.id);
        _(this.state.categories).forEach(function(category) {
            if (category.id !== reactThis.state.selectedCategory.id) {
                reactThis.getProducts(category.id);
            }
        });

        var categoryList = $('.categories-list li');
        var currentCategoryElement = _.find(categoryList, function(category) {
            return parseInt(category.value) === reactThis.state.selectedCategory.id;
        });
        $(currentCategoryElement).addClass('selected');

        $('.categories-list li').on('click', function(){
            $('.categories-list li').removeClass('selected');
            $(this).addClass('selected');
        });

        $('.panel-heading a').on('click', function(){
            $(".panel-heading a").removeClass('selected');
            $(this).toggleClass('selected');
        });

        var active = true;
        $('#accordion').on('show.bs.collapse', function () {
            if (active) {
                $('#accordion .in').collapse('hide');
            }
        });

        var link = window.location.hash.split('/')[1];
        $(".collapse").collapse('hide');
        $("#" + link).collapse('show');

        $('body').on('click','.accordion-head', function(){
            $('html, body').animate({
                scrollTop: $('body').offset().top - 50
            }, 500);
        })
    }

    /**
     * Handles the change in category.
     * @param {Object} event - The click event object
     */
    handleCategoryChange(event) {
        var selectedCategoryID = event.target.value; // get the selected category's id
        var currentCategory = _.find(this.state.categories, function(category) {
            return category.id === parseInt(selectedCategoryID) // get the selected category's info
        });
        this.setState({selectedCategory: currentCategory});
        window.location.hash = 'category/'+currentCategory.slug.split('/')[1];
    }

    mobileHandleCategoryChange(event) {
        var selectedCategoryID = event.target.getAttribute('value');; // get the selected category's id
        var currentCategory = _.find(this.state.categories, function(category) {
            return category.id === parseInt(selectedCategoryID) // get the selected category's info
        });
        this.setState({selectedCategory: currentCategory});
        window.location.hash = 'category/'+currentCategory.slug.split('/')[1];
    }

    /**
     * Gets products from the server and set it to the category.
     * @param {Integer} categoryId - Category Id
     */
    getProducts(categoryId) {
        $.ajax({
            url: '/unchained/ecommerce/api/v1/category/'+categoryId+'/products/',
            dataType: 'json',
            cache: false,
            success: function(response) {
                if (response.status_code === 200) {
                    var index = _.findKey(this.state.categories, function(category) {
                        return category.id === categoryId;
                    });
                    var updatedCategories = this.state.categories;
                    updatedCategories[parseInt(index)].products = response.data;
                    this.setState({categories: updatedCategories});
                    if(categoryId === this.state.selectedCategory.id) {
                        this.setState({selectedCategory: updatedCategories[parseInt(index)]});
                    }
                }
                else {
                    console.error('Error fetching products', response.status_code, response.data);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Error fetching products', status, err.toString());
            }.bind(this)
        });
    }

    showMore(i){
        const arr = this.state.showMore || [];
        arr[i] = true;
        this.setState({
            showMore : arr,
            limit : this.state.selectedCategory.products.length
        })
    }

    seeMoreButton(i){
        if (this.state.showMore[i]){
            return null
        }else{
            return (
              <button onClick={this.showMore.bind(this, i)}><i className="glyphicon glyphicon-menu-down"></i></button>
            );
        }
    }

    getCollection(attr){
        let values;
       _(attr).forEach(function(v){
            if(v.name === "Collection"){
                values = v.value
            }
        })

       return values;
    }

    getProductType(attr){
        let values;
       _(attr).forEach(function(v){
            if(v.name === "Product Type"){
                values = v.value
            }
        })

       return values;
    }


    getRenderedComponent() {
        const componentName = "accordion";
        const getSelectedCategoryProducts = (i) =>{
            const arr = this.state.selectedCategory.products;
            return arr.slice(0,(this.state.showMore[i] ? arr.length : 3))
        }
        return (
            <div>
                <div className={"product-listing hidden-xs hidden-sm" + this.props.data.custom_class}>
                    <div className="categories">
                        <div className="categories-list">
                            <ul>
                               {this.state.categories.map((category, i) =>
                                <li key = {i} value={category.id} onClick={this.handleCategoryChange.bind(this)}>{category.name}</li>
                               )}
                            </ul>
                        </div>
                    </div>
                    <div className="products row">
                        <p className="category-description">{this.state.selectedCategory.description}</p>
                        {( this.state.selectedCategory.products.length > 0
                        ?   (this.state.selectedCategory.products.map((product, i) =>
                            <div key = {i} className="col-lg-3 col-md-3 col-sm-6 col-xs-12 product-info">
                                <div className="row product-image">
                                    <img src={product.images[0].url} className="img-responsive" id={"cat-prod-"+ product.images[0].id} alt={product.images[0].alt_text} />
                                </div>
                                <div className="row product-name">
                                    <h2>{this.getCollection(product.attributes)}</h2>
                                    <h6>{this.getProductType(product.attributes)}</h6>
                                    <a href={this.props.data.listing[0].url + product.slug}>Learn More </a>
                                </div>
                            </div>
                            ))
                        :   <div className="loading-content">
                                <img src='/static/img/LC_Leave.gif' />
                            </div>
                        )}
                    </div>
                </div>

                <div className={"mobile-product-listing hidden-md hidden-lg"}>
                    <div className="panel-group" id="accordion">
                        <div className="panel panel-default">
                            {this.state.categories.map((category, j) =>
                                <div key = {j}>
                                    <div className="panel-heading">
                                      <h4 className="panel-title">
                                        <a data-toggle="collapse" className={"collapsed accordion-head accordion-title" + j} data-analytics-id={this.getAnalyticsData(componentName + '_' + (this.state.collapse ? 'close' : 'open') )} data-parent="#accordion" href={"#" + category.name.toLowerCase()} value={category.id} onClick={this.mobileHandleCategoryChange.bind(this)} aria-expanded="false">
                                        {category.name}</a>
                                      </h4>
                                    </div>
                                    <div id={category.name.toLowerCase()} className={"panel-collapse collapse"}>
                                      <div className="panel-body">
                                          {( this.state.selectedCategory.products.length > 0
                                            ?   (getSelectedCategoryProducts(j).map((product, i) =>
                                                <div key = {i} className="col-lg-3 col-md-3 col-sm-6 col-xs-12 product-info">
                                                    <div className="row product-image">
                                                        <img src={product.images[0].url} className="img-responsive" id={"cat-prod-"+ product.images[0].id} alt={product.images[0].alt_text} />
                                                    </div>
                                                    <div className="row product-name">
                                                        <h2>{this.getCollection(product.attributes)}</h2>
                                                        <h6>{this.getProductType(product.attributes)}</h6>
                                                        <a href={this.props.data.listing[0].url + product.slug}>Learn More </a>
                                                    </div>
                                                </div>
                                                ))
                                            :   <div className="loading-content">
                                                    <img src='/static/img/LC_Leave.gif' />
                                                </div>
                                            )}
                                          <div className={"show-more-results " + ((this.state.selectedCategory.products.length  > 3 && !this.state.showMore[j]) ? "show" : "hide")}>
                                            {this.seeMoreButton(j)}
                                          </div>
                                      </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getErrorMessage(ex) {
        console.error("Unchained ERROR: Unable to render the component; ", ex);
        console.error("This might be because you are trying to render a resource listing as PLP. Check the component_id in the admin.");
        return <div className="component-internal-error"></div>
    }

}
