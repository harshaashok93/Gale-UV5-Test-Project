# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0006_article_is_searchable'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='video_url',
            field=models.URLField(help_text="Provide the youtube embed link in the following format:'https://www.youtube.com/embed/kfvxmEuC7bU'", max_length=255, blank=True),
        ),
    ]
