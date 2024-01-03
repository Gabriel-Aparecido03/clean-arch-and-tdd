import { Module } from '@nestjs/common'
import { EnvSerivce } from './env.service'

@Module({
  providers: [EnvSerivce],
  exports: [EnvSerivce],
})
export class EnvModule {}
