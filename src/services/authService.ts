import type { AuthCredentials, AuthResponse, Aluno } from '../types'

// URL base da API — ajuste para a URL do backend Node.js/Express
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('@carteirinha:token')

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Erro desconhecido' }))
    throw new Error(error.message ?? `Erro ${res.status}`)
  }

  return res.json() as Promise<T>
}

export const authService = {
  login: (credentials: AuthCredentials): Promise<AuthResponse> =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
}

export const alunoService = {
  getPerfil: (): Promise<Aluno> =>
    request<Aluno>('/aluno/perfil'),

  getHorarios: () =>
    request('/aluno/horarios'),

  getCalendario: () =>
    request('/aluno/calendario'),
}
