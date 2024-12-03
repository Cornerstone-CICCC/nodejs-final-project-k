"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createMessageMutation(
  _prev: unknown,
  formData: FormData
) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");
    if (userId === undefined) throw new Error("userid not found");

    const response = await fetch("http://localhost:8080/api/messages/create", {
      method: "POST",
      body: JSON.stringify({
        text: String(formData.get("text")),
        userId: Number(userId.value),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.status.toString().startsWith("2")) {
      throw new Error(`Response status: ${response.status}`);
    }
    await response.json();
    revalidatePath("/");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
