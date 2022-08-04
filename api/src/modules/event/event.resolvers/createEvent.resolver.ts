import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { FileUpload } from 'graphql-upload';
import { EventRepository } from '../event.repository';
import { CityService } from '../../City/cityService';
import { EventModel } from '../../../models/EventModel';
import { EventStatus } from '../event.typedefs';
import {
  CloudinaryService
} from '../../../services/cloudinary/cloudinaryService';
import { UploadApiResponse } from 'cloudinary';

interface Options {
  args: {
    title: string;
    description: string;
    startAt: Date;
    endAt: Date;
    logoFile?: FileUpload;
    capacity: number;
    minCapacity: number;
    googleCityId: string;
    googlePlaceId: string;
    logo?: string;
  };
}

export const createEventResolver: AuthResolver<
  Promise<EventModel>,
  Options
> = async (_, { args }, ctx) => {
  const eventRepository = new EventRepository(ctx);
  const cityService = new CityService(ctx);
  const cloudinaryService = new CloudinaryService();

  const { logoFile } = args;

  const { id: creatorId } = ctx.authUser;
  const { id: cityId } = await cityService.ensureCity({ googleId: args.googleCityId });
  const event = await eventRepository.create({
    ...args,
    creatorId,
    cityId,
    status: EventStatus.Pending,
  });

  let createAvatarResult: UploadApiResponse | undefined;

  if (logoFile) {
    createAvatarResult = await cloudinaryService.updateEventLogo({
      eventId: event.id,
      file: logoFile,
    });
  }

  return createAvatarResult
    ? eventRepository.update(event.id, { logo: createAvatarResult.secure_url })
    : event;
};
