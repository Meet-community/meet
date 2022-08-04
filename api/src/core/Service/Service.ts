import { Models } from '../../models';
import { AuthCtx, Ctx } from '../../server/typedefs';
import { User } from '../../models/User';

export class Service {
  protected readonly models: Models;
  protected readonly authUser: User | null;
  protected readonly ctx: Ctx;

  constructor(ctx: Ctx) {
    this.models = ctx.models;
    this.authUser = ctx.authUser;
    this.ctx = ctx;
  }
}

export class AuthService {
  protected readonly models: Models;
  protected readonly authUser?: User;
  protected readonly ctx: AuthCtx;

  constructor(ctx: AuthCtx) {
    this.models = ctx.models;
    this.authUser = ctx.authUser;
    this.ctx = ctx;
  }
}
