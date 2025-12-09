import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersRepository } from 'src/users/users.repository'
import { PrismaService } from 'src/common/services/prisma.service'

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService, UsersRepository],
})
export class AuthModule {}
