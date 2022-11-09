const db = require('../DB/connect');
const Account = function(account) {
    this.phone = account.phone;
    this.password = account.password;
    this.role = account.role;
}

Account.getByPhoneAndPassword = async function(phone, password, result) {


    await db.query('SELECT * FROM account WHERE phone = ? AND password = ?', [phone, password], function(err, account) {
        if (err || account.length == 0) {
            result("Login failed", null);
        } else {
            result("Login successful", account[0]);
        };
    });

}

module.exports = Account;