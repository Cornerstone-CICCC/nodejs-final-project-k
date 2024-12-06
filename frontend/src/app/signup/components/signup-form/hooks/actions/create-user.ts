"use server";

export async function createUser(formData: FormData) {
  await fetch("http://localhost:8080/api/signup", {
    method: "POST",
    body: JSON.stringify({ userName: String(formData.get("userName")) }),
    headers: { "Content-Type": "application/json" },
  });
}
