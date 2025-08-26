import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Ideas
export const ideasTable = pgTable("ideas", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  // Author info from Clerk session
  authorClerkId: varchar("author_clerk_id", { length: 255 }).notNull(),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  authorImage: varchar("author_image", { length: 500 }).notNull(), // ✅ new column
});

// Comments
export const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  ideaId: integer("idea_id")
    .notNull()
    .references(() => ideasTable.id, { onDelete: "cascade" }),
  userClerkId: varchar("user_clerk_id", { length: 255 }).notNull(),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  authorImage: varchar("author_image", { length: 500 }).notNull(),
});

export const likesTable = pgTable(
  "likes",
  {
    id: serial("id").primaryKey(),
    value: integer("value").notNull(), // 1 = like, -1 = dislike
    ideaId: integer("idea_id")
      .notNull()
      .references(() => ideasTable.id, { onDelete: "cascade" }),
    userClerkId: varchar("user_clerk_id", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      uniqueUserVote: uniqueIndex("unique_user_vote").on(
        table.ideaId,
        table.userClerkId
      ),
    };
  }
);
// Tags (optional)
export const tagsTable = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).unique().notNull(),
});

// Many-to-Many: Idea ↔ Tags
export const ideaTagsTable = pgTable("idea_tags", {
  id: serial("id").primaryKey(),
  ideaId: integer("idea_id")
    .notNull()
    .references(() => ideasTable.id, { onDelete: "cascade" }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tagsTable.id, { onDelete: "cascade" }),
});
