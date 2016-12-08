# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailtrans', '0002_auto_20161024_1353'),
        ('resource_listing', '0002_auto_20161111_0859'),
    ]
    operations = [
        migrations.RunSQL(
            "begin;"
            "alter table resource_listing_resourcelisting drop constraint resource_listing_resourcelisting_pkey CASCADE;"
            "alter table resource_listing_resourcelisting rename column page_ptr_id to t_ptr_id;"

            "alter table resource_listing_resourcelisting add column translatablepage_ptr_id integer;"
            "alter table resource_listing_resourcelisting alter column translatablepage_ptr_id drop default;"
            "update resource_listing_resourcelisting set translatablepage_ptr_id=t_ptr_id;"
            "alter table resource_listing_resourcelisting drop column t_ptr_id;"

            "insert into wagtailtrans_language (code, is_default, position, live) select 'en', 't', 0, 't' where not exists (select code from wagtailtrans_language where code='en');"
            "insert into wagtailtrans_translatablepage (page_ptr_id, canonical_page_id, language_id) select translatablepage_ptr_id, NULL, 1 from resource_listing_resourcelisting;"

            "alter table resource_listing_resourcelisting add constraint d1af3b3e3efc7169c873dbdf0007dc2e foreign key (translatablepage_ptr_id) references wagtailtrans_translatablepage (page_ptr_id) deferrable initially deferred;"
            "alter table resource_listing_resourcelisting alter column translatablepage_ptr_id set not null;"
            "alter table resource_listing_resourcelisting add primary key (translatablepage_ptr_id);"
            "commit;",

            state_operations=[
                migrations.RenameField(
                    model_name='resourcelisting',
                    old_name='page_ptr',
                    new_name='translatablepage_ptr',
                ),
                migrations.AlterField(
                    model_name='resourcelisting',
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
