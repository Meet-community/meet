import { UploadApiResponse, v2 as cloudinaryBase } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import {
  ClientError,
  ClientErrorTypes
} from '../../core/ClientError/ClientError';
import { IMAGE_ERROR } from '../../core/ClientError/clientError.constans';
import { ENV, getEnvVariable } from '../../helpers/getEnvVariable';

export class CloudinaryService {
  private cloudinary;
  private stage: string = getEnvVariable(ENV.NodeEnv);

  constructor() {
    cloudinaryBase.config({
      cloud_name: getEnvVariable(ENV.CloudinaryCloudName),
      api_key: getEnvVariable(ENV.CloudinaryApiKey),
      api_secret: getEnvVariable(ENV.CloudinaryApiSecret),
    });

    this.cloudinary = cloudinaryBase;
  }

  private async upload(options: UploadOptions): Promise<UploadApiResponse> {
    const { createReadStream, mimetype } = await options.file;

    if (!['image/x-png', 'image/png', 'image/jpeg', 'image/jpg'].includes(mimetype)) {
      throw new ClientError({
        type: ClientErrorTypes.BadRequest,
        message: IMAGE_ERROR.BadType,
        fields: { type: mimetype },
      });
    }

    return new Promise((resolve, reject) => {

      const stream = createReadStream();

      const streamLoad = cloudinaryBase.uploader.upload_stream(
        {
          upload_preset: this.stage,
          folder: options.folder,
          public_id: options.publicId,
        },
        (
          error: any,
          result,
        ) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

      stream.pipe(streamLoad);

    });
  }

  async updateUseAvatar(options: UpdateUserAvatar) {
    const { userId, file } = options;

    return await this.upload({
      file,
      publicId: String(userId),
      folder: `users/${userId}/avatar`,
    });
  }

  async updateEventLogo(options: UpdateEventLogo) {
    const { eventId, file } = options;

    return await this.upload({
      file,
      publicId: String(eventId),
      folder: `events/${eventId}/logo`,
    });
  }
}

interface UploadOptions {
  file: FileUpload;
  folder: string;
  publicId: string;
}

interface UpdateUserAvatar {
  userId: number;
  file: FileUpload;
}

interface UpdateEventLogo {
  eventId: number;
  file: FileUpload;
}
