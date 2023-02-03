// const { validationResult } = require("express-validator")
// const bcrypt = require("bcryptjs")
// const jwt = require('jsonwebtoken');

const express = require('express')
const app = express()
const { prepareResponse } = require("../../common/response");
var jwt = require('../../jwt/tokenUtils')


const hbs = require('hbs');
const async = require('hbs/lib/async')



app.set('view engine', 'hbs')
app.set('views', './views');

app.use(express.static('assets'))


var Account = require("../../models/account.model");
var token = require("../../jwt/tokenUtils");



// const signIncontroller = async(req, res) => {
//     var data = req.body;
//     console.log(data);
//     Account.getByPhoneAndPassword(data, async function(status, account) {
//         if (account) {
//             const _token = await jwt.make(account);
//             res.send({ status: status, token: _token })
//         } else {
//             res.send({ status: status, token: null })
//         }
//     });
// }

const signIncontroller = async(req, res) => {
    var data = req.body;
    console.log(data);
    Account.getByPhoneAndPassword(data, async function(status, account) {
        if (account) {
            console.log(account);
            res.status(200).json({ idToken: token.make(account), expiresIn: 480 })
        } else {
            res.sendStatus(401);
        }
    });
}

const updateAccount = async(req, res) => {
    //update account

}


const home = async(req, res) => {
    res.render('login');
}

const isAuth = async function(req, res, next) {
    var _token = req.headers.authorization;
    if (_token) {
        try {
            var authData = await jwt.check(_token);

            req.auth = authData; // req chứa biến auth thì trong các routers khác có thể dùng auth này để lấy thông tin user được gửi lên
            next();
        } catch (err) {
            return res.send({ data: "Token không hợp lệ" })
        }

    } else {
        return res.send({ data: "Bạn chưa gửi kèm mã token" })
    }


    console.log(_token);

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

module.exports = { signIncontroller, home, isAuth }