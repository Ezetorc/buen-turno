import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersRepository } from '../users/users.repository'
import bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { JwtService } from '@nestjs/jwt'
import { SignResponseDto } from './dto/sign-response.dto'
import { SanitizedUserDto } from 'src/users/dto/sanitized-user.dto'
import { JwtUser } from 'src/users/entities/jwt-user.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async hash(input: string): Promise<string> {
    try {
      const saltRounds = this.configService.getOrThrow<number>('saltRounds')
      return await bcrypt.hash(input, saltRounds)
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`)
    }
  }

  async getAuthorization(payload: JwtUser) {
    const secret = this.configService.getOrThrow<string>('jwtSecret')

    return this.jwtService.signAsync(payload, { secret })
  }

  async signUp(data: SignUpDto): Promise<SignResponseDto> {
    const existingUserByEmail = await this.usersRepository.findByEmail(
      data.email,
    )

    if (existingUserByEmail) {
      throw new ConflictException('Email already in use')
    }

    const existingUserByPhone = await this.usersRepository.findByPhone(
      data.phone,
    )

    if (existingUserByPhone) {
      throw new ConflictException('Phone already in use')
    }

    const hashedPassword = await this.hash(data.password)

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    })

    const authorization = await this.getAuthorization({
      sub: user.id,
      role: user.role,
    })

    return new SignResponseDto({
      authorization,
      user: new SanitizedUserDto(user),
    })
  }

  async signIn(data: SignInDto): Promise<SignResponseDto> {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const authorization = await this.getAuthorization({
      sub: user.id,
      role: user.role,
    })

    return new SignResponseDto({
      authorization,
      user: new SanitizedUserDto(user),
    })
  }
}
