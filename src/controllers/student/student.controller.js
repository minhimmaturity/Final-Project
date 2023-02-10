const express = require('express')

const multer = require('multer')
const path = require('path')
const fs = require('fs') //filesystem để xử lý file, đọc file, ghi file như private key
const hbs = require('hbs')
const util = require("util");
const fileUpload = require('express-fileupload')
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');




const app = express()

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(fileUpload())
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

// const partialsPath = path.join(__dirname, "/views/partials")
// hbs.registerPartials(partialsPath);


var Student = require('../../models/student.model');
var Scholarship = require('../../models/scholarship.model');
var Account = require('../../models/account.model');
var Payment = require('../../models/payment.model');

var { prepareResponse } = require('../../common/response');
const { get } = require('http')

// HANDLE UPLOAD
// var multipleUpload = multer().fields([{ name: 'giayChungNhanTotNghiep', maxCount: 10 }, { name: 'anhChanDung', maxCount: 10 }, { name: 'bangTotNghiepTHPT', maxCount: 10 }, { name: 'giayKhaiSinh', maxCount: 10 }, { name: 'hocBaTHPT', maxCount: 10 }, { name: 'cccd', maxCount: 10 }, { name: 'chungChiTiengAnh', maxCount: 10 }, { name: 'giayToKhac', maxCount: 10 }])

// let handleUpload = async(req, res) => {

//     multipleUpload(req, res, function(err) {
//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }

//         let giayChungNhanTotNghiep = req.giayChungNhanTotNghiep.filename;
//         let anhChanDung = req.anhChanDung.filename;
//         let bangTotNghiepTHPT = req.bangTotNghiepTHPT.filename;
//         let giayKhaiSinh = req.giayKhaiSinh.filename;
//         let hocBaTHPT = req.hocBaTHPT.filename;
//         let cccd = req.cccd.filename;
//         let chungChiTiengAnh = req.chungChiTiengAnh.filename;
//         let giayToKhac = req.giayToKhac.filename;

//         // var dateObj = new Date();
//         // var month = dateObj.getUTCMonth() + 1; //months from 1-12
//         // var day = dateObj.getUTCDate();
//         // var year = dateObj.getUTCFullYear();

//         // var dir = "../assets/upload/" + day + "_" + month + "_" + year;
//         // console.log(dir)

//         // //create new folder into upload folder with name of date
//         // if (!fs.existsSync(dir)) {
//         //     fs.mkdirSync(dir);
//         // }

//         let student = new Student({
//             id: req.body.id,
//             role: req.body.role,
//             fullname: req.body.fullname,
//             birthday: req.body.birthday,
//             gender: req.body.gender,
//             hightSchool: req.body.hightSchool,
//             graduationYear: req.body.graduationYear,
//             address: req.body.address,
//             email: req.body.email,
//             phone: req.body.phone,
//             linkFacebook: req.body.linkFacebook,
//             phoneNumberFather: req.body.phoneNumberFather,
//             nameFather: req.body.nameFather,
//             phoneNumberMother: req.body.phoneNumberMother,
//             nameMother: req.body.nameMother,
//             emailFather: req.body.emailFather,
//             emailMother: req.body.emailMother,
//             sponsorName: req.body.sponsorName,
//             emailSponsor: req.body.emailSponsor,
//             giayChungNhanTotNghiep: giayChungNhanTotNghiep,
//             anhChanDung: anhChanDung,
//             bangTotNghiepTHPT: bangTotNghiepTHPT,
//             giayKhaiSinh: giayKhaiSinh,
//             hocBaTHPT: hocBaTHPT,
//             cccd: cccd,
//             chungChiTiengAnh: chungChiTiengAnh,
//             giayToKhac: giayToKhac,
//         });
//         Student.updateById(student, function(err, student) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(student);
//             }
//         });
//     });
// }

let getAStudent = (req, res) => {
    let phone = req.body.phone;
    console.log(phone)
    Student.getByPhone(phone, function(status, student) {

        if (student) {
            console.log(student);
            res.status(200).json({ student: student})
        } else {
            res.status(401);
        }
    });
}

//Test update student
let testUpdateStudent = (req, res) => {
    let student = req.body.student;
    let phone = req.body.phone;
    console.log(student)
    Student.testUpdateById(phone, student, function(status, student) {

        if (student) {
            console.log(student);
            res.status(200).json({ student: student})
        } else {
            res.status(401);
        }
    });
}


