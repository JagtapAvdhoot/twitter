const cloudinary = require("cloudinary").v2;
const async = require("async");

cloudinary.config({
    api_key: "",
    api_secret: "",
    cloud_name: "",
});

async function uploadFilesToCloudinary(files, cloudinaryConfig) {
    const uploadPromises = [];
    for (const file of files) {
        uploadPromises.push(uploadFileToCloudinary(file, cloudinaryConfig));
    }

    async.parallel(uploadPromises, (error, results) => {
        if (error) {
            return [error, null];
        }
        return [null, results];
    });
}

async function uploadFileToCloudinary(file, cloudinaryConfig) {
    cloudinary.config(cloudinaryConfig);

    const uploadResult = await cloudinary.uploader.upload(file);

    return {
        secure_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        url: uploadResult.url,
    };
}

module.exports = {
    uploadFilesToCloudinary,
};
