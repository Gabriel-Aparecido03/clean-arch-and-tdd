import { Comment } from '@/domain/forum/enterprise/entities/comment'

export class commentPresenter {
  static toHttp(comment: Comment<any>) {
    return {
      id: comment.id.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }
  }
}
