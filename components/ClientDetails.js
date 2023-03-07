import styles from '../styles/TransactionDetails.module.css'

export function ClientDetails({ orderInfo }) {
  return (
    <div className={styles.detailContainer}>
      <h3>Detalles del destinatario</h3>
      <div className={styles.detail}>
        <p>Nombre</p>
        <p>{orderInfo?.name}</p>
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
        <p>{orderInfo?.documentId}</p>
      </div>
      <div className={styles.detail}>
        <p>Banco</p>
        <p>{orderInfo?.bankName}</p>
      </div>
      <div className={styles.detail}>
        <p>Cuenta</p>
        <p>{orderInfo?.accountId}</p>
      </div>
      <div className={styles.detail}>
        <p>Tipo de cuenta</p>
        <p>{orderInfo?.accountType}</p>
      </div>
    </div>
  )
}
