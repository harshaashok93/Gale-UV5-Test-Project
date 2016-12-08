#!/bin/bash

cp src/server/config/settings/.env.example src/server/config/settings/.env

wget --user admin@example.com --password }t7PnA]u http://hain-liveclean-ui-qa.galepartners.com/backup/hain_liveclean_ui.media.tar.bz2 -O hain_liveclean_ui.media.tar.bz2

tar jxf hain_liveclean_ui.media.tar.bz2

rm -rf hain_liveclean_ui.media.tar.bz2

wget --user admin@example.com --password }t7PnA]u http://hain-liveclean-ui-qa.galepartners.com/backup/hain_liveclean_ui.sql.tar.bz2 -O hain_liveclean_ui.sql.tar.bz2

tar jxf hain_liveclean_ui.sql.tar.bz2
rm -rf hain_liveclean_ui.sql.tar.bz2

docker-compose down

docker-compose up -d database

sleep 5

docker-compose exec database psql -U postgres -c "DROP DATABASE livecleanui;"
docker-compose exec database psql -U postgres -c "CREATE DATABASE livecleanui;"
docker-compose exec database psql -U postgres livecleanui -f /shared/hain_liveclean_ui.sql
rm -rf hain_liveclean_ui.sql

docker-compose down
docker-compose up -d

sleep 5

docker-compose exec app pip install -r src/server/requirements/dev.txt

docker-compose exec app python src/server/manage.py migrate
