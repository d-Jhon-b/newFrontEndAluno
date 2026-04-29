import { useState, useEffect } from 'react'
import type { Aula, DiaSemana } from '../../types'
import { alunoService } from '../../services/authService'
import styles from './HorariosPage.module.css'

const DIAS: DiaSemana[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

const CORES = [
  '#c41c34', '#2563eb', '#059669', '#d97706',
  '#7c3aed', '#0891b2', '#db2777', '#65a30d',
]

export default function HorariosPage() {
  const [aulas, setAulas] = useState<Aula[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [diaSelecionado, setDiaSelecionado] = useState<DiaSemana>(() => {
    const idx = new Date().getDay() // 0=Dom, 1=Seg...
    const mapDia: Record<number, DiaSemana> = {
      1: 'Segunda', 2: 'Terça', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sábado',
    }
    return mapDia[idx] ?? 'Segunda'
  })

  useEffect(() => {
    alunoService.getHorarios()
      .then(data => setAulas(data as Aula[]))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  const aulasDoDia = aulas
    .filter(a => a.diaSemana === diaSelecionado)
    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))

  // Mapeia disciplinas para cores estáveis
  const disciplinasCores: Record<string, string> = {}
  aulas.forEach((a, i) => {
    if (!disciplinasCores[a.disciplina]) {
      disciplinasCores[a.disciplina] = CORES[i % CORES.length]
    }
  })

  return (
    <div className={styles.page}>
      {/* Seletor de dias */}
      <div className={styles.diasScroll}>
        {DIAS.map(dia => (
          <button
            key={dia}
            className={`${styles.diaBtn} ${diaSelecionado === dia ? styles.diaBtnActive : ''}`}
            onClick={() => setDiaSelecionado(dia)}
          >
            {dia.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Lista de aulas */}
      <div className={styles.content}>
        {isLoading && (
          <div className={styles.loadingState}>
            {[1, 2, 3].map(i => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        )}

        {error && !isLoading && (
          <div className={styles.errorState}>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && aulasDoDia.length === 0 && (
          <div className={styles.emptyState}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12h8M12 8v8"/>
            </svg>
            <p>Nenhuma aula em {diaSelecionado}</p>
          </div>
        )}

        {!isLoading && !error && aulasDoDia.map(aula => (
          <div
            key={aula.id}
            className={styles.aulaCard}
            style={{ '--cor': disciplinasCores[aula.disciplina] } as React.CSSProperties}
          >
            <div className={styles.aulaBarra} />
            <div className={styles.aulaInfo}>
              <p className={styles.aulaDisciplina}>{aula.disciplina}</p>
              <p className={styles.aulaProfessor}>{aula.professor}</p>
              <p className={styles.aulaSala}>{aula.sala}</p>
            </div>
            <div className={styles.aulaHorario}>
              <span className={styles.aulaHora}>{aula.horaInicio}</span>
              <span className={styles.aulaHoraSep}>—</span>
              <span className={styles.aulaHora}>{aula.horaFim}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
