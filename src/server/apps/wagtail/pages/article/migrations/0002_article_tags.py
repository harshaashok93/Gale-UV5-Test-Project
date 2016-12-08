# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import unchained_ui.cms.wagtail.blocks.tag.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0002_auto_20150616_2121'),
        ('article', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='tags',
            field=unchained_ui.cms.wagtail.blocks.tag.managers.UnchainedTaggableManager(to='taggit.Tag', help_text='A comma-separated list of tags.', through='taggit.TaggedItem', blank=True, verbose_name='Tags'),
        ),
    ]
