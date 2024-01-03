import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { CreateQuestionUseCase } from '@/domain/forum/aplication/use-cases/create-question'
import { DatabaseModule } from '../database/database.module'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/aplication/use-cases/fetch-recent-questions'
import { AuthenticateStudentUseCase } from '@/domain/forum/aplication/use-cases/authenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/aplication/use-cases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/aplication/use-cases/get-question-by-slug'
import { EditQuestionUseCase } from '@/domain/forum/aplication/use-cases/edit-question'
import { EditQuestionController } from './controllers/edit-question.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/aplication/use-cases/delete-question'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/aplication/use-cases/answer-question'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditAnswerUseCase } from '@/domain/forum/aplication/use-cases/edit-answer'
import { DeleteAnswerUseCase } from '@/domain/forum/aplication/use-cases/delete-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { FetchQuestionsAnswersUseCase } from '@/domain/forum/aplication/use-cases/fetch-questions-answer'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answer.controller'
import { ChosseQuestionBestAnswerUseCase } from '@/domain/forum/aplication/use-cases/choose-question-best-answer'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CommentOnQuestionUseCase } from '@/domain/forum/aplication/use-cases/comment-on-question'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteCommentOnQuestionUseCase } from '@/domain/forum/aplication/use-cases/delete-question-comment'
import { CommentOnAnswerUseCase } from '@/domain/forum/aplication/use-cases/comment-on-answer'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteCommentOnAnswerUseCase } from '@/domain/forum/aplication/use-cases/delete-answer-comment'
import { FetchQuestionCommentUseCase } from '@/domain/forum/aplication/use-cases/fetch-question-comment'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'
import { FetchAnswersCommentsController } from './controllers/fetch-answer-comment.controller'
import { FetchAnswerCommentUseCase } from '@/domain/forum/aplication/use-cases/fetch-answer-comment'
import { UploadAttachmentController } from './controllers/upload-attachments.controller'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/aplication/use-cases/upload-and-create-attachments'
import { StorageModule } from '../storage/storage.module'
import { ReadNotificationController } from './controllers/read-notification.controller'
import { ReadNotifcationUseCase } from '@/domain/notification/application/use-cases/read-notification'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswersCommentsController,
    UploadAttachmentController,
    ReadNotificationController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionsAnswersUseCase,
    ChosseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteCommentOnQuestionUseCase,
    CommentOnAnswerUseCase,
    DeleteCommentOnAnswerUseCase,
    FetchQuestionCommentUseCase,
    FetchAnswerCommentUseCase,
    UploadAndCreateAttachmentUseCase,
    ReadNotifcationUseCase,
  ],
})
export class HttpModule {}
