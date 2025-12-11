import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateBusinessDto } from './dto/create-business.dto'
import { BusinessesRepository } from './businesses.repository'

@Injectable()
export class BusinessesService {
  constructor(private businessesRepository: BusinessesRepository) {}

  async create(data: CreateBusinessDto, ownerId: string) {
    return await this.businessesRepository.create({
      ...data,
      owner: { connect: { id: ownerId } },
    })
  }

  async findById(id: string, ownerId: string) {
    const business = await this.businessesRepository.findById(id)

    if (!business) {
      throw new NotFoundException('Business not found')
    }

    if (business.ownerId !== ownerId) {
      throw new UnauthorizedException(
        'You are not authorized to access this business',
      )
    }

    return business
  }
}
