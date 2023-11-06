"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { authSafeAction } from "@/server/actions/authSafeAction";
import { posts } from "@/server/db/schemas/post";
import { db } from "@/server/db";

export const createPostAction = authSafeAction(
  z.object({
    text: z.string(),
  }),
  async ({ text }, { session }) => {
    await db.insert(posts).values({
      author: session.user.id,
      text,
    });

    revalidatePath("/");
    return { success: "Successfully created posts." };
  },
);

export const clearPostsAction = authSafeAction(z.object({}), async () => {
  await db.delete(posts);
  revalidatePath("/");
});
