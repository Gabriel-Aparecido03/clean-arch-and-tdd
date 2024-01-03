import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { AppModule } from '@/infra/app.module'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-question'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { QuestionAttachmentsFactory } from 'test/factories/make-question-attachments'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { QuestionsRepostiory } from '@/domain/forum/aplication/repositories/question-repository'

describe('Prsima Questions Repository (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentsFactory
  let cacheRepository: CacheRepository
  let questionRepository: QuestionsRepostiory
  let jwt: JwtService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        QuestionAttachmentsFactory,
        AttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(QuestionAttachmentsFactory)
    questionAttachmentFactory = moduleRef.get(AttachmentFactory)
    cacheRepository = moduleRef.get(CacheRepository)
    questionRepository = moduleRef.get(QuestionsRepostiory)
    await app.init()
  })

  it('should cachhe question details', async () => {
    const user = await studentFactory.makePrismaService()

    const question = await questionFactory.makePrismaService({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaService()

    await questionAttachmentFactory.makePrismaService({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    const questionDetails = await questionRepository.findDetailsBySlug(slug)

    const cached = await cacheRepository.get(`question:${slug}:details`)

    expect(cached).toEqual(JSON.stringify(questionDetails))
  })

  it('should return cached question details on subsequesnt calls', async () => {
    const user = await studentFactory.makePrismaService()

    const question = await questionFactory.makePrismaService({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaService()

    await questionAttachmentFactory.makePrismaService({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

    const questionDetails = await questionRepository.findDetailsBySlug(slug)

    const cached = await cacheRepository.get(`question:${slug}:details`)

    expect(cached).toEqual(JSON.stringify({ empty: true }))
  })

  it('should reset question details when saving the question', async () => {
    const user = await studentFactory.makePrismaService()

    const question = await questionFactory.makePrismaService({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaService()

    await questionAttachmentFactory.makePrismaService({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `question:${slug}:details`,
      JSON.stringify({ empty: true }),
    )
    await questionRepository.save(question)

    const cached = await cacheRepository.get(`question:${slug}:details`)

    expect(cached).toBeNull()
})
