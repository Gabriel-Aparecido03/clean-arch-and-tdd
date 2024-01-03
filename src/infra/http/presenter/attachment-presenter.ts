import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class AttachmentPresent {
  static toHttp(attachment: Attachment) {
    return {
      id: attachment.id.toString(),
      url: attachment.url,
      title: attachment.title,
    }
  }
}
