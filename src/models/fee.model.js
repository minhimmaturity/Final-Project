const db = require('../DB/connect');

const Fee = function(fee) {

    this.Id = fee.Id;
    this.SchoolYear = fee.SchoolYear;
    this.Fee = fee.Fee;
    this.FeeType = fee.FeeType;


}

Fee.create = async function(newFee, result) {
    await db.query("INSERT INTO fee SET ?", newFee, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}


Fee.getAll = async function(result) {
    await db.query("Select * from fee", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Fee : ', res);
            result(null, res);
        }
    });
}

Fee.getById = async function(feeId, result) {
    await db.query("Select * from fee where Id = ? ", feeId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Fee.updateById = async function(fee, result) {

    await db.query("UPDATE fee SET SchoolYear = ?, Fee = ?, Feetype = ? WHERE Id = ?", [fee.SchoolYear, fee.Fee, fee.FeeType, fee.Id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Fee.remove = async function(id, result) {
    await db.query("DELETE FROM fee WHERE Id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


module.exports = Fee;