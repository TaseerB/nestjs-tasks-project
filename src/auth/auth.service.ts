import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  login(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    return this.userRepository.login(authCredentialsDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
