import styles from '../styles/TransactionDetails.module.css'



export function ClientDetails({ orderInfo, selectedBeneficiary }) {

  console.log(selectedBeneficiary, 'selected in detail component')

  return (
    <div className={styles.detailContainer}>
      <h3>Detalles del destinatario</h3>
      <div className={styles.detail}>
        <p>Nombre</p>
        <p>{selectedBeneficiary ? selectedBeneficiary.name : orderInfo?.name}</p>
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
        <p>{selectedBeneficiary ? selectedBeneficiary.documentId : orderInfo?.documentId}</p>
      </div>
      <div className={styles.detail}>
        <p>Banco</p>
        <p>{selectedBeneficiary ? selectedBeneficiary.bankName :  orderInfo?.bankName}</p>
      </div>
      <div className={styles.detail}>
        <p>Cuenta</p>
        <p>{selectedBeneficiary ? selectedBeneficiary.accountId :  orderInfo?.accountId}</p>
      </div>
      <div className={styles.detail}>
        <p>Tipo de cuenta</p>
        <p>{selectedBeneficiary ? selectedBeneficiary.accountType :  orderInfo?.accountType}</p>
      </div>
    </div>
  )
}
