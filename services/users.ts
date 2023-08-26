import { api } from './apiClient'

interface CreateUser {
  name: string
  lastName: string
  email: string
  password: string
}

export interface Profile {
    userId: string,
    documentId: string,
    gender: string,
    address: string,
    postalCode: string,
    profession: string,
    phoneNumber: string,
    isoCode: string,
    residenceCountry: string
}

export interface User {
  firstName: string
  lastName: string
  email: string
  profile?: Profile
}

export const createUser = async (user: CreateUser) => {
  const { data } = await api.post('/users', user)
  return data
}

export const loginUser = async (user: CreateUser) => {
  const { data } = await api.post('/auth/login', user)
  return data
}

export async function addProfile (profile: Profile) {
  const response = await api.patch('/users/add-profile', profile)
  console.log(response);
  return response;
}

export async function getUserInfo(): Promise<User> {
  const { data } = await api.get('/users/me')
  return data
}
