"use server";

import { signOut } from "@/lib/authOptions";

export default async function logoutUserAction() {
  await signOut({ redirect: false });

}
