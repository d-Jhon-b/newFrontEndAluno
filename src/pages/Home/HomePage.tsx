import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const quickLinks = [
  {
    to: '/carteirinha',
    label: 'Carteirinha',
    description: 'QR Code e dados',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    color: '#c41c34',
  },
  {
    to: '/horarios',
    label: 'Horários',
    description: 'Grade de aulas',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    color: '#2563eb',
  },
  {
    to: '/calendario',
    label: 'Calendário',
    description: 'Eventos e prazos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    color: '#059669',
  },
]

export default function HomePage() {
  const { aluno } = useAuth()

  if (!aluno) return null

  const now = new Date()
  const hora = now.getHours()
  const saudacao =
    hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

  const validade = new Date(aluno.validadeCarteirinha)
  const isValid = validade > now
  const diffDays = Math.ceil((validade.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className={styles.page}>
      {/* Saudação */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <p className={styles.saudacao}>{saudacao},</p>
          <h2 className={styles.nomeAluno}>{aluno.nome.split(' ')[0]} 👋</h2>
          <p className={styles.cursoBadge}>{aluno.curso} · {aluno.turno}</p>
        </div>

        <div
          className={`${styles.statusBadge} ${isValid ? styles.statusAtivo : styles.statusVencido}`}
        >
          <span className={styles.statusDot} />
          {isValid ? 'Ativo' : 'Vencido'}
        </div>
      </section>

      {/* Card de Validade */}
      <section className={styles.validadeCard}>
        <div className={styles.validadeInfo}>
          <span className={styles.validadeLabel}>Validade da carteirinha</span>
          <span className={styles.validadeData}>
            {validade.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>
        {isValid && diffDays <= 30 && (
          <span className={styles.validadeAviso}>Vence em {diffDays} dias</span>
        )}
        {!isValid && (
          <span className={styles.validadeAviso}>Solicite renovação na secretaria</span>
        )}
      </section>

      {/* Info do aluno */}
      <section className={styles.infoSection}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>RA</span>
          <span className={styles.infoValue}>{aluno.ra}</span>
        </div>
        <div className={styles.infoDivider} />
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Semestre</span>
          <span className={styles.infoValue}>{aluno.semestre}º</span>
        </div>
        <div className={styles.infoDivider} />
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Turno</span>
          <span className={styles.infoValue}>{aluno.turno}</span>
        </div>
      </section>

      {/* Acesso rápido */}
      <section className={styles.quickSection}>
        <h3 className={styles.sectionTitle}>Acesso rápido</h3>
        <div className={styles.quickGrid}>
          {quickLinks.map(link => (
            <Link key={link.to} to={link.to} className={styles.quickCard}>
              <div
                className={styles.quickIcon}
                style={{ '--accent': link.color } as React.CSSProperties}
              >
                {link.icon}
              </div>
              <span className={styles.quickLabel}>{link.label}</span>
              <span className={styles.quickDesc}>{link.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
