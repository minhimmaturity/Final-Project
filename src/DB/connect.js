var mysql = require('mysql');

var connecttion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tuyen_Sinh"
});

connecttion.connect(function(err) {
    if (err) {
        console.log("Error");
        throw err;

    } else {
        console.log("Connected!");
    }
});

module.exports = connecttion;