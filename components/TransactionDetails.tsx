import styles from '../styles/TransactionDetails.module.css'

export function TransactionDetails() {
  return (
    <div className={styles.detailContainer}>
      <h3>Detalles de la remesa</h3>
      <div className={styles.detail}>
        <p>Monto a enviar</p>
        <p>100,00 EUR</p>
      </div>
      <div className={styles.detail}>
        <p>Comisión</p>
        <p>1,99 EUR</p>
      </div>
      <div className={styles.detail}>
        <p>Tasa de cambio</p>
        <p>8,75 VEF</p>
      </div>
      <div className={styles.detail}>
        <p>Monto a pagar</p>
        <p>101,99 EUR</p>
      </div>
      <div className={styles.detail}>
        <p>Monto a recibir</p>
        <p>875,00 VEF</p>
      </div>
    </div>
  )
}
