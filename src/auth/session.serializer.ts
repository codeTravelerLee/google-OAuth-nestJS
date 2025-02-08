import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class sessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    done(null, user.email);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);

    //유저가 없는 경우
    if (!user) {
      done(new Error('no user found'), null);
      return;
    }

    //유저가 존재하는 경우 비밀번호 빼고 전달(보안)
    const { password, ...userInfo } = user;
    done(null, userInfo);
  }
}
