import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { Aluno, AuthState } from '../types'
import { authService } from '../services/authService'

// ===== ACTIONS =====
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { aluno: Aluno; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_ALUNO'; payload: Aluno }

// ===== REDUCER =====
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        aluno: action.payload.aluno,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }
    case 'LOGOUT':
      return {
        aluno: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'UPDATE_ALUNO':
      return { ...state, aluno: action.payload }
    default:
      return state
  }
}

const initialState: AuthState = {
  aluno: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
}

// ===== CONTEXT =====
interface AuthContextValue extends AuthState {
  login: (ra: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// ===== PROVIDER =====
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Restaura sessão salva (equivalente ao AsyncStorage do React Native)
  useEffect(() => {
    const savedToken = localStorage.getItem('@carteirinha:token')
    const savedAluno = localStorage.getItem('@carteirinha:aluno')

    if (savedToken && savedAluno) {
      try {
        const aluno: Aluno = JSON.parse(savedAluno)
        dispatch({ type: 'LOGIN_SUCCESS', payload: { aluno, token: savedToken } })
      } catch {
        localStorage.removeItem('@carteirinha:token')
        localStorage.removeItem('@carteirinha:aluno')
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const login = useCallback(async (ra: string, senha: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    const { token, aluno } = await authService.login({ ra, senha })
    localStorage.setItem('@carteirinha:token', token)
    localStorage.setItem('@carteirinha:aluno', JSON.stringify(aluno))
    dispatch({ type: 'LOGIN_SUCCESS', payload: { aluno, token } })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('@carteirinha:token')
    localStorage.removeItem('@carteirinha:aluno')
    dispatch({ type: 'LOGOUT' })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ===== HOOK =====
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
