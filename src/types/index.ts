// ===== MODELOS DE DADOS =====

export interface Aluno {
  id: string
  nome: string
  ra: string         // Registro Acadêmico
  curso: string
  semestre: number
  turno: 'Manhã' | 'Tarde' | 'Noite'
  email: string
  foto?: string      // URL ou base64
  validadeCarteirinha: string  // ISO date string
  status: 'ativo' | 'inativo' | 'trancado'
}

export interface Aula {
  id: string
  disciplina: string
  professor: string
  sala: string
  diaSemana: DiaSemana
  horaInicio: string  // HH:mm
  horaFim: string     // HH:mm
}

export type DiaSemana = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado'

export interface EventoCalendario {
  id: string
  titulo: string
  data: string        // ISO date string
  dataFim?: string    // Para eventos de múltiplos dias
  tipo: TipoEvento
  descricao?: string
}

export type TipoEvento =
  | 'feriado'
  | 'prova'
  | 'recesso'
  | 'evento'
  | 'prazo'
  | 'aula_suspensa'

// ===== AUTH =====

export interface AuthCredentials {
  ra: string
  senha: string
}

export interface AuthResponse {
  token: string
  aluno: Aluno
}

// ===== ESTADO DA AUTH =====

export interface AuthState {
  aluno: Aluno | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
