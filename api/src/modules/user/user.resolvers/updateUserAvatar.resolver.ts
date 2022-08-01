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

export const updateUserAvatarResolver: AuthResolver<Promise<User>,
  Options> = async (_, options, ctx) => {
  const { file } = options.args;
  const userRepository = new UserRepository(ctx);
  const cloudinaryService = new CloudinaryService();
  const { authUser } = ctx;

  const uploadResult = await cloudinaryService.updateUseAvatar({
    userId: authUser.id,
    file,
  });

  return userRepository.update(
    authUser.id,
    { avatar: uploadResult.secure_url }
  );
};
