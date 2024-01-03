import { StudentsRepostiory } from '@/domain/forum/aplication/repositories/student-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepostiory {
  public items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)
    if (!student) return null
    return student
  }

  async create(student: Student) {
    this.items.push(student)
  }
}
