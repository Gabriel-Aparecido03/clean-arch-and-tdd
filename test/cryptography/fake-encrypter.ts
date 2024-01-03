import { Encrypter } from '@/domain/forum/aplication/cryptography/encrypter'

export class FakeEncryter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
