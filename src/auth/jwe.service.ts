import { Injectable } from '@nestjs/common';
import { CompactEncrypt, EncryptJWT, JWTPayload, compactDecrypt } from 'jose';
import { createHash } from 'crypto';
@Injectable()
export class JweService {
  private readonly secret: Uint8Array;

  constructor() {
    this.secret = createHash('sha256')
      .update(process.env.JWE_SECRET!)
      .digest();
  }

async encrypt(payload: JWTPayload, expiresIn: string): Promise<string> {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .encrypt(this.secret);
}


  async decrypt(token: string): Promise<any> {
    const { plaintext } = await compactDecrypt(token, this.secret);
    return JSON.parse(new TextDecoder().decode(plaintext));
  }
  
}
