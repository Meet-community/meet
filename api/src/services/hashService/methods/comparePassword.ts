import bcrypt from 'bcrypt';

export const comparePassword = (inputPassword: string, userPassword: string)=> (
  bcrypt.compare(inputPassword, userPassword)
);
