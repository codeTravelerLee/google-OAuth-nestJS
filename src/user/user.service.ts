import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(email: string) {
    const result = await this.userRepository.findOne({
      where: { email: email },
    });

    return result;
  }
  async findUserByEmailOrSaveUser(email, username, providerId) {
    const foundUser = await this.getUser(email);

    //이미 가입된 유저라면 -> 유저 정보만 반환
    if (foundUser) {
      return foundUser;
    }

    //DB에 해당 유저가 없다면 -> 신규 유저로 가입시키자
    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
    });

    return newUser;
  }
}
