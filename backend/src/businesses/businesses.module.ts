import { Module } from '@nestjs/common'
import { BusinessesService } from './businesses.service'
import { BusinessesController } from './businesses.controller'
import { BusinessesRepository } from './businesses.repository'
import { PrismaService } from 'src/common/services/prisma.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [BusinessesController],
  providers: [
    BusinessesService,
    BusinessesRepository,
    PrismaService,
    JwtService,
  ],
})
export class BusinessesModule {}
