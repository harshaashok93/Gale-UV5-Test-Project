# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_productproperties'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productproperties',
            options={'verbose_name_plural': 'Product Properties', 'verbose_name': 'Product Property'},
        ),
    ]
