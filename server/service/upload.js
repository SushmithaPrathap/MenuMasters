import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
// import { keys } from '../config/dev/keys.js';

// let upload = multer({
//     storage: multerS3({
//         s3: s3,
// 				acl: 'public-read',
//         bucket: 'node-cheat',
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.originalname); //use Date.now() for unique file keys
//         }
//     })
// });

const s3Config = new aws.S3({
    accessKeyId: process.env.s3AccessKey,
    secretAccessKey: process.env.s3SecretKey,
    Bucket: process.env.s3Bucket
  });


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './service/images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: process.env.s3Bucket,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log(file)
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const upload = multer({
    // storage: multerS3Config,
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
})

export default upload;
