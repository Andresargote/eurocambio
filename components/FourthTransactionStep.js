import { useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { useRouter } from 'next/router'
import styles from '../styles/TransactionSteps.module.css'
import { createOrder } from '../services/orders'

export function FourthTransactionStep({ prevStep, orderInfo, setOrderInfo }) {
  const [checked, setChecked] = useState(orderInfo?.payMethod || '')
  const router = useRouter()

  const handleCreateOrder = async (orderInfo) => {
    try {
      const order = {
        pairRate: 'EUR/VES',
        payMethod: orderInfo.payMethod,
        quantity: orderInfo.quantity,
        purpose: orderInfo.purpose,
        beneficiary: {
          name: orderInfo.name,
          documentId: orderInfo.documentId,
          bankName: orderInfo.bankName,
          accountId: orderInfo.accountId,
          accountType: orderInfo.accountType
        }
      }

      const res = await createOrder(order)
      const link = res.links.find((item) => item.rel === 'approve')
      router.push(link.href)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.checkbox}>
        <Checkbox
          inputId="creditCard"
          value="creditCard"
          checked={checked === 'creditCard'}
          onChange={(e) => {
            setChecked(e.value)
            setOrderInfo((prev) => ({
              ...prev,
              payMethod: e.value
            }))
          }}
        />
        <label htmlFor="creditCard">Pagar con tarjeta</label>
      </div>
      <div className={styles.checkbox}>
        <Checkbox
          inputId="paypal"
          value="paypal"
          checked={checked === 'paypal'}
          onChange={(e) => {
            setChecked(e.value)
            setOrderInfo((prev) => ({
              ...prev,
              payMethod: e.value
            }))
          }}
        />
        <label htmlFor="paypal">Pagar con Paypal</label>
      </div>
      <div className={styles.checkbox}>
        <Checkbox
          inputId="bankTransfer"
          value="bankTransfer"
          checked={checked === 'bankTransfer'}
          onChange={(e) => {
            setChecked(e.value)
            setOrderInfo((prev) => ({
              ...prev,
              payMethod: e.value
            }))
          }}
        />
        <label htmlFor="bankTransfer">Pagar con Transferencia bancaria</label>
      </div>

      <div className={styles.formButtons}>
        <Button
          label="Regresar"
          icon="pi pi-arrow-left"
          className="p-button-raised p-button-secondary"
          onClick={(e) => {
            e.preventDefault()
            if (prevStep) prevStep()
          }}
        />
        <Button
          label="Pagar"
          className="p-button-success"
          onClick={() => handleCreateOrder(orderInfo)}
        />
      </div>
    </div>
  )
}
