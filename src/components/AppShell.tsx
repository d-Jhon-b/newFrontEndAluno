import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styles from './AppShell.module.css'

// Ícones SVG inline (substitui @expo/vector-icons e react-native-vector-icons)
const IconHome = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
)

const IconCard = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
)

const IconSchedule = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
)

const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const IconLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

const navItems = [
  { to: '/', label: 'Início', Icon: IconHome },
  { to: '/carteirinha', label: 'Carteirinha', Icon: IconCard },
  { to: '/horarios', label: 'Horários', Icon: IconSchedule },
  { to: '/calendario', label: 'Calendário', Icon: IconCalendar },
]

export default function AppShell() {
  const { aluno, logout } = useAuth()
  const location = useLocation()

  const pageTitle = navItems.find(n => n.to === location.pathname)?.label ?? 'Início'

  return (
    <div className={styles.shell}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoMark}>F</div>
          <span className={styles.pageTitle}>{pageTitle}</span>
        </div>
        <div className={styles.headerRight}>
          {aluno && (
            <span className={styles.greetingText}>
              {aluno.nome.split(' ')[0]}
            </span>
          )}
          <button
            className={styles.logoutBtn}
            onClick={logout}
            aria-label="Sair"
            title="Sair"
          >
            <IconLogout />
          </button>
        </div>
      </header>

      {/* Conteúdo da página */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Bottom Navigation — substitui o TabNavigator do React Navigation */}
      <nav className={styles.bottomNav} aria-label="Navegação principal">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
            aria-label={label}
          >
            <span className={styles.navIcon}>
              <Icon />
            </span>
            <span className={styles.navLabel}>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
