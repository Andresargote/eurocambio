import { api } from './apiClient'

export interface Beneficiary {
  id?: string
  name: string
  documentId: string
  bankName: string
  accountId: string
  accountType: string
  phoneNumber: string
}

export interface Order {
  // from api
  id: string
  pairRate: string
  payMethod: string
  quantity: number
  beneficiary: Beneficiary
  commission: number
  purpose: string
  status: string
  totalToPay: number
  totalToReceive: number
  createdAt: string
  updatedAt: string
}

export interface OrderForm {
  payMethod: string
  quantity: number
  purpose: string
  name: string
  documentId: string
  bankName: string
  accountId: string
  accountType: string
  phoneNumber: string
  beneficiary?: string
  commission: number;
  paymentReference: string;
}

export interface CreateOrder {
  pairRate: string
  payMethod: string
  quantity: number
  purpose: string
  beneficiary: Beneficiary | string
}

export const createPayPalOrder = async (order: CreateOrder) => {
  const { data } = await api.post('/orders', order)
  return data
}

export const createTransferOrder = async (order: CreateOrder) => {
  const { data } = await api.post('/orders/whatsapp', order)
  return data
}

export const createCardOrder = async (order: CreateOrder) => {
  const { data } = await api.post('/orders/stripe', order)
  return data;
}

// Beneficiaries
export const getMyBeneficiaries = async () => {
  const { data } = await api.get('/orders/beneficiary')
  return data
}

export const getMyOrders = async () => {
  const { data } = await api.get('/orders/my-orders')
  return data
}
