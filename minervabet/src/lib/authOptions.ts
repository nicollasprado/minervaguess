import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await findUserByCredentials(
          credentials.username as string,
          credentials.password as string
        );

        return user;
      },
    }),
  ],
});
