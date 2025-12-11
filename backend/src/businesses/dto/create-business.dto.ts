import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator'
import { BusinessTheme } from 'generated/prisma/enums'

export class CreateBusinessDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  name: string

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  address: string

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  phone: string

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  slug: string

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  timezone: string

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  image: string

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  email: string

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description: string

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  country: string

  @IsEnum(BusinessTheme)
  theme: BusinessTheme
}
