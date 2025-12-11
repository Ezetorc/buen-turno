import { SanitizedUserDto } from 'src/users/dto/sanitized-user.dto'

export class SignResponseDto {
  authorization: string
  user: SanitizedUserDto

  constructor(partial: Partial<SignResponseDto>) {
    Object.assign(this, partial)
  }
}
