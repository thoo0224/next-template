"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hook";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Post } from "@/server/db/schemas/post";

import { clearPostsAction, createPostAction } from "../actions";

type Props = {
  posts: Post[];
};

export function PostsList({ posts }: Props) {
  const { execute: createPost, status: createPostStatus } =
    useAction(createPostAction);

  const { execute: clearPosts, status: clearPostsStatus } =
    useAction(clearPostsAction);

  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex space-x-2">
        <Input
          placeholder="Create post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="outline"
          disabled={createPostStatus === "executing"}
          onClick={() => {
            createPost({
              text,
            });
          }}
        >
          Create
        </Button>

        <Button
          variant="outline"
          type="submit"
          onClick={() => {
            clearPosts({});
          }}
          disabled={clearPostsStatus === "executing"}
        >
          Clear
        </Button>
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </div>
  );
}
