const express = require("express");
const {
    createNewStudent,
    homeAdmission,
} = require("../controllers/admission/admissions.controller");

const admissionsRouter = express.Router();

admissionsRouter.post(
    "/newStudent",
    createNewStudent,
);

admissionsRouter.get(
    "/admission", homeAdmission,
);

module.exports = { admissionsRouter };