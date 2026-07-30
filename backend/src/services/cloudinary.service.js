import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadImage = (fileBuffer, folder = "tradevault") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          publicId: result.public_id,
          url: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const deleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};