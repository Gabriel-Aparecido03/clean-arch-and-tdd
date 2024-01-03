import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AttachmentRepository } from '@/domain/forum/aplication/repositories/attachment-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(sttachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(sttachment)

    await this.prisma.attachment.create({ data })
  }
}
