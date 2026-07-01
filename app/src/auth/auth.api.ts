export async function fetchMe() {
  const res = await fetch("http://localhost/api/me", {
    credentials: "include",
  })

  if (!res.ok) return null

  return res.json()
}

export async function loginEmail(email: string) {
  const res = await fetch("http://localhost/auth/email/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })

  return res.ok
}

export async function logout() {
  await fetch("http://localhost/logout", {
    credentials: "include",
  })
}