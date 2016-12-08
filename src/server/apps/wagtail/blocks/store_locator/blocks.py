from unchained_ui.cms.wagtail.admin.blocks import UnchainedBaseBlock
from wagtail.wagtailcore import blocks


class StoreLocatorBlock(UnchainedBaseBlock):

    source_url = blocks.CharBlock(
        label="Source URL",
        max_length=500,
        required=True,
        help_text="Enter the URL for destini store",
    )

    class Meta:
        label = 'Destini Store Locator'
