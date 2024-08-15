import { Cloudinary } from "@cloudinary/url-gen";

export const cloudinaryClient = new Cloudinary({
  cloud: { cloudName: "dat31taco" },
});
