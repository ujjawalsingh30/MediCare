import multer from "multer";
import path from 'path';
import fs from 'fs';


const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}// ensure upload folder exists

// multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, uploadDir)
    },
    filename: function (req, file, cd) {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cd(
            null, uniqueName + path.extname(file.originalname)
        )
    },
})

// file filter
const fileFilter = (req,file,cd) => {
    if(
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/webp"
    ) {
        cd(null, true);
    } else {
        cd(new Error("only image files are allowed"), false);
    }
};

// multer config
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024. //5mb
    },
});

export default upload;