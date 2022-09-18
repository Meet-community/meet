import UserAgentParser from 'ua-parser-js';

export const parseUserAgent = (userAgent: string):  UserAgentParser.IResult => (
  UserAgentParser(userAgent)
);
