const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'

async function request(path, { token, body, ...options } = {}) {
  const headers = { ...(options.headers ?? {}) }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(data?.message || 'Ocurrió un error al conectar con el servidor.')
  }
  return data
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  me: (token) => request('/auth/me', { token }),

  getPerfil: (token) => request('/perfil/me', { token }),
  updatePerfil: (token, payload) => request('/perfil/me', { method: 'PATCH', token, body: payload }),
  updateDocumento: (token, documentTypeId, payload) =>
    request(`/perfil/documentos/${documentTypeId}`, { method: 'PATCH', token, body: payload }),
  addPerfilSkill: (token, name) => request('/perfil/habilidades', { method: 'POST', token, body: { name } }),
  removePerfilSkill: (token, id) => request(`/perfil/habilidades/${id}`, { method: 'DELETE', token }),
}
