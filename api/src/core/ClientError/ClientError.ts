export interface ClientErrorConstructorOptions {
  message?: string;
  error?: Error;
  type?: ClientErrorTypes;
  fields?: Record<string, any>;
  level?: ClientErrorLevels;
}

export enum ClientErrorTypes {
  Unauthorized = 'UNAUTHORIZED',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  BadRequest = 'BAD_REQUEST'
}

export enum ClientErrorLevels {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

const DEFAULT_MESSAGES_BY_TYPE: Record<ClientErrorTypes, string> = {
  [ClientErrorTypes.NotFound]: 'not_found',
  [ClientErrorTypes.BadRequest]: 'bad_request',
  [ClientErrorTypes.Forbidden]: 'forbidden',
  [ClientErrorTypes.Unauthorized]: 'login_not_authorized',
};

const DEFAULT_CONSTRUCTOR_OPTIONS = {
  type: ClientErrorTypes.BadRequest,
  level: ClientErrorLevels.Error,
};

export class ClientError extends Error {
  type: ClientErrorTypes;

  level: ClientErrorLevels;

  fields?: Record<string, any>;

  constructor(
    {
      error,
      fields,
      message: passedMessage,
      type = DEFAULT_CONSTRUCTOR_OPTIONS.type,
      level = DEFAULT_CONSTRUCTOR_OPTIONS.level,
    }: ClientErrorConstructorOptions = DEFAULT_CONSTRUCTOR_OPTIONS,
  ) {
    const message = passedMessage
      || (error && error.message)
      || DEFAULT_MESSAGES_BY_TYPE[type];

    super(message);

    this.name = this.constructor.name;
    this.type = type;
    this.level = level;

    if (fields) {
      this.fields = fields;
    }

    this.stack = error
      ? error.stack
      : new Error().stack;
  }
}
