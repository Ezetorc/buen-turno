import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getEnvConfiguration } from './configuration/env.configuration'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getEnvConfiguration] }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
