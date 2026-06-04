CREATE TABLE "catalogue_requests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "catalogue_requests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"roleOther" text,
	"catalogueSlugs" text[] DEFAULT '{}'::text[] NOT NULL,
	"locale" text DEFAULT 'fr' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
