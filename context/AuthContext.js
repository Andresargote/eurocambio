import { createContext, useEffect, useState } from 'react'
import { destroyCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { api } from '../services/apiClient'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const router = useRouter()

  const [user, setUser] = useState(null)

  const isAuthenticated = !!user

  const signOut = () => {
    destroyCookie(undefined, 'nextauth.token')
    destroyCookie(undefined, 'nextauth.refreshtoken')
    //setUser(null)
    router.push('/login')
  }

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api
        .get('/users/me')
        .then((response) => {
          const { data } = response

          setUser({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            isAdmin: data.isAdmin,
            isVerified: data.isVerified
          })
        })
        .catch(() => {
          destroyCookie(undefined, 'nextauth.token')
          destroyCookie(undefined, 'nextauth.refreshtoken')

          router.push('/login')
        })
    }
  }, [])

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isAuthenticated,
        user,
        setUser,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
