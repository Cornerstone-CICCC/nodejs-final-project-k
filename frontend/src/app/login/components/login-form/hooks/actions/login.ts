"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    body: JSON.stringify({ userName: String(formData.get("userName")) }),
    headers: { "Content-Type": "application/json" },
  });
  const jwt = await response.json();

  const cookieStore = await cookies();
  cookieStore.set("token", jwt);

  return jwt;
}
