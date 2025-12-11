import { UserRole } from 'generated/prisma/enums'

export class JwtUser {
  sub: string
  role: UserRole
}
