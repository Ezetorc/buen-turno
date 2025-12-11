import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtUser } from 'src/users/entities/jwt-user.entity'

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const { user } = request

    if (!user) throw new UnauthorizedException('Unauthorized')

    return user as JwtUser
  },
)
