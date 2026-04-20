CREATE TABLE `template` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`variant` text NOT NULL,
	`icon` text,
	`color` text,
	`is_checked` integer DEFAULT false
);
