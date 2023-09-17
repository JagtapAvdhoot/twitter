import {v2,DeleteApiResponse,UploadApiResponse,UploadApiOptions} from "cloudinary";
import async from "async";

const uploadFunction = v2.uploader.upload;
const destroyFunction = v2.uploader.destroy;

export async function uploadFile(files:string[],options:UploadApiOptions){
  const uploads = [];
  try {
    for(let file of files) {
      uploadFunction(file,options,(error,result)=> {
        if(error) return [error,null]

        
      });
    }
  } catch (error) {
    return [null,error];
  }
} 


export async function removeFile(files:string[]) {

}
