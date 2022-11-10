const {
    signIncontroller,
    home,
} = require("../controllers/auth.controller");

const express = require("express");
// const { check } = require("express-validator");

// const bcrypt = require("bcryptjs");

const authRouter = express.Router();

authRouter.post(
    "/",
    // check("phone").not().isEmpty().withMessage("Field email must must be input"),
    // check("password")
    // .not()
    // .isEmpty()
    // .withMessage("Field password must must be input"),
    signIncontroller,
);


authRouter.get(
    "/", home,
);
module.exports = { authRouter };