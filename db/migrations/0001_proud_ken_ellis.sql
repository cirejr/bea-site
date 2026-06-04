CREATE TABLE "badges" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "badges_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"color" text DEFAULT '#3b82f6' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "badges_name_unique" UNIQUE("name"),
	CONSTRAINT "badges_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "formation_badges" (
	"formationId" integer NOT NULL,
	"badgeId" integer NOT NULL,
	CONSTRAINT "formation_badges_formationId_badgeId_pk" PRIMARY KEY("formationId","badgeId")
);
--> statement-breakpoint
CREATE TABLE "formations_complementaires" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "formations_complementaires_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"formationId" integer NOT NULL,
	"complementaryFormationId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "avis" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "avis_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"formationId" integer NOT NULL,
	"name" text NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "formations" ADD COLUMN "objectifs" text[] DEFAULT '{}'::text[] NOT NULL;
--> statement-breakpoint
ALTER TABLE "formations" ADD COLUMN "programmes" text;
--> statement-breakpoint
ALTER TABLE "formations" ADD COLUMN "pourQui" text;
--> statement-breakpoint
ALTER TABLE "formations" ADD COLUMN "financement" text;
--> statement-breakpoint
ALTER TABLE "formations" DROP COLUMN "badge";
--> statement-breakpoint
DROP TYPE "public"."badge";
--> statement-breakpoint
ALTER TABLE "formation_badges" ADD CONSTRAINT "formation_badges_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "formation_badges" ADD CONSTRAINT "formation_badges_badgeId_badges_id_fk" FOREIGN KEY ("badgeId") REFERENCES "public"."badges"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "formations_complementaires" ADD CONSTRAINT "formations_complementaires_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "formations_complementaires" ADD CONSTRAINT "formations_complementaires_complementaryFormationId_formations_id_fk" FOREIGN KEY ("complementaryFormationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "avis" ADD CONSTRAINT "avis_formationId_formations_id_fk" FOREIGN KEY ("formationId") REFERENCES "public"."formations"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "formations_complementaires_formationId_complementaryFormationId_unique" ON "formations_complementaires" USING btree ("formationId","complementaryFormationId");
