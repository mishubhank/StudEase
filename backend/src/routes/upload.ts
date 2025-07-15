const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tutor_images", // optional folder in Cloudinary
    format: async (req: Request, file: File) => "jpg", // or any format you prefer
    public_id: (req: Request, file: any) =>
      `${Date.now()}_${file.originalname}`, // generate a unique ID for each upload
  },
});

const upload = multer({ storage });
module.exports = upload;
