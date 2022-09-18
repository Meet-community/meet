import TrelloNodeAPI from 'trello-node-api';
import { ENV, getEnvVariable } from '../../helpers/getEnvVariable';
import { CreatCardDate, CreateFeedbackArgs } from './typefefs';
import { parseUserAgent } from '../../helpers/parseUserAgent';

export class TrelloService {
  trello: TrelloNodeAPI;

  constructor() {
    const apiKey = getEnvVariable(ENV.TrelloApiKey);
    const oAuth = getEnvVariable(ENV.TrelloOAuth);

    this.trello = new TrelloNodeAPI();

    this.trello.setApiKey(apiKey);
    this.trello.setOauthToken(oAuth);
  }

  async createCard(data: CreatCardDate) {
    return this.trello.card.create(data);
  }

  async createFeedback(options: CreateFeedbackArgs) {
    const listId = getEnvVariable(ENV.TrelloFeedbackListId);

    return this.createCard({
      idList: listId,
      name: options.creatorEmail || 'not auth user',
      desc: this.prepareFeedbackDescription(options),
      pos: 'top',
    });
  }

  protected prepareFeedbackDescription(options: CreateFeedbackArgs): string {
    const { browser, cpu, os, device, engine } = parseUserAgent(
      options.userAgent || ''
    );

    const preparedRows = [
      options.feedback,
      '',
      '---',
      '',
      `- email: ${options.creatorEmail}`,
      `- route: ${options.route}`,
      `- userAgent: ${options.userAgent}`,
      '-',
      `- browserName: ${browser.name}`,
      `- browserVersion: ${browser.version}`,
      `- browserMajor: ${browser.major}`,
      '-',
      `- osName: ${os.name}`,
      `- osVersion: ${os.version}`,
      '-',
      `- deviceVendor: ${device.vendor}`,
      `- deviceModel: ${device.model}`,
      `- deviceType: ${device.type}`,
      '-',
      `- engineName: ${engine.name}`,
      `- engineVersion: ${engine.version}`,
      '-',
      `- cpuArchitecture: ${cpu.architecture}`,
    ];

    return preparedRows.join('\n');
  }
}
