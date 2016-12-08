# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import environ
import os


ROOT_DIR = environ.Path(__file__) - 5  # (/a/b/myfile.py - 5 = /)

SRC_DIR = ROOT_DIR.path('src')  # used to derive path
SRC_PATH = str(SRC_DIR.path())

SERVER_DIR = SRC_DIR.path('server')
SERVER_PATH = str(SERVER_DIR.path())

CLIENT_DIR = SRC_DIR.path('client')
CLIENT_PATH = str(CLIENT_DIR.path())

env = environ.Env()
environ.Env.read_env()  # reading .env file

SECRET_KEY = env("DJANGO_SECRET_KEY")
DEBUG = env.bool("DJANGO_DEBUG")
USE_ETAGS = env.bool("DJANGO_USE_ETAGS")


DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
)

THIRD_PARTY_APPS = (
    'django_extensions',
    'overextends',
    'taggit',
    'modelcluster',
    'sekizai',
    'wagtail.wagtailcore',
    'hitcount',
    'social.apps.django_app.default',

    # these apps modify the admin, so it must come before wagtail.wagtailadmin.,
    'unchained_ui.cms.wagtail.admin',
    'apps.wagtail.live_clean_admin',

    'wagtail.wagtailadmin',
    'wagtail.wagtaildocs',
    'wagtail.wagtailsnippets',
    'wagtail.wagtailusers',
    'wagtail.wagtailimages',
    'wagtail.wagtailsearch',
    'wagtail.wagtailsites',
    'wagtail.wagtailredirects',
    'wagtail.wagtailforms',
    'wagtail.wagtailembeds',
    'wagtail.contrib.wagtailapi',
    'wagtail.contrib.wagtailstyleguide',
    'wagtail.contrib.settings',
    'wagtail.contrib.modeladmin',
    'wagtail.contrib.table_block',
    'wagtail.contrib.wagtailsitemaps',
    'wagtailfontawesome',
    'rest_framework',
    'rest_framework.authtoken',
    'wagtailtrans',
)

UNCHAINED_APPS = (
    'unchained_ui.cms.core',
    'unchained_ui.cms.notifications',
    'unchained_ui.cms.countries',
    'unchained_ui.cms.errorcodes',
    'unchained_ui.cms.accounts',

    'unchained_ui.cms.wagtail.custom_settings',
    'unchained_ui.cms.wagtail.blocks.forms',
    'unchained_ui.cms.wagtail.search',
    'unchained_ui.cms.wagtail.pagesync',
    'unchained_ui.cms.page_views',

    'unchained_ui.ecommerce',
    'unchained_ui.loyalty',
    'unchained_ui.platform',
)

LOCAL_APPS = (
    # Row and Column Snippets
    'apps.wagtail.blocks.grid',

    # Pages
    'apps.wagtail.pages.generic',
    'apps.wagtail.pages.article',
    'apps.wagtail.pages.product',
    'apps.wagtail.pages.resource_listing',

    # Custom Apps
    'apps.wagtail.search',
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + UNCHAINED_APPS + LOCAL_APPS

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'wagtail.wagtailcore.middleware.SiteMiddleware',
    'wagtail.wagtailredirects.middleware.RedirectMiddleware',
    'social.apps.django_app.middleware.SocialAuthExceptionMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env("DJANGO_DB_NAME"),
        'USER': env("DJANGO_DB_USER"),
        'PASSWORD': env("DJANGO_DB_PASSWORD"),
        'HOST': env("DJANGO_DB_HOST"),
        'PORT': env("DJANGO_DB_PORT"),
    }
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [
        os.path.join(SERVER_PATH, "templates"),
    ],
    'OPTIONS': {
        'debug': DEBUG,
        'loaders': [
            'django.template.loaders.filesystem.Loader',
            'django.template.loaders.app_directories.Loader',
        ],
        'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages',
            'sekizai.context_processors.sekizai',
            'django.core.context_processors.i18n',
            'django.core.context_processors.request',
            'django.core.context_processors.media',
            'django.core.context_processors.static',
            'wagtail.contrib.settings.context_processors.settings',
            'social.apps.django_app.context_processors.backends',
            'social.apps.django_app.context_processors.login_redirect',
        ],
    },
}]

