import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'

export function withSSRAuth(fn) {
  // eslint-disable-next-line consistent-return
  return async (ctx) => {
    const cookies = parseCookies(ctx)

    if (!cookies['nextauth.token']) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token')
        destroyCookie(ctx, 'nextauth.refreshtoken')

        return {
          redirect: {
            destination: '/login',
            permanent: false
          }
        }
      }
    }
  }
}
