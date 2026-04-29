import { useState, useEffect } from 'react'
import type { EventoCalendario, TipoEvento } from '../../types'
import { alunoService } from '../../services/authService'
import styles from './CalendarioPage.module.css'

const TIPO_CONFIG: Record<TipoEvento, { label: string; cor: string; bg: string }> = {
  feriado:      { label: 'Feriado',        cor: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  prova:        { label: 'Prova',          cor: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
  recesso:      { label: 'Recesso',        cor: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
  evento:       { label: 'Evento',         cor: '#22c55e', bg: 'rgba(34,197,94,0.12)'  },
  prazo:        { label: 'Prazo',          cor: '#c41c34', bg: 'rgba(196,28,52,0.12)'  },
  aula_suspensa:{ label: 'Aula suspensa',  cor: '#94a3b8', bg: 'rgba(148,163,184,0.12)'},
}

const MESES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]

export default function CalendarioPage() {
  const [eventos, setEventos] = useState<EventoCalendario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]   = useState('')
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth())
  const [anoSelecionado]    = useState(new Date().getFullYear())

  useEffect(() => {
    alunoService.getCalendario()
      .then(data => setEventos(data as EventoCalendario[]))
      .catch(err  => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  const eventosFiltrados = eventos
    .filter(ev => {
      const d = new Date(ev.data)
      return d.getMonth() === mesSelecionado && d.getFullYear() === anoSelecionado
    })
    .sort((a, b) => a.data.localeCompare(b.data))

  function prevMes() { setMesSelecionado(m => (m === 0 ? 11 : m - 1)) }
  function nextMes() { setMesSelecionado(m => (m === 11 ? 0 : m + 1)) }

  return (
    <div className={styles.page}>
      {/* Navegação de meses */}
      <div className={styles.mesNav}>
        <button className={styles.navBtn} onClick={prevMes} aria-label="Mês anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>
        <h2 className={styles.mesTitle}>{MESES[mesSelecionado]} {anoSelecionado}</h2>
        <button className={styles.navBtn} onClick={nextMes} aria-label="Próximo mês">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>
      </div>

      {/* Legenda */}
      <div className={styles.legenda}>
        {Object.entries(TIPO_CONFIG).map(([tipo, cfg]) => (
          <span key={tipo} className={styles.legendaItem} style={{ color: cfg.cor }}>
            <span className={styles.legendaDot} style={{ background: cfg.cor }} />
            {cfg.label}
          </span>
        ))}
      </div>

      {/* Lista de eventos */}
      <div className={styles.lista}>
        {isLoading && (
          <>
            {[1,2,3,4].map(i => <div key={i} className={styles.skeleton} />)}
          </>
        )}

        {error && !isLoading && (
          <div className={styles.errorState}>{error}</div>
        )}

        {!isLoading && !error && eventosFiltrados.length === 0 && (
          <div className={styles.emptyState}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8"  y1="2" x2="8"  y2="6"/>
              <line x1="3"  y1="10" x2="21" y2="10"/>
            </svg>
            <p>Nenhum evento em {MESES[mesSelecionado]}</p>
          </div>
        )}

        {!isLoading && !error && eventosFiltrados.map(ev => {
          const cfg = TIPO_CONFIG[ev.tipo]
          const data = new Date(ev.data + 'T12:00:00') // evita timezone off-by-one
          const dia  = data.getDate().toString().padStart(2, '0')
          const sem  = data.toLocaleDateString('pt-BR', { weekday: 'short' })

          return (
            <div
              key={ev.id}
              className={styles.eventoCard}
              style={{ '--cor': cfg.cor, '--bg': cfg.bg } as React.CSSProperties}
            >
              <div className={styles.eventoData}>
                <span className={styles.eventoDia}>{dia}</span>
                <span className={styles.eventoSem}>{sem}</span>
              </div>

              <div className={styles.eventoInfo}>
                <div className={styles.eventoTitulo}>
                  <span className={styles.eventoBadge}>{cfg.label}</span>
                  {ev.titulo}
                </div>
                {ev.descricao && (
                  <p className={styles.eventoDesc}>{ev.descricao}</p>
                )}
                {ev.dataFim && ev.dataFim !== ev.data && (
                  <p className={styles.eventoFim}>
                    até {new Date(ev.dataFim + 'T12:00:00').toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
