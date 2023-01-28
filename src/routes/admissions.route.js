const express = require("express");
const {
    createNewStudent,
    homeAdmission,
    addScholarship,
    removeScholarship,
    updateScholarship,
    getScholarship
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

admissionsRouter.put(
    "/updateScholarship",
    updateScholarship,
);

admissionsRouter.delete(
    "/removeScholarship",
    removeScholarship,
);

admissionsRouter.get(
    "/getScholarship",
    getScholarship,
);

admissionsRouter.get(
    "/admission", homeAdmission,
);

module.exports = { admissionsRouter };