const express = require('express')
const app = express()

app.use(express.static('assets'))
var jwt = require('../../jwt/tokenUtils')

var Account = require("../../models/account.model");

const createNewStudent = async(req, res) => {
    var data = req.body;
    console.log(data);
    Account.createAccount(data, async function(status, account) {
        if (account) {
            const _token = await jwt.make(account);
            var shortURL = "http://localhost:3000/" +
                Math.random().toString(36).replace(/[^a-z0-9]+/gi, '').substring(2, 10);

            res.send({ status: status, token: _token, shortURL: shortURL })
        } else {
            res.send({ status: status, token: account })
        }


    });
}

const homeAdmission = async(req, res) => {
    res.render('homeAdmission');
}

module.exports = { createNewStudent, homeAdmission }