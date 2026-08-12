import multer from "multer";

const storage = multer.memoryStorage();

const uploadResume = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF resumes are allowed."));
    }
  },
});

export default uploadResume;