import { Encrypter } from '@/domain/forum/aplication/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashComparer } from '@/domain/forum/aplication/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/aplication/cryptography/hash-generator'
import { BycryptHasher } from './bycrypt-hasher'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BycryptHasher },
    { provide: HashGenerator, useClass: BycryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
