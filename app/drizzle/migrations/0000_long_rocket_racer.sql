DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "homes" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"address2" text,
	"city" text NOT NULL,
	"zipCode" integer NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"language" text NOT NULL,
	"reviewed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "persons" (
	"id" serial PRIMARY KEY NOT NULL,
	"home" integer NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"birthday" date NOT NULL,
	"gender" "gender" NOT NULL,
	"owner" boolean NOT NULL,
	"relationshipToOwner" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "persons" ADD CONSTRAINT "persons_home_homes_id_fk" FOREIGN KEY ("home") REFERENCES "homes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
