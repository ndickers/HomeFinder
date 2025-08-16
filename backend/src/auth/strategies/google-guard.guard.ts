import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private role: string) {
    super();
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const options = super.getAuthenticateOptions(context);
    return {
      ...options,
      accessType: 'offline',
      scope: ['email', 'profile'],
      state: Buffer.from(JSON.stringify({ role: this.role })).toString('base64'),
    };
  }
}
