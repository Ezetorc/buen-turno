import type { User } from 'generated/prisma/client'

export class SanitizedUserDto {
  id: string
  name: string
  role: string
  createdAt: Date
  updatedAt: Date

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.role = user.role
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}
