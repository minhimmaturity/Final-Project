const express = require("express");

const {
    homeStudent,
    handleUpload,
    getAStudent,
    addPayment,
    updatePayment,
    removePayment,
    getPayment,
    testUpdateStudent

} = require("../controllers/Student/student.controller");

const {
    multipleUpload
} = require("../controllers/upload/student.upload.controller");



const studentRouter = express.Router();



studentRouter.post(
    "/student",
    handleUpload
);

studentRouter.post(
    "/getAStudent",
    getAStudent
);


studentRouter.get(
    "/student",
    // getAStudent,
    homeStudent
);

studentRouter.post("/testUpdateStudent",testUpdateStudent);


studentRouter.get("/payment", getPayment)

studentRouter.post("/addPayment", addPayment)

studentRouter.put("/updatePayment", updatePayment)

studentRouter.delete("/deletePayment", removePayment)


module.exports = { studentRouter };