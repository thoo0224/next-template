import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";

export const authSafeAction = createSafeActionClient({
  async middleware() {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized.");
    }

    return {
      session,
    };
  },
});
