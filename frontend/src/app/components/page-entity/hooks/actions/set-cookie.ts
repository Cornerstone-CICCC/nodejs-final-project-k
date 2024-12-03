"use server";

import { cookies } from "next/headers";

export async function setCookie() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  if (userId) return;

  try {
    const response = await fetch("http://localhost:8080/api/users/create", {
      method: "POST",
    });
    if (!response.status.toString().startsWith("2")) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json: { id: number } = await response.json();
    cookieStore.set("userId", json.id.toString());
  } catch (error) {
    console.error(error);
  }
}
