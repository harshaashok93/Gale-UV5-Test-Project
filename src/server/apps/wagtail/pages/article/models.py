from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtailtrans.models import TranslatablePage
from wagtail.wagtailsearch import index

from unchained_ui.cms.wagtail.pages.mixins import UnchainedResourceMixin
from unchained_ui.cms.wagtail.pages.utils import register_resource
from unchained_ui.cms.wagtail.search.index import UnchainedIndexed


from apps.wagtail.blocks.registry import LIVE_CLEAN_PANEL_BLOCKS


@register_resource
class Article(UnchainedResourceMixin, TranslatablePage, UnchainedIndexed):

    published_date = models.DateField(
        null=True,
        blank=True,
        help_text='Pick the published date of the article.'
    )

    video_url = models.URLField(
        max_length=255,
        help_text="Provide the youtube embed link in the following format:"
        "'https://www.youtube.com/embed/kfvxmEuC7bU'",
        blank=True,
    )

    core_fields = UnchainedResourceMixin.core_fields + ['video_url'] + ['published_date']

    parent_page_types = ['resource_listing.ResourceListing']

    content = StreamField(
        [
            ('row', SnippetChooserBlock('grid.Row')),
        ] + LIVE_CLEAN_PANEL_BLOCKS,
        default=[],
    )

    content_panels = UnchainedResourceMixin.content_panels + [
        FieldPanel('published_date'),
        FieldPanel('video_url'),
        StreamFieldPanel('content'),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('teaser'),
        index.SearchField('content'),
    ]

    settings_panels = UnchainedResourceMixin.settings_panels + [
        FieldPanel('is_searchable'),
    ]
