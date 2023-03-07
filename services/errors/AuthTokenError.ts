export class AuthTokenError extends Error {
  constructor() {
    super('Error con el token de autenticación')
  }
}