# Authentication Backends settings for Python Social Auth
AUTHENTICATION_BACKENDS = (
    'social.backends.facebook.FacebookOAuth2',
    'social.backends.instagram.InstagramOAuth2',
    'social.backends.twitter.TwitterOAuth',
    'social.backends.google.GoogleOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

# Pipeline settings for Python Social Auth Middleware
SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'unchained_ui.cms.accounts.pipelines.associate_user',
)

# Python Social Auth Facebook settings
SOCIAL_AUTH_LOGIN_ERROR_URL = "/cms/accounts/socialaccount/"

if not DEBUG:
    TEMPLATES[0]['OPTIONS']['loaders'] = [
        ('django.template.loaders.cached.Loader', [
            'django.template.loaders.filesystem.Loader',
            'django.template.loaders.app_directories.Loader',
        ]),
    ]


STATIC_ROOT = env("STATIC_ROOT")
STATIC_HOST = env("STATIC_HOST")
STATIC_URL = STATIC_HOST + '/static/'

STATICFILES_DIRS = (
    str(SERVER_DIR.path('static')),
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

MEDIA_ROOT = env("MEDIA_ROOT")
MEDIA_URL = '/media/'


# ------------------------------------------------------------------------------
# Cache Configuration
# ------------------------------------------------------------------------------

CACHES = {
    'default': {
        'BACKEND': env("DJANGO_CACHES_BACKEND"),
        'LOCATION': env("DJANGO_CACHES_LOCATION"),
        'TIMEOUT': env.int('DJANGO_CACHES_TIMEOUT'),
        'KEY_PREFIX': 'hain_liveclean_ui',
    }
}

CACHE_MIDDLEWARE_ALIAS = 'default'
# Change this for different projects.
CACHE_MIDDLEWARE_KEY_PREFIX = "liveclean"
CACHE_MIDDLEWARE_SECONDS = 600  # cache for 10 min


# ------------------------------------------------------------------------------
# Search Configurations
# ------------------------------------------------------------------------------
WAGTAILSEARCH_BACKENDS = {
    'default': {
        'BACKEND': 'wagtail.wagtailsearch.backends.elasticsearch.ElasticSearch',
        'URLS': env.list("WAGTAILSEARCH_URLS"),
        'INDEX': env("WAGTAILSEARCH_INDEX"),
        'TIMEOUT': env.int("WAGTAILSEARCH_TIMEOUT"),
    }
}
UNCHAINED_SEARCH_BACKENDS = {
    'default': {
        'BACKEND': 'unchained_ui.cms.wagtail.search.backend.elasticsearch.UnchainedElasticsearchBackend',
        'URLS': env.list("WAGTAILSEARCH_URLS"),
        'INDEX': env("UNCHAINEDSEARCH_INDEX"),
        'TIMEOUT': env.int("WAGTAILSEARCH_TIMEOUT"),
    }
}
SEARCH_HOST = env("SEARCH_HOST")
SEARCH_PORT = env("SEARCH_PORT")
SELECTABLE_BLOCK_SEARCH = env.bool("SELECTABLE_BLOCK_SEARCH")
PRODUCT_INDEX = env("PRODUCT_INDEX")
PRODUCT_INDEX_FIELDS = env.list("PRODUCT_INDEX_FIELDS")


# ------------------------------------------------------------------------------
# URL Configuration
# ------------------------------------------------------------------------------

ROOT_URLCONF = 'config.urls'


# ------------------------------------------------------------------------------
# OTHER Configuration
# ------------------------------------------------------------------------------

ADMINS = (
    ("""GALE Partners""", 'vu@galepartners.com'),
)

# See: https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS


WSGI_APPLICATION = 'config.wsgi.application'

# ------------------------------------------------------------------------------
# LOGGING INFORMATION
# ------------------------------------------------------------------------------

LOG_DIR = env("LOG_DIR")

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'formatters': {
        'verbose': {
            'format': "[%(levelname)s] -- %(asctime)s -- %(module)s:%(lineno)s ___ %(message)s >>> "
                      "{ process: %(process)d | thread: %(thread)d }",
            'datefmt': "%b %e, %I:%M:%S %p"
        },
        'simple': {
            'format': '[%(levelname)s] -- %(message)s'
        },
    },
    'handlers': {
        'mail_admins': {
            'filters': ['require_debug_false', ],
            'class': 'django.utils.log.AdminEmailHandler',
            'include_html': True,
            'level': 'ERROR',
        },
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file_error': {
            'class': 'logging.FileHandler',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': LOG_DIR + '/django.log',
            'maxBytes': 20 * 1024 * 1024,
            'formatter': 'verbose',
            'backupCount': 7,  # Keep a week worth of backups.
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['file_error', 'mail_admins', ],
            'level': 'ERROR',
            'propagate': True
        },
        'django.security.DisallowedHost': {
            'level': 'ERROR',
            'handlers': ['file_error', 'console', 'mail_admins', ],
            'propagate': True
        },
        'development': {
            'handlers': ['console', ],
            'level': 'DEBUG',
            'propagate': True
        },
        'application': {
            'handlers': ['file_error', 'mail_admins'],
            'level': 'DEBUG',
            'propagate': True
        },
    },
}

