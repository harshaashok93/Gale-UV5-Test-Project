from unchained_ui.cms.wagtail.admin.blocks import UnchainedBaseBlock
from wagtail.wagtailcore import blocks
from unchained_ui.cms.wagtail.pages.utils import get_category_info


class FeaturedCategoryBlock(UnchainedBaseBlock):

    category = blocks.CharBlock(
        required=True,
        help_text="This category's data will be fetched from the E-Commerce system.",
    )

    class Meta:
        label = 'Featured Category'

    def to_json(self, field, *args, **kwargs):
        # Get the value(slug) of the featured category chosen and return the details of that category.
        category_slug = field['category']
        categories = get_category_info()
        featured_category = next((category for category in categories if category[
            'slug'] == category_slug), {})
        return {'featured_category': featured_category}
