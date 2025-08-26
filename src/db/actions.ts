"use server";

import { eq, desc, and, sql } from "drizzle-orm";
import { ideasTable, commentsTable, likesTable } from "@/db/schema";
import { db } from "..";

// ------------------ CREATE IDEA ------------------
export async function createIdea(
  authorClerkId: string,
  authorName: string,
  authorEmail: string,
  authorImage: string,
  data: { title: string; description: string; category?: string }
) {
  const [idea] = await db
    .insert(ideasTable)
    .values({
      title: data.title,
      description: data.description,
      category: data.category,
      authorClerkId,
      authorName,
      authorEmail,
      authorImage,
    })
    .returning();
  return idea ?? null;
}

// ------------------ UPDATE IDEA ------------------
export async function updateIdea(
  ideaId: number,
  authorClerkId: string,
  data: { title?: string; description?: string; category?: string }
) {
  const [updated] = await db
    .update(ideasTable)
    .set({ ...data })
    .where(
      and(
        eq(ideasTable.id, ideaId),
        eq(ideasTable.authorClerkId, authorClerkId)
      )
    )
    .returning();
  return updated ?? null;
}

// ------------------ DELETE IDEA ------------------
export async function deleteIdea(ideaId: number, authorClerkId: string) {
  const [deleted] = await db
    .delete(ideasTable)
    .where(
      and(
        eq(ideasTable.id, ideaId),
        eq(ideasTable.authorClerkId, authorClerkId)
      )
    )
    .returning();
  return deleted ?? null;
}

// ------------------ GET ALL IDEAS WITH VOTES ------------------
export async function getAllIdeasWithVotes(userClerkId?: string) {
  const currentUser = userClerkId ?? "";
  const ideas = await db
    .select({
      id: ideasTable.id,
      title: ideasTable.title,
      description: ideasTable.description,
      category: ideasTable.category,
      createdAt: ideasTable.createdAt,
      authorClerkId: ideasTable.authorClerkId,
      authorName: ideasTable.authorName,
      authorEmail: ideasTable.authorEmail,
      authorImage: ideasTable.authorImage,
      likes: sql<number>`COALESCE(SUM(CASE WHEN ${likesTable.value} = 1 THEN 1 ELSE 0 END), 0)`,
      dislikes: sql<number>`COALESCE(SUM(CASE WHEN ${likesTable.value} = -1 THEN 1 ELSE 0 END), 0)`,
      userVote: sql<number>`COALESCE(MAX(CASE WHEN ${likesTable.userClerkId} = ${currentUser} THEN ${likesTable.value} ELSE 0 END), 0)`,
    })
    .from(ideasTable)
    .leftJoin(likesTable, eq(ideasTable.id, likesTable.ideaId))
    .groupBy(ideasTable.id)
    .orderBy(sql`created_at DESC`);
  return ideas;
}

// ------------------ TOGGLE VOTE ------------------
export async function toggleVote(
  ideaId: number,
  userClerkId: string,
  value: 1 | -1
) {
  const existing = await db
    .select()
    .from(likesTable)
    .where(
      and(
        eq(likesTable.ideaId, ideaId),
        eq(likesTable.userClerkId, userClerkId)
      )
    )
    .limit(1);

  if (!existing.length) {
    const [vote] = await db
      .insert(likesTable)
      .values({ ideaId, userClerkId, value })
      .returning();
    return vote ?? null;
  }

  const prevVote = existing[0].value;

  if (prevVote === value) {
    const [deleted] = await db
      .delete(likesTable)
      .where(eq(likesTable.id, existing[0].id))
      .returning();
    return deleted ?? null;
  }

  const [updated] = await db
    .update(likesTable)
    .set({ value })
    .where(eq(likesTable.id, existing[0].id))
    .returning();
  return updated ?? null;
}

// ------------------ COMMENTS ------------------
export async function getComments(ideaId: number) {
  return await db
    .select({
      id: commentsTable.id,
      content: commentsTable.content,
      createdAt: commentsTable.createdAt,
      userClerkId: commentsTable.userClerkId,
      authorName: commentsTable.authorName,
      authorEmail: commentsTable.authorEmail,
      authorImage: commentsTable.authorImage,
    })
    .from(commentsTable)
    .where(eq(commentsTable.ideaId, ideaId))
    .orderBy(commentsTable.createdAt);
}

export async function addComment(
  ideaId: number,
  userClerkId: string,
  content: string,
  authorName: string,
  authorEmail: string,
  authorImage: string
) {
  const [comment] = await db
    .insert(commentsTable)
    .values({
      content,
      ideaId,
      userClerkId,
      authorName,
      authorEmail,
      authorImage,
    })
    .returning({
      id: commentsTable.id,
      content: commentsTable.content,
      createdAt: commentsTable.createdAt,
      userClerkId: commentsTable.userClerkId,
      authorName: commentsTable.authorName,
      authorEmail: commentsTable.authorEmail,
      authorImage: commentsTable.authorImage,
    });
  return comment;
}

export async function deleteComment(commentId: number, userClerkId: string) {
  const [deleted] = await db
    .delete(commentsTable)
    .where(
      and(
        eq(commentsTable.id, commentId),
        eq(commentsTable.userClerkId, userClerkId)
      )
    )
    .returning();
  return deleted ?? null;
}

export async function getMostLikedIdeas(limit = 10) {
  try {
    const ideas = await db
      .select({
        id: ideasTable.id,
        title: ideasTable.title,
        description: ideasTable.description,
        category: ideasTable.category,
        authorName: ideasTable.authorName,
        authorEmail: ideasTable.authorEmail,
        authorImage: ideasTable.authorImage,
        createdAt: ideasTable.createdAt,
        likeCount: sql<number>`COALESCE(SUM(CASE WHEN ${likesTable.value} = 1 THEN 1 ELSE 0 END), 0)`,
        dislikeCount: sql<number>`COALESCE(SUM(CASE WHEN ${likesTable.value} = -1 THEN 1 ELSE 0 END), 0)`,
      })
      .from(ideasTable)
      .leftJoin(likesTable, eq(ideasTable.id, likesTable.ideaId))
      .groupBy(ideasTable.id)
      .orderBy(
        sql`COALESCE(SUM(CASE WHEN ${likesTable.value} = 1 THEN 1 ELSE 0 END),0) DESC`
      )
      .limit(limit);

    return ideas;
  } catch (err) {
    console.error("❌ Failed to fetch most liked ideas:", err);
    return [];
  }
}
