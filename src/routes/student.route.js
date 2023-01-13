const express = require("express");

const {
    homeStudent,
    handleUpload,
    getAStudent
} = require("../controllers/Student/student.controller");

const {
    multipleUpload
} = require("../controllers/upload/student.upload.controller");



const studentRouter = express.Router();


studentRouter.post(
    "/student",
    handleUpload
);


studentRouter.get(
    "/student",
    getAStudent,
);


module.exports = { studentRouter };