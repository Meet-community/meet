export enum USER_ERROR {
  EmailAlreadyExist = 'email_already_exist',
  InvalidToken = 'invalid_token',
  InvalidEmail = 'invalid_email',
  EmailNotConfirmed = 'email_not_confirmed',
  InvalidPassword = 'invalid_password',
  NotAuthorized = 'login_not_authorized',
  NotFound = 'user_not_found',
  TemporaryPasswordNotFound = 'temporary_password_not_found',
}
