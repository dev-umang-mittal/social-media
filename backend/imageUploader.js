import multer from "multer";

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--image.png");
  },
});

const upload = multer({ storage: fileStorageEngine });

export default upload;
