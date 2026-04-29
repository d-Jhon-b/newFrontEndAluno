import { usePWAInstall } from '../hooks/usePWAInstall'
import styles from './PWAInstallBanner.module.css'

export default function PWAInstallBanner() {
  const { canInstall, isInstalled, promptInstall } = usePWAInstall()

  if (isInstalled || !canInstall) return null

  return (
    <div className={styles.banner} role="complementary">
      <div className={styles.content}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M12 8v8M8 12l4 4 4-4"/>
        </svg>
        <span>Instale o app para acesso rápido</span>
      </div>
      <button className={styles.installBtn} onClick={promptInstall}>
        Instalar
      </button>
    </div>
  )
}
