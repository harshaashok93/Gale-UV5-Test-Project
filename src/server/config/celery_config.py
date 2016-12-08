from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings
from kombu import Exchange, Queue


BROKER_URL = os.environ.get('CELERY_BROKER_URL')

# Indicate Celery to use the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

CELERY_DEFAULT_QUEUE_NAME = settings.CACHE_MIDDLEWARE_KEY_PREFIX + "_celery_queue"

app = Celery('config')
app.config_from_object('django.conf:settings')
app.conf.update(
    CELERY_RESULT_BACKEND=BROKER_URL,
    CELERY_DEFAULT_QUEUE=CELERY_DEFAULT_QUEUE_NAME,
    CELERY_QUEUES=(
        Queue(
            CELERY_DEFAULT_QUEUE_NAME,
            Exchange(CELERY_DEFAULT_QUEUE_NAME),
            routing_key=CELERY_DEFAULT_QUEUE_NAME
        ),
    ),
    CELERY_ACCEPT_CONTENT=['json', 'pickle']
)

# This line will tell Celery to autodiscover all your tasks.py that are in your app folders
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
