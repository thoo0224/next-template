import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

export default {
  schema: "./src/server/db/schemas",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
