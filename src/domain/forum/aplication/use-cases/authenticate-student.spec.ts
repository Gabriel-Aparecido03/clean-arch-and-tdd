import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncryter } from 'test/cryptography/fake-encrypter'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makestudent } from 'test/factories/make-student'

let inMemoryStudentsRepository = new InMemoryStudentsRepository()
let fakerHasher: FakeHasher
let fakerEcrypter: FakeEncryter
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakerHasher = new FakeHasher()
    fakerEcrypter = new FakeEncryter()

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakerHasher,
      fakerEcrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makestudent({
      email: 'johndoe@email.com',
      password: await fakerHasher.hash('password'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: 'password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
