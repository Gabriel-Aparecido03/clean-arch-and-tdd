import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface ReadNotifcationUseCaseRequest {
  notificationId: string
  recipientId: string
}

type ReadNotifcationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

@Injectable()
export class ReadNotifcationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotifcationUseCaseRequest): Promise<ReadNotifcationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) return left(new ResourceNotFoundError())
    if (recipientId !== notification.recipientId.toString())
      return left(new NotAllowedError())

    notification.read()
    await this.notificationsRepository.save(notification)

    return right({
      notification,
    })
  }
}
