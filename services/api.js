import axios from 'axios'
import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let failedRequestsQueue = []

function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshtoken')

  Router.push('/login')
}

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: ` ${cookies['nextauth.token']}`
    }
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        if (error.response.data?.message === 'Token expiro o es invalido') {
          cookies = parseCookies(ctx)

          const { 'nextauth.refreshtoken': refreshTokenUser } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .get('/auth/refresh-access-token', {
                headers: {
                  refreshToken: refreshTokenUser
                }
              })
              .then((response) => {
                const token = response.data.body

                setCookie(ctx, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/'
                })
                setCookie(ctx, 'nextauth.refreshtoken', refreshTokenUser, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/'
                })

                api.defaults.headers['x-auth-token'] = token

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                )
                failedRequestsQueue = []
              })
              // eslint-disable-next-line no-shadow
              .catch((error) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(error)
                )
                failedRequestsQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token) => {
                originalConfig.headers['x-auth-token'] = token
                resolve(api(originalConfig))
              },
              onFailure: (err) => {
                reject(err)
              }
            })
          })
        }
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
