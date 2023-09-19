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
  callback: ResponseCallback,
) {
  uploadFunction(file, options, callback);
}

// code sucks
export async function uploadFile(files: string[], options: UploadApiOptions) {
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

      const uploadPromises = files.map((_file, _index) => uploadSingleFile(_file, options, (error, res) => {
        if (error) throw error;

        uploads.push({
          secure_url: res.secure_url,
          url: res.url,
          type: res.type,
          public_id: res.public_id,
          index: _index,
        });
      }))
    }
    return [uploads, null];
  } catch (error) {
    return [null, error];
  }
}

export async function removeFile(files: IMedia[]) {
  try {
    if (Array.isArray(files) && files.length > 0) {
      for (let _file of files) {
        await destroyFunction(_file.public_id);
      }
      return [true, null];
    }
  } catch (error) {
    return [null, error];
  }
}
