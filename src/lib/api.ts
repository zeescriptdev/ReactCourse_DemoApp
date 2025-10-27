const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

let csrfToken: string | null = null

async function getCsrfToken() {
  if (csrfToken) return
  const res = await fetch(`${API_BASE}/csrf-token`, { credentials: 'include' })
  const data = await res.json()
  csrfToken = data.csrfToken
}

export async function apiPost(path: string, body?: Record<string, unknown>) {
  await getCsrfToken()
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken! },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: 'include' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function loginWithIdToken(idToken: string) {
  return apiPost('/auth/login', { idToken })
}

export async function logout() {
  return apiPost('/auth/logout')
}

export async function createChat(title?: string) {
  return apiPost('/chats', { title })
}

export async function listChats() {
  return apiGet('/chats')
}

export async function getChatMessages(chatId: string) {
  return apiGet(`/chats/${chatId}`)
}

export async function sendMessage(chatId: string, content: string) {
  return apiPost(`/chats/${chatId}/messages`, { content })
}

export async function getProfile() {
  return apiGet('/profile')
}

export async function updateProfile(payload: { display_name: string; bio: string }) {
  return apiPost('/profile', payload)
}