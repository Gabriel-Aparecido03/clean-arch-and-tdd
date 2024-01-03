import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { StudentsRepostiory } from '@/domain/forum/aplication/repositories/student-repository'
import { PrismaStudentsMapper } from '../mappers/prisma-student-mapper'
import { Student } from '@/domain/forum/enterprise/entities/student'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepostiory {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const question = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!question) return null
    return PrismaStudentsMapper.toDomain(question)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentsMapper.toPrisma(student)

    await this.prisma.user.create({ data })
  }
}
