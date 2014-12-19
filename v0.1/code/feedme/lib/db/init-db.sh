#! /bin/bash

psql --file=dbTables.sql --dbname=feedme
node load_test_data.js
node subscribe_users_to_sources.js
node subscribe_users_to_feeders.js