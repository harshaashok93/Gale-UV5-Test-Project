from __future__ import absolute_import, unicode_literals

from wagtail.wagtailcore import blocks

from unchained_ui.cms.wagtail.blocks.registry import UNCHAINED_COMPONENTS_BLOCKS
from unchained_ui.cms.wagtail.blocks.panels.blocks import ColumnBlock, RowBlock

from apps.wagtail.blocks.registry import LIVE_CLEAN_BLOCKS


class LiveCleanColumnBlock(ColumnBlock):
    """Re-implementing Column block to add custom components"""

    content = blocks.StreamBlock(LIVE_CLEAN_BLOCKS + UNCHAINED_COMPONENTS_BLOCKS)

    class Meta:
        label = 'Column'


class LiveCleanRowBlock(RowBlock):
    """
    Re-implementing Panel(Row) component so that
    it can hold the new ColumnBlock
    """

    content = blocks.StreamBlock([
        ("column", LiveCleanColumnBlock(label='Column'))
    ])

    class Meta:
        label = 'Row'
