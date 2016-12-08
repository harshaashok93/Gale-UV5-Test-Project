from wagtail.contrib.modeladmin.options import (
    ModelAdmin,
    modeladmin_register
)
from .models import ProductProperties


class ProductPropertiesModelAdmin(ModelAdmin):
    model = ProductProperties
    menu_label = 'Product Properties'
    menu_icon = 'doc-full-inverse'
    add_to_settings_menu = False
    search_fields = ('name', )
    list_display = ('name', )


modeladmin_register(ProductPropertiesModelAdmin)
