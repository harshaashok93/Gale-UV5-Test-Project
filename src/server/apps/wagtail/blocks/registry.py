from apps.wagtail.blocks.store_locator.blocks import StoreLocatorBlock
from apps.wagtail.blocks.featured_category.blocks import FeaturedCategoryBlock
from unchained_ui.cms.wagtail.blocks.social.blocks import (
    SocialPostBlock,
    SocialFeedBlock
)

# Components that do have any other types of components inside them
LIVE_CLEAN_SIMPLE_BLOCKS = [
    ('store_locator', StoreLocatorBlock()),
    ('featured_category', FeaturedCategoryBlock()),
    ('social_post', SocialPostBlock()),
    ('social_feed', SocialFeedBlock()),
]

# Components that can contain other components inside
LIVE_CLEAN_COMPLEX_BLOCKS = []

LIVE_CLEAN_BLOCKS = LIVE_CLEAN_SIMPLE_BLOCKS + LIVE_CLEAN_COMPLEX_BLOCKS  # noqa

from apps.wagtail.blocks.panels.blocks import LiveCleanRowBlock  # noqa

LIVE_CLEAN_PANEL_BLOCKS = [
    ('panel', LiveCleanRowBlock()),
]
