import { Models } from '../../models';
import { Ctx } from '../../../server/typedefs';

export class Repository {
  protected readonly models: Models;

  constructor(ctx: Ctx) {
    this.models = ctx.models;

    return this;
  }
}
