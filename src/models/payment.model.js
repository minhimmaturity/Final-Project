const db = require('../DB/connect');

const Payment = function(payment) {

    this.Id = payment.Id;
    this.FeeType = payment.FeeType;
    this.StudentId = payment.StudentId;
    this.PaymentDate = payment.PaymentDate;
    this.PaymentValue = payment.PaymentValue;


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
    await db.query("Select * from payment where Id = ? ", paymentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Payment.updateById = async function(payment, result) {

    await db.query("UPDATE payment SET FeeType = ?, StudentId = ?, PaymentDate = ?, PaymentValue = ? WHERE Id = ?", [payment.FeeType, payment.StudentId, payment.PaymentDate, payment.PaymentValue, payment.Id], function(err, res) {
        console.log(payment);
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Payment.remove = async function(id, result) {
    await db.query("DELETE FROM payment WHERE Id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


module.exports = Payment;