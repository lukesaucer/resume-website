import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_photos_category" AS ENUM('life', 'travel', 'pets', 'hobbies', 'other');
  ALTER TYPE "public"."enum_site_settings_social_links_platform" ADD VALUE 'instagram' BEFORE 'twitter';
  ALTER TYPE "public"."enum_site_settings_social_links_platform" ADD VALUE 'facebook' BEFORE 'twitter';
  ALTER TYPE "public"."enum_site_settings_social_links_platform" ADD VALUE 'x' BEFORE 'twitter';
  CREATE TABLE "gallery_photos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"category" "enum_gallery_photos_category" DEFAULT 'life',
  	"show_in_gallery" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_gallery_thumb_url" varchar,
  	"sizes_gallery_thumb_width" numeric,
  	"sizes_gallery_thumb_height" numeric,
  	"sizes_gallery_thumb_mime_type" varchar,
  	"sizes_gallery_thumb_filesize" numeric,
  	"sizes_gallery_thumb_filename" varchar,
  	"sizes_gallery_sidebar_url" varchar,
  	"sizes_gallery_sidebar_width" numeric,
  	"sizes_gallery_sidebar_height" numeric,
  	"sizes_gallery_sidebar_mime_type" varchar,
  	"sizes_gallery_sidebar_filesize" numeric,
  	"sizes_gallery_sidebar_filename" varchar,
  	"sizes_gallery_full_url" varchar,
  	"sizes_gallery_full_width" numeric,
  	"sizes_gallery_full_height" numeric,
  	"sizes_gallery_full_mime_type" varchar,
  	"sizes_gallery_full_filesize" numeric,
  	"sizes_gallery_full_filename" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_photos_id" integer;
  CREATE INDEX "gallery_photos_updated_at_idx" ON "gallery_photos" USING btree ("updated_at");
  CREATE INDEX "gallery_photos_created_at_idx" ON "gallery_photos" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_photos_filename_idx" ON "gallery_photos" USING btree ("filename");
  CREATE INDEX "gallery_photos_sizes_gallery_thumb_sizes_gallery_thumb_f_idx" ON "gallery_photos" USING btree ("sizes_gallery_thumb_filename");
  CREATE INDEX "gallery_photos_sizes_gallery_sidebar_sizes_gallery_sideb_idx" ON "gallery_photos" USING btree ("sizes_gallery_sidebar_filename");
  CREATE INDEX "gallery_photos_sizes_gallery_full_sizes_gallery_full_fil_idx" ON "gallery_photos" USING btree ("sizes_gallery_full_filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_photos_fk" FOREIGN KEY ("gallery_photos_id") REFERENCES "public"."gallery_photos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_gallery_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_photos_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery_photos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "gallery_photos" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_photos_fk";
  
  ALTER TABLE "site_settings_social_links" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('linkedin', 'github', 'twitter', 'email');
  ALTER TABLE "site_settings_social_links" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_site_settings_social_links_platform" USING "platform"::"public"."enum_site_settings_social_links_platform";
  DROP INDEX "payload_locked_documents_rels_gallery_photos_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_photos_id";
  DROP TYPE "public"."enum_gallery_photos_category";`)
}
