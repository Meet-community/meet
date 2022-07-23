import { generateAccessToken } from './methods/generateAccessToken';
import { validateAccessToken } from './methods/validateAccessToken';

export const jwtService = {
  generateAccessToken,
  validateAccessToken,
}
