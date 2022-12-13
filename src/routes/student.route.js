const express = require("express");

const {
    homeStudent,
    handleUpload,
} = require("../controllers/Student/student.controller");

const {
    multipleUpload
} = require("../controllers/upload/student.upload.controller");



const studentRouter = express.Router();


studentRouter.post(
    "/student",
    multipleUpload,
    handleUpload,
);


studentRouter.get(
    "/student",
    homeStudent,
);


module.exports = { studentRouter };