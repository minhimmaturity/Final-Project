const db = require('../DB/connect');
//creat an object student

// Student.create({
//     phone: "123456789",
//     fullname: "Nguyen Van A",
//     birthday: "1999-01-01",
//     gender: "Nam",
//     hightSchool: "THPT Nguyen Van Cu",
//     graduationYear: "2017",
//     address: "Ha Noi",
//     email: "quyennxgch190732@gmail.com",
//     linkFacebook: "https://www.facebook.com/quyen.nguyen.581",
//     phoneNumberFather: "123456789",
//     nameFather: "Nguyen Van B",
//     phoneNumberMother: "123456789",
//     nameMother: "Nguyen Thi C",
//     emailFather: "dfdsf@gmail.com",
//     emailMother: "gfdg@gmail.com",
//     sponsorName: "Nguyen Van D",
//     emailSponsor: "cbvfb@gmail.com",
//     giayChungNhanTotNghiep: "https://www.facebook.com/quyen.nguyen.581",
//     bangTotNghiep: "https://www.facebook.com/quyen.nguyen.581",
//     anhChanDung: "https://www.facebook.com/quyen.nguyen.581",
//     giayKhaiSinh: "https://www.facebook.com/quyen.nguyen.581",
//     hocBaTHPT: "https://www.facebook.com/quyen.nguyen.581",
//     cccd: "https://www.facebook.com/quyen.nguyen.581",
//     chungChiTiengAnh: "https://www.facebook.com/quyen.nguyen.581",
//     cacGiayToKhac: "https://www.facebook.com/quyen.nguyen.581",
// }, (err, res) => {
//     if (err) {

//     } else {
//         console.log(res);
//     }
// });

const Student = function(student) {
    this.id = student.id;
    this.role = student.role;
    this.fullname = student.fullname;
    this.birthday = student.birthday;
    this.gender = student.gender;
    this.hightSchool = student.hightSchool;
    this.graduationYear = student.graduationYear;
    this.address = student.address;
    this.email = student.email;
    this.phone = student.phone;

    this.linkFacebook = student.linkFacebook;
    this.phoneNumberFather = student.phoneNumberFather;
    this.nameFather = student.nameFather;
    this.phoneNumberMother = student.phoneNumberMother;
    this.nameMother = student.nameMother;
    this.emailFather = student.emailFather;
    this.emailMother = student.emailMother;
    this.sponsorName = student.sponsorName;
    this.emailSponsor = student.emailSponsor;
    this.temporaryCertificateOfGraduation = student.TemporaryCertificateOfGraduation;
    this.certificateOfGraduation = student.CertificateOfGraduation;
    this.portraitImage = student.PortraitImage;
    this.birthCertificate = student.BirthCertificate;
    this.studyRecords = student.StudyRecords;
    this.citizenIdentification = student.CitizenIdentification;
    this.englishCertificate = student.EnglishCertificate;
    this.otherPapers = student.OtherPapers;
    this.englishLevel = student.EnglishLevel;
    this.coverImage = student.CoverImage;
    this.addmission = student.Addmission;
    this.profileStatus = student.ProfileStatus;
    this.reservationFeeStatus = student.ReservationFeeStatus;
    this.admissionFeeStatus = student.AdmissionFeeStatus;
    this.leadSoure = student.LeadSoure;
    this.imageFolder = student.ImageFolder;

}

Student.create = async function(newStudent, result) {
    await db.query("INSERT INTO student SET ?", newStudent, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Student.getAll = async function(result) {
    await db.query("Select * from student", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('student : ', res);
            result(null, res);
        }
    });
}

Student.getById = async function(studentId, result) {
    await db.query("Select * from student where id = ? ", studentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Student.getByPhone = async function(phone, result) {
    await db.query("Select * from student where Phone = ?", phone, function(err, student) {

        if (err) {
            result(false, null);
        } else {
            result(true, student[0]);

        };
    });
}

Student.updateById = async function(student, result) {

    await db.query("UPDATE student SET fullname = ?, birthday = ?, gender = ?, hightSchool = ?, graduationYear = ?, address = ?, email = ?, linkFacebook = ?, phoneNumberFather = ?, nameFather = ?, phoneNumberMother = ?, nameMother = ?, emailFather = ?, emailMother = ?, sponsorName = ?, emailSponsor = ?, giayChungNhanTotNghiep = ?, bangTotNghiep = ?, anhChanDung = ?, giayKhaiSinh = ?, hocBaTHPT = ?, cccd = ?, chungChiTiengAnh = ?, cacGiayToKhac = ? WHERE id = ?", [student.fullname, student.birthday, student.gender, student.hightSchool, student.graduationYear, student.address, student.email, student.linkFacebook, student.phoneNumberFather, student.nameFather, student.phoneNumberMother, student.nameMother, student.emailFather, student.emailMother, student.sponsorName, student.emailSponsor, student.giayChungNhanTotNghiep, student.bangTotNghiep, student.anhChanDung, student.giayKhaiSinh, student.hocBaTHPT, student.cccd, student.chungChiTiengAnh, student.cacGiayToKhac, student.id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


//Test API update profile
Student.testUpdateById = async function(phone, student, result) {

    await db.query("UPDATE student SET FullName = ?, Gender = ?, GraduationYear = ?, Email = ?, LinkFacebook = ?, PhoneNumberFather = ?, NameFather = ?, PhoneNumberMother = ?, NameMother = ?, EmailFather = ?, EmailMother = ? WHERE Phone = ?", [student.FullName, student.Gender, student.GraduationYear, student.Email, student.LinkFacebook, student.PhoneNumberFather, student.NameFather, student.PhoneNumberMother, student.NameMother, student.EmailFather, student.EmailMother, phone], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(false, err);
        } else {
            result(true, res);
        }
    });
}




Student.remove = async function(id, result) {
    await db.query("DELETE FROM student WHERE id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}




// Student.getByPhoneAndPassword = async function(phone, password, result) {


//     await db.query('SELECT * FROM account WHERE phone = ? AND password = ?', [phone, password], function(err, account) {
//         if (err || account.length == 0) {
//             result("Login failed", null);
//         } else {
//             result("Login successful", account[0]);
//         };
//     });

// }

module.exports = Student;