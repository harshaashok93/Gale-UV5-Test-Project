from django.conf import settings

from unchained_ui.cms.wagtail.search.client import UnchainedSearchClient


class LiveCleanSearchClient(UnchainedSearchClient):

    def extract_indexed_fields(self, products):
        """Overriding to suggest product names, headine and slug."""
        if hasattr(settings, 'PRODUCT_INDEX_FIELDS'):
            product_index_fields = settings.PRODUCT_INDEX_FIELDS
        else:
            product_index_fields = ['name', 'description', 'attributes', 'meta_description']
        if 'id' not in product_index_fields:
            product_index_fields.append('id')

        extracted_products = []
        for product in products:
            extracted_product = {}
            for field in product_index_fields:
                if field in product:
                    extracted_product[field] = product[field]
                else:
                    raise Exception("%s not present in products" % field)
            extracted_product[self.product_suggest_key] = {
                # Product name is entered incorrectly in Solidus
                # The name is actually a combination of name and "Name Headline" attribute
                "input": product['name'].split() + [product['name']],
                "output": product['name'] + "||" + product['slug'],
            }
            extracted_products.append(extracted_product)
        return extracted_products
