# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import environ

env = environ.Env()
environ.Env.read_env()  # reading .env file


# ------------------------------------------------------------------------------
# UNCHAINED SETTINGS
# ------------------------------------------------------------------------------
UNCHAINED_PIM_ADAPTER = env('UNCHAINED_PIM_ADAPTER')
UNCHAINED_OMS_ADAPTER = env('UNCHAINED_OMS_ADAPTER')
UNCHAINED_USER_PROFILE_ADAPTER = env('UNCHAINED_USER_PROFILE_ADAPTER')
UNCHAINED_MARKETING_ADAPTER = env('UNCHAINED_MARKETING_ADAPTER')

# ------------------------------------------------------------------------------
# SOLIDUS SETTINGS
# ------------------------------------------------------------------------------
SOLIDUS_USE_BASIC_AUTH = env.bool('SOLIDUS_USE_BASIC_AUTH')
SOLIDUS_AUTH_USER = env('SOLIDUS_AUTH_USER')
SOLIDUS_AUTH_PASSWD = env('SOLIDUS_AUTH_PASSWD')
SOLIDUS_API_URL = env('SOLIDUS_API_URL')
SOLIDUS_MEDIA_URL = env('SOLIDUS_MEDIA_URL')
SOLIDUS_API_KEY = env('SOLIDUS_API_KEY')

# Enter the category root node permalink, get_categories() call is made based on this value.
SOLIDUS_CATEGORY_ROOT_NODE = env('SOLIDUS_CATEGORY_ROOT_NODE')

# Only for testing
SOLIDUS_MOCK_DATA = env.bool('SOLIDUS_MOCK_DATA')
