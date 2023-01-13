const express = require('express')
const app = express()

app.use(express.static('assets'))
var jwt = require('../../jwt/tokenUtils')

var Account = require("../../models/account.model");
var Student = require("../../models/student.model");
var Event = require("../../models/event.model");
var LogChange = require("../../models/logChange.model");
var Payment = require("../../models/payment.model");
var Scholarship = require("../../models/scholarship.model");
var Email = require("../../models/email.model");
var nodemailer = require('nodemailer');

const createNewStudent = async(req, res) => {
    var data = req.body;
    console.log(data);
    Account.createAccount(data, async function(status, account) {
        if (account) {
            const _token = await jwt.make(account);
            var shortURL = "http://localhost:3000/" +
                Math.random().toString(36).replace(/[^a-z0-9]+/gi, '').substring(2, 10);

            res.send({ status: status, token: _token, shortURL: shortURL })
        } else {
            res.send({ status: status, token: account })
        }


    });
}

const homeAdmission = async(req, res) => {
    res.render('homeAdmission');
}


const checkProfile = async(student) => {

    if (student.birthday == null ||
        student.hightSchool == null ||
        student.graduationYear == null ||
        student.address == null ||
        student.phoneNumberFather == null ||
        student.phoneNumberMother == null ||
        student.nameFather == null ||
        student.nameMother == null ||
        student.giayChungNhanTotNghiep == null ||
        student.anhChanDung == null ||
        student.bangTotNghiepTHPT == null ||
        student.giayKhaiSinh == null ||
        student.hocBaTHPT == null ||
        student.cccd == null ||
        student.englishLevel == null ||
        student.phiGiuCho == null ||
        student.phiXetTuyen == null
    ) {
        return "Chưa đủ hồ sơ"
    } else {
        return "Đủ hồ sơ"
    }
}

const checkPhiGiuCho = async(student) => {
    //check phi giu cho

    if (student.phiGiuCho == null || student.phiGiuCho <= 5000000) {
        return "Chưa đóng phí giữ chỗ"
    } else {
        return "Đã đóng phí giữ chỗ"
    }
}



const checkPhiXetTuyen = async(student) => {
    //check phi xet tuyen

    if (student.phiXetTuyen == null || student.phiXetTuyen <= 10500000) {
        return "Chưa đóng phí xét tuyển"
    } else {
        return "Đã đóng phí xét tuyển"
    }
}


const getStudent = async(req, res) => {
    //view student by id
    Student.getById(req.params.id, function(err, student) {
        if (err) {
            res.send(err)
        } else {
            //status of profile
            checkProfile(student).then((result) => {
                student.trangThaiHoSo = result;
                //update student database
                Student.updateById(req.params.id, student, function(err, student) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("update success")
                    }
                });
            });

            //status of phi giu cho
            checkPhiGiuCho(student).then((result) => {
                student.phiGiuCho = result;
                Student.updateById(req.params.id, student, function(err, student) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("update success")
                    }
                });

            });

            //status of phi xet tuyen
            checkPhiXetTuyen(student).then((result) => {
                student.phiXetTuyen = result;
                Student.updateById(req.params.id, student, function(err, student) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("update success")
                    }
                });
            });

            var scholarship = null;
            //get schcolarship of student
            Scholarship.getByStudentId(student.id, function(err, scholarship) {
                if (err) {
                    return (err);
                } else {
                    scholarship = scholarship
                    return scholarship
                }
            });

            res.send({ student: student, logChange: getLogChange(student.id), scholarship: scholarship });
        }
    });



}


//tình trạng thay đổi hồ sơ

const getLogChange = async(studentId) => {
    LogChange.getById(studentId, function(err, logChange) {
        if (err) {
            return err;
        } else {
            return logChange;
        }

    });
}


//remove log change seledcted
const removeLogChange = async(req, res) => {
    //get all logchange seledcted from client
    var logChange = req.body;
    for (var i = 0; i < logChange.length; i++) {
        LogChange.remove(logChange[i].id, function(err, logChange) {
            if (err) {
                res.send(err)
            } else {
                res.send(logChange);
            }
        });
    }


}

