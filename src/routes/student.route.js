const express = require("express");

const {
    homeStudent,
    handleUpload,
    getAStudent,
    addPayment,
    updatePayment,
    removePayment,
    getPayment

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
    // getAStudent,
    homeStudent
);


studentRouter.get("/payment", getPayment)

studentRouter.post("/addPayment", addPayment)

studentRouter.put("/updatePayment", updatePayment)

studentRouter.delete("/deletePayment", removePayment)


module.exports = { studentRouter };