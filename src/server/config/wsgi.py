# -*- coding: utf-8 -*-
"""
WSGI config for unchained-5-mvp project.

It exposes the WSGI callable as a module-level variable named ``application``.

https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

application = get_wsgi_application()

from whitenoise.django import DjangoWhiteNoise
application = DjangoWhiteNoise(application)
