import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { User } from '../../../models/User';
import { FileUpload } from 'graphql-upload';
import {
  CloudinaryService
} from '../../../services/cloudinary/cloudinaryService';
import { UserRepository } from '../user.repository';

interface Options {
  args: {
    file: FileUpload;
  };
}

// const cloudinaryUpload = async (file: FileUpload): Promise<any> => {
//   cloudinaryBase.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
//
//   const { createReadStream } = await file;
//
//   return new Promise((resolve, reject) => {
//
//     const stream = createReadStream();
//
//     const streamLoad = cloudinaryBase.uploader.upload_stream(
//       {
//         upload_preset: 'development',
//         folder: 'users/3/avatar',
//         public_id: '3',
//       },
//        (
//         error: any,
//         result: any
//       ) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       });
//
//     stream.pipe(streamLoad);
//
//   });
// };

export const updateUserAvatarResolver: AuthResolver<Promise<User>,
  Options> = async (_, options, ctx) => {
  const { file } = options.args;
  const userRepository = new UserRepository(ctx);
  const clodinaryService = new CloudinaryService();
  const { authUser } = ctx;

  const uploadResult = await clodinaryService.updateUseAvatar({
    userId: authUser.id,
    file,
  });

  return userRepository.update(
    authUser.id,
    { avatar: uploadResult.secure_url }
  );
};
