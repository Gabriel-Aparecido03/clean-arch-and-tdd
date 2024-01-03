import { PaginationParams } from '@/core/repositories/pagination-param'
import { Answer } from '../../enterprise/entities/answer'

export abstract class AnswerRepository {
  abstract findById(id: string): Promise<Answer | null>
  abstract create(answer: Answer): Promise<void>
  abstract findManyQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>

  abstract save(answer: Answer): Promise<void>
  abstract delete(answer: Answer): Promise<void>
}
