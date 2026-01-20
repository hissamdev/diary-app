PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_propertiesTable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dailyEntryId` integer NOT NULL,
	`templatePropertyId` integer NOT NULL,
	`data` text NOT NULL,
	FOREIGN KEY (`dailyEntryId`) REFERENCES `dailyTable`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`templatePropertyId`) REFERENCES `templateTable`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_propertiesTable`("id", "dailyEntryId", "templatePropertyId", "data") SELECT "id", "dailyEntryId", "templatePropertyId", "data" FROM `propertiesTable`;--> statement-breakpoint
DROP TABLE `propertiesTable`;--> statement-breakpoint
ALTER TABLE `__new_propertiesTable` RENAME TO `propertiesTable`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `unique_daily_template` ON `propertiesTable` (`dailyEntryId`,`templatePropertyId`);