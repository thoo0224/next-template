import { mysqlTable, serial, text } from "drizzle-orm/mysql-core";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const posts = mysqlTable("posts", {
  id: serial("id").autoincrement().primaryKey(),
  author: text("author").notNull(),
  text: text("text").notNull(),
});

export const selectPostSchema = createSelectSchema(posts);

export type Post = z.infer<typeof selectPostSchema>;
