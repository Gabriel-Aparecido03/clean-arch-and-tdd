import { HashComparer } from '@/domain/forum/aplication/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/aplication/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcryptjs'

@Injectable()
export class BycryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}
