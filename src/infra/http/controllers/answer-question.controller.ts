import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AnswerQuestionUseCase } from '@/domain/forum/aplication/use-cases/answer-question'

const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

const pipeValidationPipe = new ZodValidationPipe(answerQuestionBodySchema)

@Controller('/questions/:questionId/answer')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(pipeValidationPipe) body: AnswerQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content, attachments } = body
    const { sub: userId } = user

    const result = await this.answerQuestion.execute({
      content,
      authorId: userId,
      attachmentsIds: attachments,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
