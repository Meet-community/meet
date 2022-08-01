import React, {
  FC, FormEvent, useEffect, useState,
} from 'react';
import {
  useUpdateUserAvatarMutation,
} from '../../../controllers/graphql/generated';

export const Avatar: FC = React.memo(() => {
  const [file, setFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string | null>('');
  const [update, { loading }] = useUpdateUserAvatarMutation();

  useEffect(() => {
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const { result } = fileReader;

        if (typeof result === 'string') {
          setPreviewSource(result);
        }
      };
    }
  }, [file]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || !previewSource) {
      return;
    }

    update({
      variables: {
        args: {
          file,
        },
      },
    });
  };

  const validateFile = (fileToUpload: File) => (
    fileToUpload?.size
    && fileToUpload.size <= 1024 * 1024 * 2
    && ['image/x-png', 'image/png', 'image/jpeg', 'image/gif'].includes(fileToUpload.type)
  );

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="file"
          accept="image/x-png, image/png, image/jpeg, image/gif"
          onChange={({ target: { validity, files } }) => {
            const uploadedFile = files?.[0];

            if (!uploadedFile) {
              return;
            }

            if (validity.valid && validateFile(uploadedFile)) {
              const reader = new FileReader();

              setFile(uploadedFile);
              reader.readAsDataURL(uploadedFile);
              reader.onloadend = () => setPreviewSource(
                String(reader.result),
              );
            } else {
              // eslint-disable-next-line no-alert
              alert('Something wrong');
            }
          }}
        />
        {loading && <p>Loading...</p>}
        <button disabled={!previewSource || !file} type="submit">Save</button>
      </form>
      <img src={previewSource || ''} alt="avatar" />
    </>
  );
});
