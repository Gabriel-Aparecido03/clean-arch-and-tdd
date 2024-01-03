import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryStudentsRepository = new InMemoryStudentsRepository()
let fakerHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakerHasher = new FakeHasher()

    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakerHasher)
  })

  it('should be able to register new student', async () => {
    const result = await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: 'password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should hash student upon registration', async () => {
    const result = await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: 'password',
    })

    const hashedPassword = await fakerHasher.hash('password')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})
