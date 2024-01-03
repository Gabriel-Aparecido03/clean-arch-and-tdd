import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications.repository'
import { SendNotifcationUseCase } from './send-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotifcationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotifcationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able a question by slug', async () => {
    const notification = await sut.execute({
      content: 'lorem content',
      recipientId: '1',
      title: 'lorem title',
    })

    expect(notification.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      notification.value?.notification,
    )
  })
})
