CREATE TABLE `dailyTable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`customDate` text,
	`customTime` text,
	`textContent` text,
	`images` text
);
--> statement-breakpoint
CREATE TABLE `propertiesTable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dailyTableId` integer NOT NULL,
	`templateTableId` integer NOT NULL,
	`data` text NOT NULL,
	FOREIGN KEY (`dailyTableId`) REFERENCES `dailyTable`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`templateTableId`) REFERENCES `templateTable`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_daily_template` ON `propertiesTable` (`dailyTableId`,`templateTableId`);--> statement-breakpoint
ALTER TABLE `templateTable` ADD `data` text NOT NULL;--> statement-breakpoint
ALTER TABLE `templateTable` DROP COLUMN `is_checked`;