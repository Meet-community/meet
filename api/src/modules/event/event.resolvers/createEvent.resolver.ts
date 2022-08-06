import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { FileUpload } from 'graphql-upload';
import { EventRepository } from '../event.repository';
import { CityService } from '../../City/cityService';
import { EventModel } from '../../../models/EventModel';
import { EventStatus } from '../event.typedefs';
import {
  CloudinaryService
} from '../../../services/cloudinary/cloudinaryService';
import { UserEventRepository } from '../../userEvent/userEvent.repository';

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
    googlePlaceId?: string;
    logo?: string;
    eventLink?: string;
  };
}

export const createEventResolver: AuthResolver<
  Promise<EventModel>,
  Options
> = async (_, { args }, ctx) => {
  const eventRepository = new EventRepository(ctx);
  const userEventRepository = new UserEventRepository(ctx);
  const cityService = new CityService(ctx);
  const cloudinaryService = new CloudinaryService();

  const { logoFile, googleCityId } = args;
  const { id: creatorId } = ctx.authUser;
  const { id: cityId } = await cityService.ensureCity({ googleId: googleCityId });

  let event = await eventRepository.create({
    ...args,
    creatorId,
    cityId,
    status: EventStatus.Pending,
  });

  await userEventRepository.create({
    eventId: event.id,
    userId: creatorId,
  });

  if (logoFile) {
    const createAvatarResult = await cloudinaryService.updateEventLogo({
      eventId: event.id,
      file: logoFile,
    });

    event = await eventRepository.update(
      event.id,
      { logo: createAvatarResult.secure_url }
    );
  }

  return event;
};
