const express = require('express')

const multer = require('multer')
const path = require('path')
const fs = require('fs') //filesystem để xử lý file, đọc file, ghi file như private key
const hbs = require('hbs')
const util = require("util");
const fileUpload = require('express-fileupload')
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');




const app = express()

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(fileUpload())
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))


// const partialsPath = path.join(__dirname, "/views/partials")
// hbs.registerPartials(partialsPath);

var Fee = require('../../models/fee.model');

var { prepareResponse } = require('../../common/response');
const { get } = require('http')

//add Fee for student
const addFee = async(req, res) => {
    let newFee = new Fee({
        Id: uuidv4(),
        SchoolYear: req.body.SchoolYear,
        Fee: req.body.Fee,
        FeeType: req.body.FeeType,
    });

    Fee.create(newFee, function(err, fee) {
        if (err) {
            return prepareResponse(res, 400, 'Add Fee Failed', err);
        } else {
            prepareResponse(res, 201, 'Add Fee Successfully', { fee });
        }
    });
}

//update Fee for student
const updateFee = async(req, res) => {

    let fee = new Fee({
        Id: req.query.Id,
        SchoolYear: req.body.SchoolYear,
        Fee: req.body.Fee,
        FeeType: req.body.FeeType,
    });
    Fee.updateById(fee, function(err, fee) {
        if (err) {
            return prepareResponse(res, 400, 'Update fee Failed', err);
        } else {
            prepareResponse(res, 201, 'Update fee Successfully', { fee });
        }
    });
}

//remove fee for student
const removeFee = async(req, res) => {
    var id = req.query.Id;
    Fee.remove(id, function(err, fee) {
        if (err) {
            return prepareResponse(res, 400, 'Remove fee Failed', err);
        } else {
            prepareResponse(res, 201, 'Remove fee Successfully', { fee });
        }
    });

}

//get all fee of student
const getFee = async(req, res) => {
    var Id = req.query.Id;
    Fee.getById(Id, function(err, fee) {
        if (err) { return prepareResponse(res, 400, 'Get fee Failed', err); } else {
            prepareResponse(res, 201, 'Get fee Successfully', { fee });
        }
    });
}

module.exports = { addFee, updateFee, removeFee, getFee }