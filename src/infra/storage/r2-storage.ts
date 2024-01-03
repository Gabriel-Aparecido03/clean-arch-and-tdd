import {
  UploadParams,
  Uploader,
} from '@/domain/forum/aplication/storage/uploader'
import { Injectable } from '@nestjs/common'
import { EnvSerivce } from '../env/env.service'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client

  constructor(private envService: EnvSerivce) {
    this.client = new S3Client({
      endpoint: 'https://s3.tebi.io',
      credentials: {
        accessKeyId: this.envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.envService.get('AWS_SECRET_ACCESS_KEY'),
      },
      region: 'global',
    })
  }

  async upload({
    body,
    fileName,
    fileType,
  }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}=${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        Body: body,
        ContentType: fileType,
      }),
    )

    return {
      url: uniqueFileName,
    }
  }
}
