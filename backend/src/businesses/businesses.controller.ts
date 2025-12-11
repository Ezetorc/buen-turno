import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { BusinessesService } from './businesses.service'
import { CreateBusinessDto } from './dto/create-business.dto'
import { Protected } from 'src/common/decorators/protected.decorator'
import { User } from 'src/common/decorators/user.decorator'
import { JwtUser } from 'src/users/entities/jwt-user.entity'

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Protected()
  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto, @User() user: JwtUser) {
    return this.businessesService.create(createBusinessDto, user.sub)
  }

  @Protected()
  @Get('/:id')
  async findById(@Param('id') id: string, @User() user: JwtUser) {
    return this.businessesService.findById(id, user.sub)
  }
}
