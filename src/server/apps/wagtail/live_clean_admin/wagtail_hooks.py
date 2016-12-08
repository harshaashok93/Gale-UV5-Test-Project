from django.utils.html import format_html_join
from django.conf import settings

from wagtail.wagtailcore import hooks


@hooks.register('insert_global_admin_js')
def admin_js():

    js_files = [
        'js/featured_category.js',
    ]
    js_includes = format_html_join('\n', '<script src="{0}{1}"></script>', (
        (settings.STATIC_URL, filename)
        for filename in js_files)
    )
    return js_includes
