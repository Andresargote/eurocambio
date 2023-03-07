import { api } from './apiClient'

interface Order {
  pairRate: string
  payMethod: string
  quantity: string
  beneficiary: {
    name: string
    documentId: string
    bankName: string
    accountId: string
    accountType: string
  }
  newBeneficiary: string
  saveBeneficiary: string
}

export const createOrder = async (order: Order) => {
  const { data } = await api.post('/orders', order)
  return data
}
