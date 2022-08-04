import { UploadApiResponse, v2 as cloudinaryBase } from 'cloudinary';
import { FileUpload } from 'graphql-upload';

export class CloudinaryService {
  private cloudinary;
  private stage: string = process.env.NODE_ENV || '';

  constructor() {
    cloudinaryBase.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    this.cloudinary = cloudinaryBase;
  }

  private async upload(options: UploadOptions): Promise<UploadApiResponse> {
    const { createReadStream, mimetype } = await options.file;

    if (!['image/x-png', 'image/png', 'image/jpeg', 'image/jpg'].includes(mimetype)) {
      throw Error('BAD_REQUEST');
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
