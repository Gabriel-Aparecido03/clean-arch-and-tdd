import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment'
import { FetchAnswerCommentUseCase } from './fetch-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { makestudent } from 'test/factories/make-student'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: FetchAnswerCommentUseCase

describe('Fetch Question Comment', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answers of questions', async () => {
    const student = makestudent({ name: 'John Doe' })

    inMemoryStudentsRepository.items.push(student)

    const answer1 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-01'),
      authorId: student.id,
    })
    const answer2 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-01'),
      authorId: student.id,
    })
    const answer3 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-01'),
      authorId: student.id,
    })

    await inMemoryAnswerCommentRepository.create(answer1)
    await inMemoryAnswerCommentRepository.create(answer2)
    await inMemoryAnswerCommentRepository.create(answer3)
    const result = await sut.execute({
      answerId: 'answer-01',
      page: 1,
    })
    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'John Doe',
          commentId: answer1.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: answer2.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: answer3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch paginated answers of questions', async () => {
    const student = makestudent({ name: 'John Doe' })

    inMemoryStudentsRepository.items.push(student)
    for (let index = 0; index < 22; index++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-01'),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-01',
      page: 2,
    })
    expect(result.value?.comments).toHaveLength(2)
  })
})