let debug = console.log.bind(console);
let handleUpload = async(req, res) => {
    try {
        // thực hiện upload
        const storage = multer.diskStorage({
            // Định nghĩa nơi file upload sẽ được lưu lại
            destination: (req, file, callback) => {
                const student = Student.getById(req.query.id);
                callback(null, student.imageFolder);
            },

            filename: (req, file, callback) => {
                // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
                // Chỉ cho phép tải lên các loại ảnh png & jpg
                let math = ["image/png", "image/jpeg"];
                if (math.indexOf(file.mimetype) === -1) {
                    let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
                    return callback(errorMess, null);
                }
                // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
                let filename = `${Date.now()}-quyennx-${file.originalname}`;
                callback(null, filename);
            }
        });


        // const imageFilter = function(req, file, cb) {
        //     // Accept images only
        //     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        //         req.fileValidationError = 'Only image files are allowed!';
        //         return cb(new Error('Only image files are allowed!'), false);
        //     }
        //     cb(null, true);
        // };

        var upload = multer({ storage: storage });

        // Khởi tạo middleware uploadManyFiles với cấu hình như ở trên,
        // Bên trong hàm .array() truyền vào name của thẻ input, ở đây mình đặt là "many-files", và tham số thứ hai là giới hạn số file được phép upload mỗi lần, mình sẽ để là 17 (con số mà mình yêu thích). Các bạn thích để bao nhiêu cũng được.

        // var uploadManyFiles = upload.fields([{ name: 'giayChungNhanTotNghiep', maxCount: 1 }, { name: 'anhChanDung', maxCount: 1 }, { name: 'bangTotNghiepTHPT', maxCount: 10 }, { name: 'giayKhaiSinh', maxCount: 10 }, { name: 'hocBaTHPT', maxCount: 10 }, { name: 'cccd', maxCount: 10 }, { name: 'chungChiTiengAnh', maxCount: 10 }, { name: 'giayToKhac', maxCount: 1 }])
        //     // có thể  .array('name_input_image', 10) 10 là số lượng file tối đa có thể upload

        var uploadManyFiles = upload.fields([{ name: 'TemporaryCertificateOfGraduation', maxCount: 1 }, { name: 'CertificateOfGraduation', maxCount: 1 }, { name: 'PortraitImage', maxCount: 1 }, { name: 'BirthCertificate', maxCount: 1 }, { name: 'StudyRecords', maxCount: 1 }, { name: 'CitizenIdentification', maxCount: 1 }, { name: 'EnglishCertificate', maxCount: 1 }, { name: 'OtherPapers', maxCount: 1 }])

        // Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
        let multipleUploadMiddleware = util.promisify(uploadManyFiles);

        await multipleUploadMiddleware(req, res);
        // Nếu upload thành công, không lỗi thì tất cả các file của bạn sẽ được lưu trong biến req.files
        debug(req.files);
        let student = new Student({
            ID: req.body.id,
            SchoolId: req.body.schoolId,
            Role: req.body.role,
            FullName: req.body.fullname,
            Gender: req.body.gender,
            Birthday: req.body.birthday,
            HightSchool: req.body.hightSchool,
            GraduationYear: req.body.graduationYear,
            Address: req.body.address,
            Email: req.body.email,
            Phone: req.body.phone,
            LinkFacebook: req.body.linkFacebook,
            PhoneNumberFather: req.body.phoneNumberFather,

            NameFather: req.body.nameFather,
            PhoneNumberMother: req.body.phoneNumberMother,
            NameMother: req.body.nameMother,
            EmailFather: req.body.emailFather,
            EmailMother: req.body.emailMother,
            SponsorName: req.body.sponsorName,
            EmailSponsor: req.body.emailSponsor,
            TemporaryCertificateOfGraduation: req.files['TemporaryCertificateOfGraduation'][0], // giấy  chung nhan tot nghiep tam thoi
            CertificateOfGraduation: req.files['CertificateOfGraduation'][0], // bằng tốt nghiệp
            PortraitImage: req.files['PortraitImage'][0], // anh chan dung
            BirthCertificate: req.files['BirthCertificate'][0], //giay khai sinh
            StudyRecords: req.files['StudyRecords'][0], // học bạ THPT
            CitizenIdentification: req.files['CitizenIdentification'][0], //cccd
            EnglishCertificate: req.files['EnglishCertificate'][0], // chứng chỉ tiếng anh dịch là 

            OtherPapers: req.files['OtherPapers'][0], //các giay to khác

            EnglishLevel: req.body.englishLevel,
            CoverImage: req.body.coverImage,

            Addmission: req.body.addmission,

            ProfileStatus: null, //trangThaiHoSo
            ReservationFeeStatus: null, //trangThaiPhiGiuCho
            AdmissionFeeStatus: null, //trangThaiPhiXetTuyen

            LeadSoure: req.body.leadSoure,

            ImageFolder: req.body.imageFolder,
        });


        // Mình kiểm tra thêm một bước nữa, nếu như không có file nào được gửi lên thì trả về thông báo cho client
        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file or more.`);
        }
        // trả về cho người dùng thông tin student:

        Student.updateById(student, function(err, student) {
            if (err) {
                res.send(err);
            } else {
                res.send(student);
            }
        });
    } catch (error) {
        // Nếu có lỗi thì debug lỗi xem là gì ở đây
        debug(error);
        // Bắt luôn lỗi vượt quá số lượng file cho phép tải lên trong 1 lần
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send(`Exceeds the number of files allowed to upload.`);
        }
        return res.send(`Error when trying upload many files: ${error}}`);
    }
};


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
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();

    let account = new Account({
        ID: uuidv4(),
        Phone: req.body.phone,
        Password: "abcde@123",
        Email: req.body.email,
        FullName: req.body.fullname,
        Address: null,
        Role: 1,
        Status: 1,

    });


    let student = new Student({
        ID: uuidv4(),
        SchoolId: null,
        Role: 1,
        FullName: req.body.fullname,
        Gender: null,
        Birthday: null,
        HightSchool: null,
        GraduationYear: null,
        Address: null,
        Email: req.body.email,
        Phone: req.body.phone,
        LinkFacebook: null,
        PhoneNumberFather: null,
        NameFather: null,
        PhoneNumberMother: null,
        NameMother: null,
        EmailFather: null,
        EmailMother: null,
        SponsorName: null,
        EmailSponsor: null,
        TemporaryCertificateOfGraduation: null, // giấy  chung nhan tot nghiep tam thoi
        CertificateOfGraduation: null, // bằng tốt nghiệp
        PortraitImage: null, // anh chan dung
        BirthCertificate: null, //giay khai sinh
        StudyRecords: null, // học bạ THPT
        CitizenIdentification: null, //cccd
        EnglishCertificate: null, // chứng chỉ tiếng anh dịch là 

        OtherPapers: null, //các giay to khác

        EnglishLevel: null,
        CoverImage: null,

        Addmission: null,

        ProfileStatus: null, //trangThaiHoSo
        ReservationFeeStatus: null, //trangThaiPhiGiuCho
        AdmissionFeeStatus: null, //trangThaiPhiXetTuyen

        LeadSoure: null,

        ImageFolder: null
    });

    var dir = path.join(`${__dirname}/../../assets/uploads/${year}`);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var semester = '';
    //compare month to create new folder
    if (1 <= month <= 4) {
        semester = 'Spring'
    } else if (5 <= month <= 8) {
        semester = 'Summer'
    } else if (9 <= month <= 12) {
        semester = 'Fall'
    }

    dir = path.join(`${__dirname}/../../assets/uploads/${year}/${semester}`);
    console.log(dir)

    //create new folder into upload folder with name of date
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }



    // if (!fs.existsSync(dir + "/" + semester + "/" + day + "_" + month + "_" + year + "_" + student.id)) {
    //     fs.mkdirSync(dir + "/" + semester + "/" + day + "_" + month + "_" + year + "_" + student.id);
    // }

    dir = path.join(`${__dirname}/../../assets/uploads/${year}/${semester}/${day}_${month}_${year}_${student.id}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        student.ImageFolder = dir;
    }

    Account.createAccount(account, function(err, account) {
        if (err) { res.send(err); } else {

            Student.create(student, function(err, student) {
                if (err) {
                    res.send(err);
                } else {

                    res.send({ account: account, student: student });
                }
            });

        } //res.send(account);
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
    //convert path to string
    // //view student by id
    // Student.getById(req.params.id, function(err, student) {
    //     if (err) {
    //         res.send
    //     } else {
    //         //status of profile
    //         checkProfile(student).then((result) => {
    //             student.trangThaiHoSo = result;
    //             //update student database
    //             Student.updateById(req.params.id, student, function(err, student) {
    //                 if (err) {
    //                     res.send(err);
    //                 } else {
    //                     console.log("update success")
    //                 }
    //             });
    //         });

    //         //status of phi giu cho
    //         checkPhiGiuCho(student).then((result) => {
    //             student.phiGiuCho = result;
    //             Student.updateById(req.params.id, student, function(err, student) {
    //                 if (err) {
    //                     res.send(err);
    //                 } else {
    //                     console.log("update success")
    //                 }
    //             });

    //         });

    //         //status of phi xet tuyen
    //         checkPhiXetTuyen(student).then((result) => {
    //             student.phiXetTuyen = result;
    //             Student.updateById(req.params.id, student, function(err, student) {
    //                 if (err) {
    //                     res.send(err);
    //                 } else {
    //                     console.log("update success")
    //                 }
    //             });
    //         });

    //         var scholarship = null;
    //         //get schcolarship of student
    //         Scholarship.getByStudentId(student.id, function(err, scholarship) {
    //             if (err) {
    //                 return (err);
    //             } else {
    //                 scholarship = scholarship
    //                 return scholarship
    //             }
    //         });



    //         res.send({ student: student, scholarship: scholarship });
    //     }
    // });




    // var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var day = dateObj.getUTCDate() + 1;
    // var year = dateObj.getUTCFullYear();

    // // var dir = path.join(`${__dirname}/../../assets/uploads/${year}/${semester}/${day}_${month}_${year}_${student.id}`);
    // var dir = path.join(`${__dirname}/../../assets/uploads/${year}`);

    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    // }
    // var semester = '';
    // //compare month to create new folder
    // if (1 <= month <= 4) {
    //     semester = 'Spring'
    // } else if (5 <= month <= 8) {
    //     semester = 'Summer'
    // } else if (9 <= month <= 12) {
    //     semester = 'Fall'
    // }

    // dir = path.join(`${__dirname}/../../assets/uploads/${year}/${semester}`);
    // console.log(dir)

    // //create new folder into upload folder with name of date
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    // }

    // if (!fs.existsSync(dir + "/" + semester)) {
    //     fs.mkdirSync(dir + "/" + semester);
    // }

    // if (!fs.existsSync(dir + "/" + semester)) {
    //     fs.mkdirSync(dir + "/" + semester);
    // }



    // res.send({ path: uuidv4() });
}

//add Payment for student
const addPayment = async(req, res) => {
    let newPayment = new Payment({
        Id: uuidv4(),
        StudentId: req.body.StudentId,
        PaymentValue: req.body.PaymentValue,
        FeeType: req.body.FeeType,
        PaymentDate: req.body.PaymentDate,
    });

    Payment.create(newPayment, function(err, payment) {
        if (err) {
            return prepareResponse(res, 400, 'Add Payment Failed', err);
        } else {
            prepareResponse(res, 201, 'Add Payment Successfully', { payment });
        }
    });
}

//update payment for student
const updatePayment = async(req, res) => {

    let payment = new Payment({
        Id: req.query.Id,
        StudentId: req.body.StudentId,
        PaymentValue: req.body.PaymentValue,
        FeeType: req.body.FeeType,
        PaymentDate: req.body.PaymentDate,
    });
    Payment.updateById(payment, function(err, payment) {
        if (err) {
            return prepareResponse(res, 400, 'Update Payment Failed', err);
        } else {
            prepareResponse(res, 201, 'Update Payment Successfully', { payment });
        }
    });
}

//remove payment for student
const removePayment = async(req, res) => {
    var id = req.query.Id;
    Payment.remove(id, function(err, payment) {
        if (err) {
            return prepareResponse(res, 400, 'Remove Payment Failed', err);
        } else {
            prepareResponse(res, 201, 'Remove Payment Successfully', { payment });
        }
    });

}

//get all payment of student
const getPayment = async(req, res) => {
    var Id = req.query.Id;
    Payment.getById(Id, function(err, payment) {
        if (err) { return prepareResponse(res, 400, 'Get Payment Failed', err); } else {
            prepareResponse(res, 201, 'Get Payment Successfully', { payment });
        }
    });
}

module.exports = { homeStudent, uploadProfile, handleUpload, uploadProfile, getAStudent, addPayment, updatePayment, removePayment, getPayment, testUpdateStudent }


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