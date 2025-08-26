CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"idea_id" integer NOT NULL,
	"user_clerk_id" varchar(255) NOT NULL,
	"author_name" varchar(255) NOT NULL,
	"author_email" varchar(255) NOT NULL,
	"author_image" varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "idea_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"idea_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ideas" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"author_clerk_id" varchar(255) NOT NULL,
	"author_name" varchar(255) NOT NULL,
	"author_email" varchar(255) NOT NULL,
	"author_image" varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" integer NOT NULL,
	"idea_id" integer NOT NULL,
	"user_clerk_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_tags" ADD CONSTRAINT "idea_tags_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_tags" ADD CONSTRAINT "idea_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_idea_id_ideas_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_vote" ON "likes" USING btree ("idea_id","user_clerk_id");