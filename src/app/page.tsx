import Image from "next/image";
import Link from "next/link";

import { eq } from "drizzle-orm";

import { posts } from "@/server/db/schemas/post";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { Button } from "@/components/ui/button";

import { PostsList } from "./_components/posts-list";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = session && session.user;

  const userPosts = isAuthenticated
    ? await db.select().from(posts).where(eq(posts.author, session.user.id))
    : [];

  console.log("F");
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="w-[500px] pt-64">
        {isAuthenticated ? (
          <PostsList posts={userPosts} />
        ) : (
          <Button variant="outline" asChild>
            <Link href="/api/auth/signin">Continue with Discord</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