# ------------------------------------------------------------------------------
# Django Debug Toolbar Configuration
# ------------------------------------------------------------------------------

if DEBUG:
    MIDDLEWARE_CLASSES += ('debug_toolbar.middleware.DebugToolbarMiddleware',)
    INSTALLED_APPS = ('debug_toolbar',) + INSTALLED_APPS
    DEBUG_TOOLBAR_PATCH_SETTINGS = False
    INTERNAL_IPS = ('127.0.0.1', '0.0.0.0', 'localhost',)

    def show_toolbar(request):
        request.META["wsgi.multithread"] = True
        request.META["wsgi.multiprocess"] = True
        excluded_urls = ['/pages/preview/', '/pages/preview_loading/', '/edit/preview/']
        excluded = any(request.path.endswith(url) for url in excluded_urls)
        return DEBUG and not excluded

    DEBUG_TOOLBAR_CONFIG = {"SHOW_TOOLBAR_CALLBACK": show_toolbar, }


# ------------------------------------------------------------------------------
# Django Email Configurations
# ------------------------------------------------------------------------------

EMAIL_BACKEND = env('EMAIL_BACKEND')
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = env('EMAIL_USE_TLS')
FROM_EMAIL = "no-reply@liveclean.com"

# ------------------------------------------------------------------------------
# Rest Framework Configuration
# ------------------------------------------------------------------------------

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly'
    ],
}

# ------------------------------------------------------------------------------
# PageSync config
# ------------------------------------------------------------------------------

API_URL = "/unchained/cms/wagtail-api/v1/pages/"
LOCAL_SERVER_URL = env('LOCAL_SERVER_URL', default='localhost:8000')
API_PUSH_URL = "/unchained/cms/pagesync/post/"
UPSTREAM_SERVER = env('UPSTREAM_SERVER')
UPSTREAM_AUTH_USERNAME = env('UPSTREAM_AUTH_USERNAME')
UPSTREAM_AUTH_PASSWORD = env('UPSTREAM_AUTH_PASSWORD')
UPSTREAM_URL = UPSTREAM_SERVER + API_URL
PAGE_SYNC_UPSTREAM_TOKEN = env('PAGE_SYNC_UPSTREAM_TOKEN')
UPSTREAM_PUSH_URL = UPSTREAM_SERVER + API_PUSH_URL
