const db = require('../db/connect');
const Account = function(account) {
    this.phone = account.phone;
    this.password = account.password;
    this.role = account.role;
}

Account.getByPhoneAndPassword = async function(data, result) {

    await db.query('SELECT * FROM account WHERE Phone = ? AND Password = ?', [data.phone, data.password], function(err, account) {
        if (err || account.length == 0 || account == null) {
            result(false, null);
        } else {
            result(true, account[0]);

            // const role = account[0].role;
            // if (role == -1) {
            //     res.render('login')
            // } else {
            //     req.session["Auth"] = {
            //         name: account[0].name,
            //         role: role
            //     }
            //     console.log("Ban dang dang nhap voi quyen la: " + role)
            //     res.redirect('/')
            // }
            // return account.role;
        };
    });

}

Account.changePassword = function(phone, newPassword, ) {
    db.query("UPDATE account SET password = ? WHERE phone = ?", newPassword, phone, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.result);
            result(null, res.result);
        }
    });
}

Account.createAccount = function(data, result) {
    db.query("INSERT INTO account SET ?", data, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

Account.check_login = function(data, result) {

}

module.exports = Account;