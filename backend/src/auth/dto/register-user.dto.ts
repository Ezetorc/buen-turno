import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string

  @IsEmail()
  email: string

  @IsString()
  @IsPhoneNumber()
  phone: string

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string
}
