CREATE TABLE "journal_blocks" (
	"entry_id" integer NOT NULL,
	"position" integer,
	"id" text NOT NULL,
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
