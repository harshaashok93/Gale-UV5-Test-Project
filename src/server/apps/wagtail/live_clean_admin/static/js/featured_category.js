featuredCategoryDropdown = undefined;
$(document).on('DOMNodeInserted', function(e) {
    // This function is to replace a category field with a dropdown of categories
    //every time a featured category block is added.

    var elementAdded = e.target

    // check if the DOM element tht got inserted is a resource field

    var featuredCategoryFields = $(elementAdded).find('.fieldname-category');
    if (featuredCategoryFields.length > 0) {
        // If yes, replace the category with a dropdown

        // Create the dropdowns in case they are not created
        if(!featuredCategoryDropdown) {
            featuredCategoryDropdown = createFeaturedCategoryDropdown();
        }

        for( i = 0; i < featuredCategoryFields.length; i++ ) {
            if(!$(featuredCategoryFields[i]).hasClass('dropdown-added')) {
                /* Add the drop down only if it's not yet been added.
                This check is necessary as the event is triggered whenever a new element is added
                Moving this component around in the admin triggers the event and in that
                case, do not add the dropdown again.
                */

                /* Section where the category field is replaced with a dropdown */
                // Hide the actual category input field
                var currentFeaturedCategoryInputElement = $(featuredCategoryFields[i]).find('input');
                $(currentFeaturedCategoryInputElement).hide();
                // Append the dropdown to the correct div
                var currentFeaturedCategoryInputDiv = $(currentFeaturedCategoryInputElement).closest('div');
                $(currentFeaturedCategoryInputDiv).append(featuredCategoryDropdown);

                //Set the value of the dropdown or the input element (for resource type)
                var currentFeaturedCategoryDropdown = $(currentFeaturedCategoryInputDiv).find('.featured-category-dropdown');
                if($.trim($(currentFeaturedCategoryInputElement).val()) != ''){
                    // If there are any previosuly set value, set that as the dropdown's current value
                   $(currentFeaturedCategoryDropdown).val($(currentFeaturedCategoryInputElement).val());
                }
                else {
                    // Set the current category dropdown's initial value as the actual input field's initial value
                    currentFeaturedCategoryInputElement.val(currentFeaturedCategoryDropdown.val());
                }

                $(featuredCategoryFields[i]).addClass('dropdown-added');
                // Indicates that the drop down is added to this component
            }
        }

        // Call back function that inserts the category drop down's value to the original input field
        $('.featured-category-dropdown').change(function(){
            $(this).closest('div').find('input').val(this.value);
        });
    }
});

function createFeaturedCategoryDropdown(){
    var dropdown_html = '';
    $.ajax({
            url: '/unchained/ecommerce/api/categories/',
            async: false,
            type: 'GET',
            success: function(response) {
                if (response.status_code === 200) {
                    var categories = response.data;
                    html = '<select class="featured-category-dropdown">';
                    for(i=0;i<categories.length;i++)
                    {
                        html += '<option value="'+ categories[i].slug +'"class="featured-category-options'+ categories[i].name +'">'+ categories[i].name +'</option>';
                    } 
                    html += '</select>';
                }
            },
    }).done(function(){
        dropdown_html = html;
    });
    return dropdown_html;
}
