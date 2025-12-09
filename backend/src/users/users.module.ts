import { Module } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { PrismaService } from 'src/common/services/prisma.service'

@Module({
  providers: [PrismaService, UsersRepository],
})
export class UsersModule {}
