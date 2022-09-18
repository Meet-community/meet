import { Models } from '../models';
import { User } from '../models/User';
import express from 'express';

export interface Ctx {
  models: Models;
  authUser: User | null;
  res:  express.Response<any, Record<string, any>>;
  req:  express.Request;
}

export interface AuthCtx extends Ctx {
  authUser: User;
}
