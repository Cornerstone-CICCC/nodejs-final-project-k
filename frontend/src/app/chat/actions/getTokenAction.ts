"use server";

import { getToken } from "@/utils/getToken";

export async function getTokenAction() {
  try {
    const { token } = await getToken();
    if (token === undefined) throw new Error("token not found");
    return { token: token.value };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
