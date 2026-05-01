import { journalBlock } from "@/utils/schema";
import { InferSelectModel } from "drizzle-orm";

export type Blocks = InferSelectModel<typeof journalBlock>[];
