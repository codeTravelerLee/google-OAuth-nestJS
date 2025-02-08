import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    // private configService: ConfigService, // ConfigService 사용중단(super내에서 사용불가 이슈)
  ) {
    const clientID = process.env.GOOGLE_CLIENT_ID || '';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
    const callbackURL = process.env.GOOGLE_CALLBACK_URL || '';

    // 부모 생성자에 값 전달
    super({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log(`accessToken: ${accessToken}`);
    console.log(`refreshToken:${refreshToken}`);

    const providerId = id;
    if (emails) {
      const email = emails[0].value;
      console.log(providerId, email, name?.familyName, name?.givenName);
    }

    //user저장
    const user: User = await this.userService.findUserByEmailOrSaveUser(
      emails,
      (name?.familyName || '') + (name?.givenName || ''),
      providerId,
    );

    return user;
  }
}
