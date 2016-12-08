# -*- coding: utf-8 -*-
"""unchained-5-mvp URL Configuration

https://docs.djangoproject.com/en/1.8/topics/http/urls/

"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from wagtail.wagtailimages.views.serve import ServeView

from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls
from wagtail.contrib.wagtailapi import urls as wagtailapi_urls
from wagtail.contrib.wagtailsitemaps.views import sitemap

from unchained_ui.ecommerce.apis import urls as unchained_ecommerce_apis
from unchained_ui.cms.core import urls as unchained_cms_apis

from unchained_ui.cms.errorcodes.views import custom_400, custom_404, custom_500

from apps.wagtail.search.views import get_product_suggestion
# Error URLS
handler400 = custom_400
handler404 = custom_404
handler500 = custom_500

# SEO URLS
urlpatterns = [
    # url(r'^sitemap\.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': {'cmspages': CMSSitemap}}),
]

# API URLS
urlpatterns += [
    url('^sitemap\.xml$', sitemap),
    url(r'^cms/api/', include(wagtailapi_urls)),
    url(r'^unchained/cms/', include(unchained_cms_apis, namespace='unchained-cms-apis')),
    url(r'^unchained/ecommerce/', include(unchained_ecommerce_apis, namespace='unchained-ecommerce-apis')),
    url(r'^api/search/suggest/$', get_product_suggestion),
]

# SOCIAL URLS
urlpatterns += [
    url('', include('social.apps.django_app.urls', namespace='social')),
]

# SOCIAL ACCOUNT URLS
urlpatterns += [
    url('', include('unchained_ui.cms.accounts.urls', namespace='social_account')),
]


# CMS URLS
urlpatterns += [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^cms/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),
    url(r'^', include(wagtail_urls)),

    # For Wagtail Image renditions
    url(r'^images/([^/]*)/(\d*)/([^/]*)/[^/]*$', ServeView.as_view(), name='wagtailimages_serve')
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + urlpatterns
    urlpatterns = [url(r'^__debug__/', include(debug_toolbar.urls)), ] + urlpatterns
