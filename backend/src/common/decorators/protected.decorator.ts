import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from './roles.decorator'
import { UserRole } from 'generated/prisma/enums'

export function Protected(...roles: UserRole[]) {
  if (roles.length > 0) {
    return applyDecorators(UseGuards(AuthGuard, RolesGuard), Roles(...roles))
  } else {
    return applyDecorators(UseGuards(AuthGuard))
  }
}
