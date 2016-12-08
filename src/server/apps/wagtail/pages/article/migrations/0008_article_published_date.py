# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0007_article_video_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='published_date',
            field=models.DateField(help_text='Pick the published date of the article.', null=True, blank=True),
        ),
    ]
