ALTER TABLE `template` RENAME TO `templateTable`;--> statement-breakpoint
ALTER TABLE `templateTable` ADD `type` text NOT NULL;