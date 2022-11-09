// const { validationResult } = require("express-validator")
// const bcrypt = require("bcryptjs")
// const jwt = require('jsonwebtoken');

const express = require('express')
const app = express()
const { prepareResponse } = require('../CONST/response');


const hbs = require('hbs');
const async = require('hbs/lib/async')




app.set('view engine', 'hbs')
app.set('views', './views');

app.use(express.static('assets'))


var Account = require('../models/account.model');



const signIncontroller = async(req, res) => {
    Account.getByPhoneAndPassword(req.body.phone, req.body.password, function(status, account) {
        res.send({ status: status, result: account })
    });
}


const home = async(req, res) => {
    res.render('login');
}

// try {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//         return prepareResponse(res, 400, { errors: error.array() });
//     }

//     const user = await models.user.findFirst({ where: { email: email } })
//     if (!user) {
//         return prepareResponse(res, 400, "Phone or password incorrrect")
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return prepareResponse(res, 400, "Phone or password incorrrect")
//     }

//     // if (!user.active) {
//     //     return prepareResponse(res, 400, "Please verify your account")
//     // }

//     // // Để xác thực người dùng, xác thực e là ai, đến từ đâu (jwt)
//     // const accessToken = jwt.sign({ user_id: user.id }, process.env.CONFIRM_EMAIL_TOKEN_SECRET, // NÊN ĐẶT KHÓ ĐOÁN, ký khi encode, chữ lý 1 ng khó đoán, đnáh dấu là của mình
//     //     {
//     //         expiresIn: process.env.REFRESH_TOKEN_EXP,
//     //     }
//     // );

//     return prepareResponse(res, 200, { accessToken: accessToken });

// } catch (error) {
//     console.log(error);
//     return prepareResponse(res, 500, error)
// }

module.exports = { signIncontroller, home }