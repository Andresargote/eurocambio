import { api } from './apiClient'

interface User {
  name: string
  lastName: string
  email: string
  password: string
}

export const createUser = async (user: User) => {
  const { data } = await api.post('/users', user)
  return data
}

export const loginUser = async (user: User) => {
  const { data } = await api.post('/auth/login', user)
  return data
}

export const getUserInfo = async () => {
  const { data } = await api.get('/users/me')
  return data
}
