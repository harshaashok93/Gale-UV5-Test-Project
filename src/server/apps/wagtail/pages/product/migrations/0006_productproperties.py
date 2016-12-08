# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_auto_20161121_0623'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductProperties',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(max_length=100, help_text='Enter the name of the property as in ecommerce platform.')),
                ('presentation_name', wagtail.wagtailcore.fields.RichTextField(help_text='Enter the property name in the format it needs to be rendered.', null=True, blank=True)),
            ],
        ),
    ]
