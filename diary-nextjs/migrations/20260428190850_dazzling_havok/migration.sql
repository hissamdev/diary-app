CREATE TABLE "journal_blocks" (
	"entry_id" integer NOT NULL,
	"primary_key" serial PRIMARY KEY,
	"position" integer NOT NULL,
	"id" text NOT NULL UNIQUE,
	"type" text NOT NULL,
	"props" json,
	"content" json,
	"children" json
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" serial PRIMARY KEY,
	"created_at" date DEFAULT now() NOT NULL,
	"last_updated" date DEFAULT now() NOT NULL,
	"is_property_modified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"name" text,
	"created_at" date DEFAULT now()
);
