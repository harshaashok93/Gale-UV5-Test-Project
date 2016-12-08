# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0003_auto_20161111_0859'),
        ('wagtailtrans', '0002_auto_20161024_1353')
    ]
    operations = [
        migrations.RunSQL(
            "begin;"
            "alter table article_article drop constraint article_article_pkey CASCADE;"
            "alter table article_article rename column page_ptr_id to t_ptr_id;"

            "alter table article_article add column translatablepage_ptr_id integer;"
            "alter table article_article alter column translatablepage_ptr_id drop default;"
            "update article_article set translatablepage_ptr_id=t_ptr_id;"
            "alter table article_article drop column t_ptr_id;"

            "insert into wagtailtrans_language (code, is_default, position, live) select 'en', 't', 0, 't' where not exists (select code from wagtailtrans_language where code='en');"
            "insert into wagtailtrans_translatablepage (page_ptr_id, canonical_page_id, language_id) select translatablepage_ptr_id, NULL, 1 from article_article;"

            "alter table article_article add constraint d1af3b3e3efc7169c873dbdf0007dc2e foreign key (translatablepage_ptr_id) references wagtailtrans_translatablepage (page_ptr_id) deferrable initially deferred;"
            "alter table article_article alter column translatablepage_ptr_id set not null;"
            "alter table article_article add primary key (translatablepage_ptr_id);"
            "commit;",

            state_operations=[
                migrations.RenameField(
                    model_name='article',
                    old_name='page_ptr',
                    new_name='translatablepage_ptr',
                ),
                migrations.AlterField(
                    model_name='article',
                    name='translatablepage_ptr',
                    field=models.OneToOneField(
                        to='wagtailtrans.TranslatablePage',
                        parent_link=True,
                        serialize=False,
                        auto_created=True,
                        primary_key=True
                    ),
                ),
            ],
        )
    ]
