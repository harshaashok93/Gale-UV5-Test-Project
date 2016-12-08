# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0005_auto_20161121_0623'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='is_searchable',
            field=models.BooleanField(default=True, help_text='Unchecking this will skip this object for searching or indexing.'),
        ),
    ]
