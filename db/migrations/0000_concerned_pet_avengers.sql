CREATE TYPE "public"."badge" AS ENUM('Nouveauté', 'Incontournable');--> statement-breakpoint
CREATE TYPE "public"."resource_type" AS ENUM('brochure', 'program', 'guide', 'certificate', 'other');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "certifications" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "certifications_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pageSlug" text DEFAULT '' NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"badge" text,
	"audience" text,
	"href" text DEFAULT '#',
	"groupKey" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"formationId" integer NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"summary" text,
	"duration" text,
	"modality" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "courses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "domains_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"label" text NOT NULL,
	"description" text,
	"iconName" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "domains_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "faqs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"domainId" integer,
	"subCategoryId" integer,
	"formationId" integer,
	"courseId" integer,
	"certificationId" integer,
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "featured_formations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "featured_formations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"formationId" integer NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "featured_formations_formationId_unique" UNIQUE("formationId")
);
--> statement-breakpoint
CREATE TABLE "formation_certifications" (
	"formationId" integer NOT NULL,
	"certificationId" integer NOT NULL,
	CONSTRAINT "formation_certifications_formationId_certificationId_pk" PRIMARY KEY("formationId","certificationId")
);
--> statement-breakpoint
CREATE TABLE "formation_modalities" (
	"formationId" integer NOT NULL,
	"modalityId" integer NOT NULL,
	CONSTRAINT "formation_modalities_formationId_modalityId_pk" PRIMARY KEY("formationId","modalityId")
);
--> statement-breakpoint
CREATE TABLE "formations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "formations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"domainId" integer NOT NULL,
	"subCategoryId" integer,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"summary" text,
	"description" text,
	"price" text,
	"salePrice" text,
	"currency" text DEFAULT 'EUR',
	"taxLabel" text DEFAULT 'HT',
	"priceVisible" boolean DEFAULT true NOT NULL,
	"rating" text,
	"reviewsCount" integer DEFAULT 0,
	"duration" text,
	"badge" "badge",
	"href" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "formations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "modalites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "modalites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"label" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "modalites_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "pdf_resources" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pdf_resources_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"description" text,
	"url" text NOT NULL,
	"resourceType" "resource_type" DEFAULT 'other' NOT NULL,
	"domainId" integer,
	"subCategoryId" integer,
	"formationId" integer,
	"courseId" integer,
	"certificationId" integer,
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "sub_categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sub_categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"domainId" integer NOT NULL,
	"slug" text NOT NULL,
	"label" text NOT NULL,
	"description" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sub_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testimonials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"quote" text NOT NULL,
	"name" text NOT NULL,
	"role" text,
	"rating" integer DEFAULT 5,
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_domainId_domains_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_subCategoryId_sub_categories_id_fk" FOREIGN KEY ("subCategoryId") REFERENCES "public"."sub_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_courseId_courses_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_certificationId_certifications_id_fk" FOREIGN KEY ("certificationId") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "featured_formations" ADD CONSTRAINT "featured_formations_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formation_certifications" ADD CONSTRAINT "formation_certifications_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formation_certifications" ADD CONSTRAINT "formation_certifications_certificationId_certifications_id_fk" FOREIGN KEY ("certificationId") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formation_modalities" ADD CONSTRAINT "formation_modalities_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formation_modalities" ADD CONSTRAINT "formation_modalities_modalityId_modalites_id_fk" FOREIGN KEY ("modalityId") REFERENCES "public"."modalites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formations" ADD CONSTRAINT "formations_domainId_domains_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domains"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formations" ADD CONSTRAINT "formations_subCategoryId_sub_categories_id_fk" FOREIGN KEY ("subCategoryId") REFERENCES "public"."sub_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pdf_resources" ADD CONSTRAINT "pdf_resources_domainId_domains_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pdf_resources" ADD CONSTRAINT "pdf_resources_subCategoryId_sub_categories_id_fk" FOREIGN KEY ("subCategoryId") REFERENCES "public"."sub_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pdf_resources" ADD CONSTRAINT "pdf_resources_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pdf_resources" ADD CONSTRAINT "pdf_resources_courseId_courses_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pdf_resources" ADD CONSTRAINT "pdf_resources_certificationId_certifications_id_fk" FOREIGN KEY ("certificationId") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_domainId_domains_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;