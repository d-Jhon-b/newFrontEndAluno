import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../../contexts/AuthContext'
import styles from './CarteirinhaPage.module.css'

export default function CarteirinhaPage() {
  const { aluno } = useAuth()
  const cardRef = useRef<HTMLDivElement>(null)

  if (!aluno) return null

  const validade = new Date(aluno.validadeCarteirinha)
  const isValid = validade > new Date()

  // Payload do QR Code — pode ser URL de validação ou JSON com os dados
  const qrPayload = JSON.stringify({
    ra: aluno.ra,
    nome: aluno.nome,
    curso: aluno.curso,
    validade: aluno.validadeCarteirinha,
  })

  return (
    <div className={styles.page}>
      <div className={styles.cardWrapper} ref={cardRef}>
        {/* Carteirinha */}
        <div className={`${styles.card} ${!isValid ? styles.cardVencida : ''}`}>
          {/* Header da carteirinha */}
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={styles.cardLogo}>F</div>
              <div>
                <p className={styles.cardInstituicao}>FATEC ITAQUERA</p>
                <p className={styles.cardTipo}>Carteirinha Estudantil</p>
              </div>
            </div>
            <div className={`${styles.cardStatus} ${isValid ? styles.statusValido : styles.statusVencido}`}>
              {isValid ? 'VÁLIDO' : 'VENCIDO'}
            </div>
          </div>

          {/* Foto + Dados */}
          <div className={styles.cardBody}>
            <div className={styles.fotoArea}>
              {aluno.foto ? (
                <img src={aluno.foto} alt={`Foto de ${aluno.nome}`} className={styles.foto} />
              ) : (
                <div className={styles.fotoPlaceholder}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              )}
            </div>

            <div className={styles.dadosArea}>
              <p className={styles.nome}>{aluno.nome}</p>
              <div className={styles.dadoRow}>
                <span className={styles.dadoLabel}>RA</span>
                <span className={styles.dadoValue}>{aluno.ra}</span>
              </div>
              <div className={styles.dadoRow}>
                <span className={styles.dadoLabel}>Curso</span>
                <span className={styles.dadoValue}>{aluno.curso}</span>
              </div>
              <div className={styles.dadoRow}>
                <span className={styles.dadoLabel}>Semestre</span>
                <span className={styles.dadoValue}>{aluno.semestre}º Semestre</span>
              </div>
              <div className={styles.dadoRow}>
                <span className={styles.dadoLabel}>Turno</span>
                <span className={styles.dadoValue}>{aluno.turno}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className={styles.qrArea}>
            <div className={styles.qrWrapper}>
              <QRCodeSVG
                value={qrPayload}
                size={120}
                bgColor="transparent"
                fgColor="#ffffff"
                level="M"
                marginSize={0}
              />
            </div>
            <div className={styles.qrInfo}>
              <p className={styles.qrLabel}>Escaneie para validar</p>
              <p className={styles.qrValidade}>
                Válido até{' '}
                {validade.toLocaleDateString('pt-BR', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Stripe decorativa */}
          <div className={styles.stripe} aria-hidden="true" />
        </div>
      </div>

      {/* Info adicional */}
      <div className={styles.infoBox}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>
          Esta carteirinha é válida como documento de identificação estudantil para
          meia-entrada e serviços acadêmicos na Fatec Itaquera.
        </p>
      </div>
    </div>
  )
}
