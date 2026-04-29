import { useState, type FormEvent } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login } = useAuth()
  const [ra, setRa] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSenha, setShowSenha] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!ra.trim() || !senha.trim()) {
      setError('Preencha todos os campos.')
      return
    }
    setError('')
    setIsLoading(true)
    try {
      await login(ra.trim(), senha)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'RA ou senha inválidos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      {/* Background decorativo */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
      </div>

      <div className={styles.card}>
        {/* Logo / Header */}
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>F</div>
          <h1 className={styles.title}>Carteirinha Digital</h1>
          <p className={styles.subtitle}>Fatec Itaquera</p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="ra" className={styles.label}>Registro Acadêmico (RA)</label>
            <input
              id="ra"
              type="text"
              className={styles.input}
              placeholder="Ex: CT3000001"
              value={ra}
              onChange={e => setRa(e.target.value)}
              autoComplete="username"
              autoCapitalize="characters"
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="senha" className={styles.label}>Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                id="senha"
                type={showSenha ? 'text' : 'password'}
                className={styles.input}
                placeholder="Sua senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowSenha(v => !v)}
                aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showSenha ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMsg} role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <p className={styles.footer}>
          Use as mesmas credenciais do portal <strong>SIGA</strong>
        </p>
      </div>
    </div>
  )
}
