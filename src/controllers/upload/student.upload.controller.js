const express = require("express");
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../../../assets/upload/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter });
var multipleUpload = upload.fields([{ name: 'giayChungNhanTotNghiep', maxCount: 10 }, { name: 'anhChanDung', maxCount: 10 }, { name: 'bangTotNghiepTHPT', maxCount: 10 }, { name: 'giayKhaiSinh', maxCount: 10 }, { name: 'hocBaTHPT', maxCount: 10 }, { name: 'cccd', maxCount: 10 }, { name: 'chungChiTiengAnh', maxCount: 10 }, { name: 'giayToKhac', maxCount: 10 }])
    // có thể  .array('name_input_image', 10) 10 là số lượng file tối đa có thể upload

module.exports = {
    upload: upload,
    multipleUpload: multipleUpload
}