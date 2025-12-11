import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma/client'
import { PrismaService } from 'src/common/services/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } })
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({ data })
  }

  async findByPhone(phone: string) {
    return await this.prismaService.user.findUnique({ where: { phone } })
  }
}
