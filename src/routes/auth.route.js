const express = require("express");
var JWT = require("../jwt/tokenUtils");

const {
    signIncontroller,
    home,
    changePassword
} = require("../controllers/Auth/auth.controller");

const authRouter = express.Router();

authRouter.post(
    "/login",
    signIncontroller,
);

authRouter.post(
    "/changePassword",
    changePassword,
);

authRouter.get(
    "/login", home,
);

//TEST TOKEN

// authRouter.get('/token', async function(req, res) {
//     var user = {
//         ưsername: 'admin',
//         email: 'admin@example.com',
//     };
//     const _token = await JWT.make(user);
//     res.send({ token: _token });
// });



// authRouter.get('/check_token', async function(req, res) {
//     try {
//         var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Isawc2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2NzA0NDI4ODUsImV4cCI6MTY3MDQ0NjQ4NX0.Dq4wb4GNB2tjWVZv-DTp8jkBKcp0Pwq7kPnXtlpF4zk"
//         const data = await JWT.check(token);
//         res.send({ data: data });
//     } catch (err) {
//         res.send({ data: "Mã token không hợp lệ" });
//     }

// });
module.exports = { authRouter };