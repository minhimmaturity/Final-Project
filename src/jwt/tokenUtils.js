const jwt = require('jsonwebtoken');

const ACCESS_TOKEN = 'ABC123DFGFDHGGXFHBFG';
const TOKEN_TIME_LIFE = '1h';

//tạo mã token
let make = function(user) {
    return new Promise(function(resolve, reject) {
        jwt.sign({ data: user }, ACCESS_TOKEN, {
                algorithm: 'HS256',
                expiresIn: TOKEN_TIME_LIFE,
            },
            function(err, _token) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(_token);
                }
            });
    });
}



//check => xác thực mã đúng, sai, hết hạn

let check = function(token) {
    return new Promise(function(resolve, reject) {
        jwt.verify(token, ACCESS_TOKEN, function(err, decoded) {
            if (err) {
                return reject(err); // nếu sai trả về lỗi đó
            } else {
                return resolve(decoded); //nếu đúng thì trả về mã token và decode thành user với email và name
            }
        });
    });
}




module.exports = { make: make, check: check };