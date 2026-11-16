import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en');
  CREATE TYPE "public"."enum_site_contacts_kind" AS ENUM('email', 'telegram', 'phone', 'linkedin', 'github', 'other');
  CREATE TYPE "public"."enum_site_contacts_quick_contact" AS ENUM('none', 'primary', 'secondary');
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_site_contacts_kind" NOT NULL,
  	"quick_contact" "enum_site_contacts_quick_contact" DEFAULT 'none' NOT NULL,
  	"value" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_contacts_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_locales" (
  	"name" varchar NOT NULL,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"cv_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_hero_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "homepage_hero_facts_locales" (
  	"value" varchar NOT NULL,
  	"caption" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_skills_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"since" numeric NOT NULL
  );
  
  CREATE TABLE "homepage_skills_groups_items_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_skills_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_skills_groups_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_experience_jobs_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start" timestamp(3) with time zone NOT NULL,
  	"end" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_experience_jobs_projects_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_experience_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start" timestamp(3) with time zone NOT NULL,
  	"end" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_experience_jobs_locales" (
  	"position" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"location" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_education_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start" timestamp(3) with time zone NOT NULL,
  	"end" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_education_items_locales" (
  	"degree" varchar NOT NULL,
  	"institution" varchar NOT NULL,
  	"details" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_education_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_education_languages_locales" (
  	"name" varchar NOT NULL,
  	"level" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"hero_status" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"skills_title" varchar NOT NULL,
  	"skills_nav_label" varchar NOT NULL,
  	"skills_intro" varchar NOT NULL,
  	"experience_title" varchar NOT NULL,
  	"experience_nav_label" varchar NOT NULL,
  	"education_title" varchar NOT NULL,
  	"education_nav_label" varchar NOT NULL,
  	"education_languages_title" varchar NOT NULL,
  	"contact_title" varchar NOT NULL,
  	"contact_nav_label" varchar NOT NULL,
  	"contact_body" jsonb NOT NULL,
  	"contact_form_title" varchar NOT NULL,
  	"contact_success_message" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_contacts" ADD CONSTRAINT "site_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_contacts_locales" ADD CONSTRAINT "site_contacts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_cv_id_media_id_fk" FOREIGN KEY ("cv_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_facts" ADD CONSTRAINT "homepage_hero_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_facts_locales" ADD CONSTRAINT "homepage_hero_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_hero_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_groups_items" ADD CONSTRAINT "homepage_skills_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_groups_items_locales" ADD CONSTRAINT "homepage_skills_groups_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_groups_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_groups" ADD CONSTRAINT "homepage_skills_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_groups_locales" ADD CONSTRAINT "homepage_skills_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_experience_jobs_projects" ADD CONSTRAINT "homepage_experience_jobs_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_experience_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_experience_jobs_projects_locales" ADD CONSTRAINT "homepage_experience_jobs_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_experience_jobs_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_experience_jobs" ADD CONSTRAINT "homepage_experience_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_experience_jobs_locales" ADD CONSTRAINT "homepage_experience_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_experience_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_education_items" ADD CONSTRAINT "homepage_education_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_education_items_locales" ADD CONSTRAINT "homepage_education_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_education_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_education_languages" ADD CONSTRAINT "homepage_education_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_education_languages_locales" ADD CONSTRAINT "homepage_education_languages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_education_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_texts" ADD CONSTRAINT "homepage_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "site_contacts_order_idx" ON "site_contacts" USING btree ("_order");
  CREATE INDEX "site_contacts_parent_id_idx" ON "site_contacts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_contacts_locales_locale_parent_id_unique" ON "site_contacts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_contacts_locales_parent_id_idx" ON "site_contacts_locales" USING btree ("_parent_id");
  CREATE INDEX "site_cv_idx" ON "site_locales" USING btree ("cv_id","_locale");
  CREATE UNIQUE INDEX "site_locales_locale_parent_id_unique" ON "site_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_locales_parent_id_idx" ON "site_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_facts_order_idx" ON "homepage_hero_facts" USING btree ("_order");
  CREATE INDEX "homepage_hero_facts_parent_id_idx" ON "homepage_hero_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_hero_facts_locales_locale_parent_id_unique" ON "homepage_hero_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_hero_facts_locales_parent_id_idx" ON "homepage_hero_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_groups_items_order_idx" ON "homepage_skills_groups_items" USING btree ("_order");
  CREATE INDEX "homepage_skills_groups_items_parent_id_idx" ON "homepage_skills_groups_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_skills_groups_items_locales_locale_parent_id_unique" ON "homepage_skills_groups_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_skills_groups_items_locales_parent_id_idx" ON "homepage_skills_groups_items_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_groups_order_idx" ON "homepage_skills_groups" USING btree ("_order");
  CREATE INDEX "homepage_skills_groups_parent_id_idx" ON "homepage_skills_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_skills_groups_locales_locale_parent_id_unique" ON "homepage_skills_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_skills_groups_locales_parent_id_idx" ON "homepage_skills_groups_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_experience_jobs_projects_order_idx" ON "homepage_experience_jobs_projects" USING btree ("_order");
  CREATE INDEX "homepage_experience_jobs_projects_parent_id_idx" ON "homepage_experience_jobs_projects" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_experience_jobs_projects_locales_locale_parent_id_u" ON "homepage_experience_jobs_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_experience_jobs_projects_locales_parent_id_idx" ON "homepage_experience_jobs_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_experience_jobs_order_idx" ON "homepage_experience_jobs" USING btree ("_order");
  CREATE INDEX "homepage_experience_jobs_parent_id_idx" ON "homepage_experience_jobs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_experience_jobs_locales_locale_parent_id_unique" ON "homepage_experience_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_experience_jobs_locales_parent_id_idx" ON "homepage_experience_jobs_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_education_items_order_idx" ON "homepage_education_items" USING btree ("_order");
  CREATE INDEX "homepage_education_items_parent_id_idx" ON "homepage_education_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_education_items_locales_locale_parent_id_unique" ON "homepage_education_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_education_items_locales_parent_id_idx" ON "homepage_education_items_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_education_languages_order_idx" ON "homepage_education_languages" USING btree ("_order");
  CREATE INDEX "homepage_education_languages_parent_id_idx" ON "homepage_education_languages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_education_languages_locales_locale_parent_id_unique" ON "homepage_education_languages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_education_languages_locales_parent_id_idx" ON "homepage_education_languages_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_locales_parent_id_idx" ON "homepage_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_texts_order_parent" ON "homepage_texts" USING btree ("order","parent_id");
  ALTER TABLE "media" DROP COLUMN "alt";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media_locales" CASCADE;
  DROP TABLE "site_contacts" CASCADE;
  DROP TABLE "site_contacts_locales" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "site_locales" CASCADE;
  DROP TABLE "homepage_hero_facts" CASCADE;
  DROP TABLE "homepage_hero_facts_locales" CASCADE;
  DROP TABLE "homepage_skills_groups_items" CASCADE;
  DROP TABLE "homepage_skills_groups_items_locales" CASCADE;
  DROP TABLE "homepage_skills_groups" CASCADE;
  DROP TABLE "homepage_skills_groups_locales" CASCADE;
  DROP TABLE "homepage_experience_jobs_projects" CASCADE;
  DROP TABLE "homepage_experience_jobs_projects_locales" CASCADE;
  DROP TABLE "homepage_experience_jobs" CASCADE;
  DROP TABLE "homepage_experience_jobs_locales" CASCADE;
  DROP TABLE "homepage_education_items" CASCADE;
  DROP TABLE "homepage_education_items_locales" CASCADE;
  DROP TABLE "homepage_education_languages" CASCADE;
  DROP TABLE "homepage_education_languages_locales" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "homepage_texts" CASCADE;
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_site_contacts_kind";
  DROP TYPE "public"."enum_site_contacts_quick_contact";`)
}
