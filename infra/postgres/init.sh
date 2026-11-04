#!/usr/bin/env bash
# Creates application databases and their owners.
set -euo pipefail

: "${BACKEND_DB_NAME:?}" "${BACKEND_DB_USER:?}" "${BACKEND_DB_PASSWORD:?}"
: "${CMS_DB_NAME:?}" "${CMS_DB_USER:?}" "${CMS_DB_PASSWORD:?}"

create_database() {
  local db_name="$1" db_user="$2" db_password="$3"

  echo "init: creating database \"$db_name\" owned by \"$db_user\""

  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres \
    -v db_name="$db_name" \
    -v db_user="$db_user" \
    -v db_password="$db_password" <<-'EOSQL'
		CREATE ROLE :"db_user" LOGIN PASSWORD :'db_password';
		CREATE DATABASE :"db_name" OWNER :"db_user";
		REVOKE ALL ON DATABASE :"db_name" FROM PUBLIC;
	EOSQL
}

create_database "$BACKEND_DB_NAME" "$BACKEND_DB_USER" "$BACKEND_DB_PASSWORD"
create_database "$CMS_DB_NAME" "$CMS_DB_USER" "$CMS_DB_PASSWORD"
