import { ConflictException, Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { UsersRepository } from '../users/users.repository'
import bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  async hash(input: string): Promise<string> {
    try {
      const saltRounds = this.configService.getOrThrow<number>('saltRounds')
      return await bcrypt.hash(input, saltRounds)
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`)
    }
  }

  async registerUser(data: RegisterUserDto) {
    const existingUser = await this.usersRepository.findByEmail(data.email)

    if (existingUser) {
      throw new ConflictException('Email already in use')
    }

    const hashedPassword = await this.hash(data.password)

    return await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    })
  }
}
