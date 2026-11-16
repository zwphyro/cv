import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_experience_jobs_projects_start_tz" AS ENUM('UTC');
  CREATE TYPE "public"."enum_homepage_experience_jobs_projects_end_tz" AS ENUM('UTC');
  CREATE TYPE "public"."enum_homepage_experience_jobs_start_tz" AS ENUM('UTC');
  CREATE TYPE "public"."enum_homepage_experience_jobs_end_tz" AS ENUM('UTC');
  CREATE TYPE "public"."enum_homepage_education_items_start_tz" AS ENUM('UTC');
  CREATE TYPE "public"."enum_homepage_education_items_end_tz" AS ENUM('UTC');
  ALTER TABLE "homepage_experience_jobs_projects" ADD COLUMN "start_tz" "enum_homepage_experience_jobs_projects_start_tz" DEFAULT 'UTC' NOT NULL;
  ALTER TABLE "homepage_experience_jobs_projects" ADD COLUMN "end_tz" "enum_homepage_experience_jobs_projects_end_tz" DEFAULT 'UTC';
  ALTER TABLE "homepage_experience_jobs" ADD COLUMN "start_tz" "enum_homepage_experience_jobs_start_tz" DEFAULT 'UTC' NOT NULL;
  ALTER TABLE "homepage_experience_jobs" ADD COLUMN "end_tz" "enum_homepage_experience_jobs_end_tz" DEFAULT 'UTC';
  ALTER TABLE "homepage_education_items" ADD COLUMN "start_tz" "enum_homepage_education_items_start_tz" DEFAULT 'UTC' NOT NULL;
  ALTER TABLE "homepage_education_items" ADD COLUMN "end_tz" "enum_homepage_education_items_end_tz" DEFAULT 'UTC';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_experience_jobs_projects" DROP COLUMN "start_tz";
  ALTER TABLE "homepage_experience_jobs_projects" DROP COLUMN "end_tz";
  ALTER TABLE "homepage_experience_jobs" DROP COLUMN "start_tz";
  ALTER TABLE "homepage_experience_jobs" DROP COLUMN "end_tz";
  ALTER TABLE "homepage_education_items" DROP COLUMN "start_tz";
  ALTER TABLE "homepage_education_items" DROP COLUMN "end_tz";
  DROP TYPE "public"."enum_homepage_experience_jobs_projects_start_tz";
  DROP TYPE "public"."enum_homepage_experience_jobs_projects_end_tz";
  DROP TYPE "public"."enum_homepage_experience_jobs_start_tz";
  DROP TYPE "public"."enum_homepage_experience_jobs_end_tz";
  DROP TYPE "public"."enum_homepage_education_items_start_tz";
  DROP TYPE "public"."enum_homepage_education_items_end_tz";`)
}
