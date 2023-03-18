import { Dispatch, SetStateAction, useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { useRouter } from 'next/router'
import styles from '../styles/TransactionSteps.module.css'
import {
  CreateOrder,
  OrderForm,
  createPayPalOrder,
  createTransferOrder
} from '../services/orders'
import { PayMethods } from '../utils/PayMethods'

interface Props {
  prevStep: () => void
  orderInfo: OrderForm
  setOrderInfo: Dispatch<SetStateAction<OrderForm>>
}

export function FourthTransactionStep({
  prevStep,
  orderInfo,
  setOrderInfo
}: Props) {
  const [checked, setChecked] = useState(orderInfo?.payMethod || '')
  const router = useRouter()

  const manageOrderCreation = async (data: CreateOrder) => {
    if (data.payMethod === PayMethods.PAYPAL) {
      try {
        const res = await createPayPalOrder(data)
        const link = res.links.find((item: any) => item.rel === 'approve')
        router.push(link.href)
      } catch (err) {
        console.log(err)
      }
    } else if (data.payMethod === PayMethods.TRANSFER) {
      const res = await createTransferOrder(data)
      console.log(res)
    } else if (data.payMethod === PayMethods.CARD) {
      //
    }
  }

  const handleCreateOrder = async (data: OrderForm) => {
    const order: CreateOrder = {
      pairRate: 'EUR/VES',
      payMethod: data.payMethod,
      quantity: data.quantity,
      purpose: data.purpose,
      beneficiary: {
        name: data.name,
        documentId: data.documentId,
        bankName: data.bankName,
        accountId: data.accountId,
        accountType: data.accountType
      }
    }

    await manageOrderCreation(order)
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.checkbox}>
        <Checkbox
          inputId={PayMethods.CARD}
          value={PayMethods.CARD}
          checked={checked === PayMethods.CARD}
          onChange={(e) => {
            setChecked(e.value)
            setOrderInfo((prev) => ({
              ...prev,
              payMethod: e.value
            }))
          }}
        />
        <label htmlFor={PayMethods.CARD}>Pagar con tarjeta</label>
      </div>
      <div className={styles.checkbox}>
        <Checkbox
          inputId={PayMethods.PAYPAL}
          value={PayMethods.PAYPAL}
          checked={checked === PayMethods.PAYPAL}
          onChange={(e) => {
            setChecked(e.value)
            setOrderInfo((prev) => ({
              ...prev,
              payMethod: e.value
            }))
          }}
        />
        <label htmlFor={PayMethods.PAYPAL}>Pagar con PayPal</label>
      </div>
      <div className={styles.checkbox}>
        <Checkbox
          inputId={PayMethods.TRANSFER}
          value={PayMethods.TRANSFER}
          checked={checked === PayMethods.TRANSFER}
          onChange={(e) => {
            setChecked(e.value)
            setOrderInfo((prev) => ({
              ...prev,
              payMethod: e.value
            }))
          }}
        />
        <label htmlFor={PayMethods.TRANSFER}>
          Pagar con Transferencia bancaria
        </label>
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
