"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { socket } from "@/app/utils/socket";

export async function createMessageMutation(
  _prev: unknown,
  formData: FormData
) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");
    if (userId === undefined) throw new Error("userid not found");

    socket.emit("sendMessage", {
      text: String(formData.get("text")),
      userId: Number(userId.value),
    });

    revalidatePath("/");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
