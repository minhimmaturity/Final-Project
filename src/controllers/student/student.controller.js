const express = require('express')

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const hbs = require('hbs')
const fileUpload = require('express-fileupload')

const app = express()

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(fileUpload())
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

const { prepareResponse } = require('../../common/response')

// const partialsPath = path.join(__dirname, "/views/partials")
// hbs.registerPartials(partialsPath);


var Student = require('../../models/student.model');
var Scholarship = require('../../models/scholarship.model');

// HANDLE UPLOAD
var multipleUpload = multer().fields([{ name: 'giayChungNhanTotNghiep', maxCount: 10 }, { name: 'anhChanDung', maxCount: 10 }, { name: 'bangTotNghiepTHPT', maxCount: 10 }, { name: 'giayKhaiSinh', maxCount: 10 }, { name: 'hocBaTHPT', maxCount: 10 }, { name: 'cccd', maxCount: 10 }, { name: 'chungChiTiengAnh', maxCount: 10 }, { name: 'giayToKhac', maxCount: 10 }])

let handleUpload = async(req, res) => {

    multipleUpload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }

        let giayChungNhanTotNghiep = req.giayChungNhanTotNghiep.filename;
        let anhChanDung = req.anhChanDung.filename;
        let bangTotNghiepTHPT = req.bangTotNghiepTHPT.filename;
        let giayKhaiSinh = req.giayKhaiSinh.filename;
        let hocBaTHPT = req.hocBaTHPT.filename;
        let cccd = req.cccd.filename;
        let chungChiTiengAnh = req.chungChiTiengAnh.filename;
        let giayToKhac = req.giayToKhac.filename;

        // var dateObj = new Date();
        // var month = dateObj.getUTCMonth() + 1; //months from 1-12
        // var day = dateObj.getUTCDate();
        // var year = dateObj.getUTCFullYear();

        // var dir = "../assets/upload/" + day + "_" + month + "_" + year;
        // console.log(dir)

        // //create new folder into upload folder with name of date
        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir);
        // }

        let student = new Student({
            id: req.body.id,
            role: req.body.role,
            fullname: req.body.fullname,
            birthday: req.body.birthday,
            gender: req.body.gender,
            hightSchool: req.body.hightSchool,
            graduationYear: req.body.graduationYear,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            linkFacebook: req.body.linkFacebook,
            phoneNumberFather: req.body.phoneNumberFather,
            nameFather: req.body.nameFather,
            phoneNumberMother: req.body.phoneNumberMother,
            nameMother: req.body.nameMother,
            emailFather: req.body.emailFather,
            emailMother: req.body.emailMother,
            sponsorName: req.body.sponsorName,
            emailSponsor: req.body.emailSponsor,
            giayChungNhanTotNghiep: giayChungNhanTotNghiep,
            anhChanDung: anhChanDung,
            bangTotNghiepTHPT: bangTotNghiepTHPT,
            giayKhaiSinh: giayKhaiSinh,
            hocBaTHPT: hocBaTHPT,
            cccd: cccd,
            chungChiTiengAnh: chungChiTiengAnh,
            giayToKhac: giayToKhac,
        });
        Student.updateById(student, function(err, student) {
            if (err) {
                res.send(err);
            } else {
                res.send(student);
            }
        });
    });
}


const uploadProfile = async(req, res) => {
    //add new a student 


    // // name of the input is sampleFile
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }
    // uploadPath = __dirname + '../../../assets/upload/' + sampleFile.name;

    // sampleFile = req.files.sampleFile;

    // // Use the mv() method to place the file somewhere on your server
    // giayChungNhanTotNghiep
    //     .mv(uploadPath, function(err) {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         res.send('File uploaded!');
    //     });
    // res.render('student/profile');
}

const createNewStudent = async(req, res) => {

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let student = new Student({
        role: "Student",
        fullname: req.body.fullname,
        birthday: null,
        gender: null,
        hightSchool: null,
        graduationYear: null,
        address: null,
        email: req.body.email,
        phone: req.body.phone,
        linkFacebook: null,
        phoneNumberFather: null,
        nameFather: null,
        phoneNumberMother: null,
        nameMother: null,
        emailFather: null,
        emailMother: null,
        sponsorName: null,
        emailSponsor: null,
        giayChungNhanTotNghiep: null,
        anhChanDung: null,
        bangTotNghiepTHPT: null,
        giayKhaiSinh: null,
        hocBaTHPT: null,
        cccd: null,
        chungChiTiengAnh: null,
        giayToKhac: null,
        englishLevel: null,
        coverImage: null,
        trangThaiHoSo: snull,
        phiGiuCho: null,
        phiXetTuyen: null,


    });

    var semester = '';
    //compare month to create new folder
    if (1 <= month <= 4) {
        semester = 'Spring'
    } else if (5 <= month <= 8) {
        semester = 'Summer'
    } else if (9 <= month <= 12) {
        semester = 'Fall'
    }

    var dir = "../assets/upload/" + year;
    console.log(dir)

    //create new folder into upload folder with name of date
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    if (!fs.existsSync(dir + "/" + semester)) {
        fs.mkdirSync(dir + "/" + semester);
    }

    if (!fs.existsSync(dir + "/" + semester + "/" + day + "_" + month + "_" + year + "_" + student.id)) {
        fs.mkdirSync(dir + "/" + semester + "/" + day + "_" + month + "_" + year + "_" + student.id);
    }

    Student.create(student, function(err, student) {
        if (err) {
            res.send(err);
        } else {
            res.send(student);
        }
    });
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






const homeStudent = async(req, res) => {
    //view student by id
    Student.getById(req.params.id, function(err, student) {
        if (err) {
            res.send
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



            res.send({ student: student, scholarship: scholarship });
        }
    });



}





module.exports = { homeStudent, uploadProfile, handleUpload, uploadProfile }


// UPLOAD IMAGE C2
// const profileStudent = async(req, res) => {
//     let giayChungNhanTotNghiep;
//     let anhChanDung;
//     let bangTotNghiepTHPT;
//     let giayKhaiSinh;
//     let hocBaTHPT;
//     let cccd;
//     let chungChiTiengAnh;
//     let giayToKhac;
//     let uploadPath;
//     // name of the input is sampleFile
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     uploadPath = __dirname + '../../../assets/upload/' + sampleFile.name;

//     sampleFile = req.files.sampleFile;

//     // Use the mv() method to place the file somewhere on your server
//     giayChungNhanTotNghiep.mv(uploadPath, function(err) {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.send('File uploaded!');
//     });