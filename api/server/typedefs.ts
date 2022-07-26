import { Models } from '../src/models';
import { User } from '../src/models/User';
import express from 'express';

export interface Ctx {
  models: Models;
  authUser: User | null;
  res:  express.Response<any, Record<string, any>>;
}