//change student profile according to log change
const changeStudentProfileByLogChange = async(req, res) => {
    var logChange = req.body;
    var studentId = logChange[0].studentId;
    Student.getById(studentId, function(err, student) {
        if (err) { res.send(err) } else {
            for (var i = 0; i < logChange.length; i++) {
                student[logChange[i].type] = logChange[i].new_value; //change student profile
                //update student profile
                Student.updateById(student, function(err, student) {
                    if (err) {
                        res.send(err);
                    } else {
                        //remove log change
                        LogChange.remove(logChange[i].id, function(err, logChange) { //remove log change
                            if (err) {
                                res.send(err)
                            } else {
                                res.send(logChange);
                            }
                        });
                        console.log("update success")
                    }
                });

            }
        }
    });
}


//add scholarship for student
const addScholarship = async(req, res) => {
    let scholarship = new Scholarship({
       Id : req.body.Id,
        StudentId : req.body.StudentId,
        ValueScholarship    : req.body.ValueScholarship,
        TypeScholarship: req.body.TypeScholarship,
        AdmissionId: req.body.AdmissionId,
       DatePropose: req.body.DatePropose,
    
    } );
    Scholarship.create(scholarship, function(err, scholarship) {
        if (err) {
            res.send(err);
        } else {
            res.send(scholarship);
        }
    });
}

//update scholarship for student
const updateScholarship = async(req, res) => {
    var studentId = req.body.studentId;
    Scholarship.updateById(scholarship, studentId, function(err, scholarship) {
        if (err) {
            res.send(err);
        } else {
            res.send(scholarship);
        }
    });
}

//remove scholarship for student
const removeScholarship = async(req, res) => {
    var schcolarshipId = req.body.schcolarshipId;
    Scholarship.remove(schcolarshipId, function(err, scholarship) {
        if (err) {
            res.send(err)
        } else {
            res.send(scholarship);
        }
    });

}

// render send mail page
const renderSendMail = async(req, res) => {
    //get email address of admission from database
    var email = null;
    //get admission email


    res.send('sendMail', { email: email });
}

//send mail from admission
const sendMail = async(req, res) => {
    var emailSent = req.body.emailSent;
    var emailReceived = req.body.emailReceived;
    var subject = req.body.subject;
    var content = req.body.content;
    var files;

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, '../../../assets/upload/');
        },

        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('multiple_files', 10);

    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        files = req.files;
        // let result = `<h2>Images uploaded</h2>`;
        // let index, len;
        // // Loop through all the uploaded images and display them on frontend
        // for (index = 0, len = files.length; index < len; ++index) {
        //     result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
        // }
        // result += '<hr/><a href="./">Upload more images</a>';
        // res.send(result);
    });



    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailSent,
            pass: 'yourpassword'
        }
    });
    var mailOptions = {
        from: emailSent,
        to: emailReceived,
        subject: subject,
        text: content,
        files: files,
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

//get all email sent
const getAllEmailSent = async(req, res) => {
    var emailSent = req.body.emailSent;
    Email.getByEmailSent(emailSent, function(err, email) {
        if (err) {
            res.send(err);
        } else {
            res.send(email);
        }
    });
}

//remove email sent
const removeEmailSent = async(req, res) => {
    var emailId = req.body.emailId;
    Email.remove(emailId, function(err, email) {
        if (err) { res.send(err) } else {
            res.send(email);
        }
    });
}

//get all email received
const getAllEmailReceived = async(req, res) => {
    var emailReceived = req.body.emailReceived;
    Email.getByEmailReceived(emailReceived, function(err, email) {
        if (err) {
            res.send(err)
        } else {
            res.send(email);
        }
    });
}



module.exports = {
    createNewStudent,
    homeAdmission,
    getStudent,
    getAllEmailReceived,
    getAllEmailSent,
    sendMail,
    renderSendMail,
    removeScholarship,
    updateScholarship,
    addScholarship,
    changeStudentProfileByLogChange,
    removeLogChange
}