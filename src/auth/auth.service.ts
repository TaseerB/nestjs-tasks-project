import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/common/common-interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user: UserInterface = await this.userRepository.login(
      authCredentialsDto,
    );

    console.info({ user });

    const payload = { name: user.name, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };

    // return user;
  }
}
