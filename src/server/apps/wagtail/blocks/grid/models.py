from wagtail.wagtailcore import fields
from wagtail.wagtailsnippets.models import register_snippet
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock


from apps.wagtail.blocks.registry import LIVE_CLEAN_BLOCKS
from unchained_ui.cms.wagtail.blocks.registry import UNCHAINED_COMPONENTS_BLOCKS
from unchained_ui.cms.wagtail.blocks.grid.mixins import RowMixin, ColumnMixin


@register_snippet
class Row(RowMixin):
    content = fields.StreamField([
        ('column', SnippetChooserBlock('grid.Column')),
    ])

    panels = RowMixin.panels + [
        StreamFieldPanel('content'),
    ]


@register_snippet
class Column(ColumnMixin):

    content = fields.StreamField([
        ('row', SnippetChooserBlock('grid.Row')),
    ] + LIVE_CLEAN_BLOCKS + UNCHAINED_COMPONENTS_BLOCKS)

    panels = ColumnMixin.panels + [
        StreamFieldPanel('content'),
    ]
