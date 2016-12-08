from django.http import Http404
from django.template.response import TemplateResponse
from django.db import models
from django.core.cache import cache

from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtailtrans.models import TranslatablePage
from wagtail.wagtailcore.fields import RichTextField

from unchained_ui.cms.wagtail.utils.wagtail_object_parser import WagtailObjectParser

from unchained_ui.cms.wagtail.pages.mixins import (
    UnchainedProductDetailsMixin,
    UnchainedProductListMixin
)
from unchained_ui.cms.wagtail.pages.utils import (
    register_resource,
    get_product_info,
    get_category_info
)

from apps.wagtail.blocks.registry import LIVE_CLEAN_PANEL_BLOCKS


class ProductListing(UnchainedProductListMixin, TranslatablePage):

    content = StreamField(
        [
            ('row', SnippetChooserBlock('grid.Row')),
        ] + LIVE_CLEAN_PANEL_BLOCKS,
        default=[],
    )

    content_panels = UnchainedProductListMixin.content_panels + [
        StreamFieldPanel('content'),
    ]


class ProductProperties(models.Model):

    name = models.CharField(
        max_length=100,
        help_text="Enter the name of the property as in ecommerce platform."
    )

    presentation_name = RichTextField(
        blank=True,
        null=True,
        help_text="Enter the property name in the format it needs to be rendered."
    )

    description = RichTextField(
        blank=True,
        null=True,
        help_text="Enter the property description in the format it needs to be rendered."
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Product Property"
        verbose_name_plural = "Product Properties"

    def save(self, *args, **kwargs):
        super(ProductProperties, self).save(*args, **kwargs)
        cache.delete('product_properties')


@register_resource
class Product(UnchainedProductDetailsMixin, TranslatablePage):

    parent_page_types = [ProductListing]

    content = StreamField(
        [
            ('row', SnippetChooserBlock('grid.Row')),
        ] + LIVE_CLEAN_PANEL_BLOCKS,
        default=[],
    )

    content_panels = UnchainedProductDetailsMixin.content_panels + [
        StreamFieldPanel('content'),
    ]

    def get_resource_info(self, *args, **kwargs):
        """Returns the product information"""
        if 'product_slug' in kwargs and 'details_page' in kwargs:
            product_information = get_product_info(kwargs['product_slug'])
            category_names = self.extract_category_info(product_information['category_id_list'])
            product_information['category_names'] = category_names
            product_information['attributes'] = self.get_attributes(
                product_information['attributes']
            )
            related_products = list()
            for related_product in product_information['related_products']:
                related_product_info = get_product_info(related_product['slug'])
                related_product_info['relation_type'] = related_product['relation_type']
                related_products.append(related_product_info)
            product_information['related_products'] = related_products

            return product_information
        elif 'product_slug' in kwargs:
            return get_product_info(kwargs['product_slug'])
        else:
            return {}

    def product_details(self, request, *args, **kwargs):
        resource_info = self.get_resource_info(product_slug=kwargs['slug'])
        if 'slug' in kwargs and resource_info:
            context = self.get_context(request, *args, **kwargs)
            self.og_title = resource_info.get('name').title() if resource_info.get('name') else None
            self.og_title += ' | Live Clean'
            self.og_description = resource_info.get('description')
            self.og_url = (request.META['HTTP_HOST'] +
                           resource_info.get('url') if resource_info.get('url') else None)
            self.og_type = 'product.item'
            if self.og_title:
                self.title = self.og_title
            if self.og_description:
                self.search_description = self.og_description
            if resource_info.get('images'):
                images_dict = dict(resource_info.get('images')[0])
                if images_dict.get('url'):
                    self.og_image_url = images_dict.get('url')
            context['content'] = WagtailObjectParser.render(
                self,
                request=request,
                is_page=True,
                page_id=self.id,
                product_slug=kwargs['slug'],
                details_page=True
            )
            return TemplateResponse(
                request,
                'pages/generic/generic_page.html',
                context=context,
            )
        else:
            raise Http404

    def extract_category_info(self, category_id_list):
        """Extracts the category names"""
        categories = get_category_info()
        category_info = list()
        for category_id in category_id_list:
            category = self.get_category(category_id, categories)
            category_info.append(category['name'])
        return category_info

    def get_category(self, category_id, categories):
        """Extracts a category from a list of categories
        if the category's id is present."""
        for category in categories:
            if category['id'] == category_id:
                return category
        return {}

    def get_attributes(self, attributes):
        """Returns attributes with presentation names, if present."""
        product_properties = ProductProperties.objects.all()
        for attribute in attributes:
            attribute_presentation = self.get_attribute_presentation(
                name=attribute['name'],
                product_properties=product_properties)
            # Check if presentation name is present.
            if attribute_presentation and attribute_presentation.presentation_name:
                attribute['presentation_name'] = attribute_presentation.presentation_name
            else:
                attribute['presentation_name'] = attribute['name']
            # Check if description presentation is present.
            if attribute_presentation and attribute_presentation.description:
                attribute['description'] = attribute_presentation.description
            # For attributes under attributes
            if attribute['attributes']:
                for attr in attribute['attributes']:
                    attr_presentation = self.get_attribute_presentation(
                        name=attr['name'],
                        product_properties=product_properties)
                    # Check if presentation name is present.
                    if attr_presentation and attr_presentation.presentation_name:
                        attr['presentation_name'] = attr_presentation.presentation_name
                    else:
                        attribute['presentation_name'] = attribute['name']
                    # Check if description presentation is present.
                    if attr_presentation and attr_presentation.description:
                        attr['description'] = attr_presentation.description
        return attributes

    def get_attribute_presentation(self, name, product_properties):
        attribute = next((attr for attr in product_properties if attr.name == name), None)
        if attribute:
            return attribute
        else:
            return
