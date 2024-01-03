import { HashComparer } from '@/domain/forum/aplication/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/aplication/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
