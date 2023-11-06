import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession } from "@auth/core/types";

import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth";

import { db } from "@/server/db";

import { env } from "@/env.mjs";

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
});
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
