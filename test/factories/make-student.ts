import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Student,
  StudentsProps,
} from '@/domain/forum/enterprise/entities/student'
import { PrismaStudentsMapper } from '@/infra/database/prisma/mappers/prisma-student-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makestudent(
  overrider: Partial<StudentsProps> = {},
  id?: UniqueEntityId,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...overrider,
    },
    id,
  )

  return student
}

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaService(data: Partial<StudentsProps> = {}): Promise<Student> {
    const student = makestudent(data)

    await this.prisma.user.create({
      data: PrismaStudentsMapper.toPrisma(student),
    })

    return student
  }
}
