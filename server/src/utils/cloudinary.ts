import {
  v2,
  DeleteApiResponse,
  UploadApiResponse,
  UploadApiOptions,
  ResponseCallback,
} from "cloudinary";
import { IMedia } from "../models/tweet.model";
// import async from "async";

const uploadFunction = v2.uploader.upload;
const destroyFunction = v2.uploader.destroy;

function uploadSingleFile(
  file: string,
  options: UploadApiOptions,
  callback: ResponseCallback
) {
  return new Promise((resolve, reject) => {
    uploadFunction(file, options, (err, response) => {
      if (err) {
        reject(callback(err, null));
      } else {
        resolve(callback(null, response));
      }
    });
  });
}

export async function uploadFile(
  files: string[],
  options: UploadApiOptions
): Promise<[Error | unknown | null, IMedia[] | null]> {
  const uploads: IMedia[] = [];
  try {
    if (Array.isArray(files) && files.length > 0) {
      for (let idx in files) {
        uploadSingleFile(files[idx], options, (error, res) => {
          if (error) throw error;

          uploads.push({
            secure_url: res.secure_url,
            url: res.url,
            type: res.type,
            public_id: res.public_id,
            index: Number(idx),
          });
        });
      }
    }
    return [null, uploads];
  } catch (error) {
    return [error, null];
  }
}

export async function removeFile(files: IMedia[]) {
  try {
    if (Array.isArray(files) && files.length > 0) {
      for (let _file of files) {
        await destroyFunction(_file.public_id);
      }
      return [null, true];
    }
  } catch (error) {
    return [error, null];
  }
}
