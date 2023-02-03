const express = require("express");

const {
    addFee,
    updateFee,
    removeFee,
    getFee

} = require("../controllers/manager_admission/manager_admission.controller");




const managerRouter = express.Router();


managerRouter.get("/fee", getFee)

managerRouter.post("/addFee", addFee)

managerRouter.put("/updateFee", updateFee)

managerRouter.delete("/deleteFee", removeFee)


module.exports = { managerRouter };