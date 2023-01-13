const db = require('../DB/connect');

const Scholarship = function(scholarship) {
    this.Id = scholarship.Id;
    this.StudentId = scholarship.StudentId;
    this.ValueScholarship = scholarship.ValueScholarship;
    this.TypeScholarship = scholarship.TypeScholarship;
    this.AdmissionId = scholarship.AdmissionId;
    this.DatePropose = scholarship.DatePropose;

}

Scholarship.create = async function(newScholarship, result) {
    await db.query("INSERT INTO scholarship SET ?", newScholarship, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Scholarship.getAll = async function(result) {
    await db.query("Select * from scholarship", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('scholarship : ', res);
            result(null, res);
        }
    });
}

Scholarship.getById = async function(scholarshipId, result) {
    await db.query("Select * from scholarship where id = ? ", scholarshipId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

//get scholarship by student id
Scholarship.getByStudentId = async function(studentId, result) {
    await db.query("Select * from scholarship where id_account = ? ", studentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}


Scholarship.updateById = async function(scholarship, studentId, result) {

    await db.query("UPDATE scholarship SET id_event = ?, id_account = ?, action = ?, time = ?, description = ? WHERE id = ?", [scholarship.id_event, scholarship.id_account, scholarship.action, scholarship.time, scholarship.description, scholarship.id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


Scholarship.remove = async function(id, result) {
    await db.query("DELETE FROM scholarship WHERE id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = Scholarship;