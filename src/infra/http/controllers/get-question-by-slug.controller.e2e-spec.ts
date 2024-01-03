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

describe('Get Question By Slug (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentsFactory
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
    await app.init()
  })

  test('[GET] /question/:slug', async () => {
    const user = await studentFactory.makePrismaService({ name: 'John Doe' })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const { slug, id } = await questionFactory.makePrismaService({
      authorId: user.id,
      title: 'some-title-question',
    })

    const attachment = await attachmentFactory.makePrismaService({
      title: 'some-title',
    })

    await questionAttachmentFactory.makePrismaService({
      attachmentId: attachment.id,
      questionId: id,
    })

    const response = await request(app.getHttpServer())
      .get(`/question/${slug.value}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      question: expect.objectContaining({
        title: 'some-title-question',
        author: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'some-title',
          }),
        ],
      }),
    })
  })
})
