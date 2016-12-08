from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtailtrans.models import TranslatablePage

from unchained_ui.cms.wagtail.pages.mixins import (
    UnchainedJSONRendererMixin,
    UnchainedCommonFieldsMixin
)

from apps.wagtail.blocks.registry import LIVE_CLEAN_PANEL_BLOCKS


class Generic(UnchainedJSONRendererMixin, UnchainedCommonFieldsMixin, TranslatablePage):
    """Generic page which contains custom components."""

    content = StreamField(
        [
            ('row', SnippetChooserBlock('grid.Row')),
        ] + LIVE_CLEAN_PANEL_BLOCKS,
        default=[],
    )

    content_panels = UnchainedCommonFieldsMixin.content_panels + [
        StreamFieldPanel('content'),
    ]

    class Meta:
        verbose_name = "Generic Page"
