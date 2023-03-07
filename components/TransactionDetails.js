import styles from '../styles/TransactionDetails.module.css'

export function TransactionDetails({ orderInfo }) {
  console.log(orderInfo)

  return (
    <div className={styles.detailContainer}>
      <h3>Detalles de la remesa</h3>
      <div className={styles.detail}>
        <p>Monto a enviar</p>
        <p>{orderInfo?.quantity} EUR</p>
      </div>
      <div className={styles.detail}>
        <p>Comisión</p>
        <p>{orderInfo?.commission} EUR</p>
      </div>
      <div className={styles.detail}>
        <p>Tasa de cambio</p>
        <p>{orderInfo?.exchangeRatePrice} VEF</p>
      </div>
      <div className={styles.detail}>
        <p>Monto a pagar</p>
        <p>{orderInfo?.quantity + orderInfo?.commission} EUR</p>
      </div>
      <div className={styles.detail}>
        <p>Monto a recibir</p>
        <p>{orderInfo?.quantity * orderInfo?.exchangeRatePrice} VEF</p>
      </div>
    </div>
  )
}
