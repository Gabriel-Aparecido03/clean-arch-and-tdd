import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { DatabaseModule } from './database/database.module'
import { envSchema } from './env/env'
import { EnvSerivce } from './env/env.service'
import { EnvModule } from './env/env.module'
import { EventsModule } from './events/events.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    HttpModule,
    EnvModule,
    EventsModule,
  ],
  providers: [EnvSerivce],
})
export class AppModule {}
