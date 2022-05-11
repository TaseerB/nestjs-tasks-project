import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { name, email, password } = authCredentialsDto;

    const user = new User();

    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return `user ${name} + ${email} is created succesfully`;
    } catch (err) {
      console.error({ err });

      if (err.code === '23505')
        throw new ConflictException(`${email} already exists!`);

      throw new InternalServerErrorException(err);
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const { email, password } = authCredentialsDto;

    const user = await this.findOne({ email });

    console.info({ user, password, email });

    if (user && (await user.validatePassword(password))) {
      return { id: user.id, name: user.name, email: user.email };
    } else throw new NotFoundException(`something is not right`);
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
