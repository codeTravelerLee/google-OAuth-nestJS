import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: any): Promise<boolean> {
    //google.strategy.ts의 valdidate수행
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    //sessionSerializer를 수행하여 세션에 request.user정보 저장
    await super.logIn(request);
    return result;
  }
}
