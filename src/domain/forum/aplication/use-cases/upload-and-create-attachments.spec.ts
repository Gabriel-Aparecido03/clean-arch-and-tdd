import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachments'
import { FakeUploader } from 'test/uploader/fake-uploader'
import { InvaliAttachmentType } from './errors/invalid-attachment-type'

let inMemoryAttachmentRepository = new InMemoryAttachmentsRepository()
let fakerUploader = new FakeUploader()
let sut: UploadAndCreateAttachmentUseCase

describe('Upload and create attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentsRepository()
    fakerUploader = new FakeUploader()

    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentRepository,
      fakerUploader,
    )
  })

  it('should be able to update and create an attachment', async () => {
    const result = await sut.execute({
      body: Buffer.from(''),
      fileName: 'profile.png',
      fileType: 'image/png',
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentRepository.items[0],
    })
    expect(fakerUploader.uploads).toHaveLength(1)
    expect(fakerUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    )
  })

  it('not should be able to update and create an attachment with invalid fileType', async () => {
    const result = await sut.execute({
      body: Buffer.from(''),
      fileName: 'audio.mp3',
      fileType: 'audio/mpeg',
    })

    expect(result.isRight()).toEqual(false)
    expect(result.value).toBeInstanceOf(InvaliAttachmentType)
  })
})
