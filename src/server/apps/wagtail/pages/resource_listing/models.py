from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtailtrans.models import TranslatablePage

from unchained_ui.cms.wagtail.pages.mixins import UnchainedResourceListMixin

from apps.wagtail.blocks.registry import LIVE_CLEAN_PANEL_BLOCKS


class ResourceListing(UnchainedResourceListMixin, TranslatablePage):

    content = StreamField(
        [
            ('row', SnippetChooserBlock('grid.Row')),
        ] + LIVE_CLEAN_PANEL_BLOCKS,
        default=[],
    )

    content_panels = UnchainedResourceListMixin.content_panels + [
        StreamFieldPanel('content'),
    ]
