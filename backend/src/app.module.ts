import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getEnvConfiguration } from './configuration/env.configuration'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { BusinessesModule } from './businesses/businesses.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './common/guards/roles.guard'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getEnvConfiguration] }),
    AuthModule,
    UsersModule,
    BusinessesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
