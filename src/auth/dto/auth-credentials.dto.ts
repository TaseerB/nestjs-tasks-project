import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(40)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: 'Weak Password!',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;
}
