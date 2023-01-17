import styles from '../styles/TransactionDetails.module.css'

export function ClientDetails() {
  return (
    <div className={styles.detailContainer}>
      <h3>Detalles del beneficiario</h3>
      <div className={styles.detail}>
        <p>Nombre</p>
        <p>Andres Argote</p>
      </div>
      <div className={styles.detail}>
        <p>País</p>
        <p>Venezuela</p>
      </div>
      <div className={styles.detail}>
        <p>Pago via</p>
        <p>Transferencia bancaria</p>
      </div>
      <div className={styles.detail}>
        <p>Número de documento</p>
        <p>29670274</p>
      </div>
      <div className={styles.detail}>
        <p>Banco</p>
        <p>BBVA Provincial</p>
      </div>
      <div className={styles.detail}>
        <p>Cuenta</p>
        <p>01561234567891000000</p>
      </div>
      <div className={styles.detail}>
        <p>Tipo de cuenta</p>
        <p>Cuenta corriente</p>
      </div>
    </div>
  )
}
