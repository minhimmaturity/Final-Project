const express = require("express");
const {
    createNewStudent,
    homeAdmission,
    addScholarship,
} = require("../controllers/admission/admissions.controller");

const admissionsRouter = express.Router();

admissionsRouter.post(
    "/newStudent",
    createNewStudent,
);

admissionsRouter.post(
    "/addScholarship",
    addScholarship,
);

admissionsRouter.get(
    "/admission", homeAdmission,
);

module.exports = { admissionsRouter };