import { api } from './apiClient'

export const getPairRates = async () => {
  const { data } = await api.get('/orders/pair-rates')
  return data
}

export const updatePrice = async (pairRateId: number, price: number) => {
  const { data } = await api.patch(`/orders/pair-rates/${pairRateId}`, {
    price
  })
  return data
}
