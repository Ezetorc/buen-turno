import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma/client'
import { PrismaService } from 'src/common/services/prisma.service'

@Injectable()
export class BusinessesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.BusinessCreateInput) {
    return await this.prismaService.business.create({ data })
  }

  async findById(id: string) {
    return await this.prismaService.business.findUnique({ where: { id } })
  }
}
