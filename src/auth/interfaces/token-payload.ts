export interface AccessTokenPayload extends JWTPayload {
  sub: string;
  email: string;
  role: string;
  type: 'ACCESS';
}

export interface RefreshTokenPayload extends JWTPayload {
  sub: string;
  role: string;
  type: 'REFRESH';
}

type JWTPayload = {
  iss?: string
  sub?: string
  aud?: string | string[]
  exp?: number
  nbf?: number
  iat?: number
  jti?: string
  [propName: string]: unknown
}
