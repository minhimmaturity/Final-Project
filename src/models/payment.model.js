const db = require('../DB/connect');

const Payment = function(payment) {

    this.id = payment.id;
    this.id_event = payment.id_event;
    this.id_account = payment.id_account;
    this.amount = payment.amount;
    this.date = payment.date;
    this.description = payment.description;
    this.status = payment.status;


}

Payment.create = async function(newPayment, result) {
    await db.query("INSERT INTO payment SET ?", newPayment, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}


Payment.getAll = async function(result) {
    await db.query("Select * from payment", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('payment : ', res);
            result(null, res);
        }
    });
}

Payment.getById = async function(paymentId, result) {
    await db.query("Select * from payment where id = ? ", paymentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Payment.updateById = async function(payment, result) {

    await db.query("UPDATE payment SET id_event = ?, id_account = ?, amount = ?, date = ?, description = ?, status = ? WHERE id = ?", [payment.id_event, payment.id_account, payment.amount, payment.date, payment.description, payment.status, payment.id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Payment.remove = async function(id, result) {
    await db.query("DELETE FROM payment WHERE id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


module.exports = Payment;