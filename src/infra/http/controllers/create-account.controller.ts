import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
  BadRequestException,
} from '@nestjs/common'

import { z } from 'zod'
import { RegisterStudentUseCase } from '@/domain/forum/aplication/use-cases/register-student'
import { StudentAlreadyExitsError } from '@/domain/forum/aplication/use-cases/errors/student-already-exists-error'
import { Public } from '@/infra/auth/public'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAcountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAcountBodySchema) {
    const { email, name, password } = body

    const result = await this.registerStudent.execute({
      email,
      name,
      password,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case StudentAlreadyExitsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
