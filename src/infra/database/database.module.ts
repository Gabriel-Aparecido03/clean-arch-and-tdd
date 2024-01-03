import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionCommentRepository } from './prisma/repositories/prisma-question-comment-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswerCommentRepostiory } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { QuestionsRepostiory } from '@/domain/forum/aplication/repositories/question-repository'
import { StudentsRepostiory } from '@/domain/forum/aplication/repositories/student-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-student-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/aplication/repositories/answer-attachments-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/aplication/repositories/question-attachments-repository'
import { QuestionCommentRepository } from '@/domain/forum/aplication/repositories/question-comment-repository'
import { AnswerRepository } from '@/domain/forum/aplication/repositories/answer-repository'
import { AnswerCommentRepository } from '@/domain/forum/aplication/repositories/answer-comment-repository'
import { AttachmentRepository } from '@/domain/forum/aplication/repositories/attachment-repository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachment-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository'
import { CacheModule } from '../cache/cache.module'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: QuestionsRepostiory,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepostiory,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionCommentRepository,
      useClass: PrismaQuestionCommentRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentRepository,
      useClass: PrismaAnswerCommentRepostiory,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AttachmentRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepostiory,
    StudentsRepostiory,
    QuestionCommentRepository,
    QuestionAttachmentsRepository,
    AnswerRepository,
    AnswerCommentRepository,
    AnswerAttachmentsRepository,
    AttachmentRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
