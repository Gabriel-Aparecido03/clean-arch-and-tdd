import { Either, left, right } from '@/core/either'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteCommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type DeleteCommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteCommentOnQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
    const question = await this.questionCommentsRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())

    if (question.authorId.toString() !== authorId)
      return left(new NotAllowedError())
    await this.questionCommentsRepository.delete(question)

    return right(null)
  }
}
