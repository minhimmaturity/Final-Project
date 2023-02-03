const express = require('express')

const app = express()

const path = require('path');
const hbs = require('hbs');
const multer = require('multer')

const { signIncontroller, home, isAuth } = require('./controllers/Auth/auth.controller');


const session = require('express-session') // phân role
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false })) // phân role

const fileUpload = require('express-fileupload');
app.use(fileUpload());


app.set('view engine', 'hbs')
app.set('views', '../views');

app.use(express.urlencoded({ extended: true })) // dòng code giúp lấy dữ liệu từ form - body
var bodyParser = require('body-parser') //đọc nội dung repuest gửi lên dạng post từ người dùng
var cors = require('cors') // cho phép truy cập từ các domain khác
app.use(bodyParser.urlencoded({ extended: true })) // khi gửi extended = true thg gặp lỗi về ký tự 
app.use(bodyParser.json()) //đọc body repuest gửi lên theo cấu trúc json
app.use(cors()) // accept request  cross domain

const partialsPath = path.join(__dirname, "/views/partials");
hbs.registerPartials(partialsPath);

app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

const { authRouter, studentRouter, admissionsRouter, eventsRouter, managerRouter } = require('./routes/index');

const auth = require('./controllers/Auth/auth.controller');

//Allow origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

var server = require('http').Server(app);
var io = require('socket.io')(server); //nghĩa là server đag .user cái socket.io

io.on('connection', function(socket) {

    socket.on("Client-chat", function(data) {
        console.log('Client ID = ' + socket.id + ' send: ' + data);
        socket.emit("Server-send", data); //gui cho chinh nguoi dung gui

        // io.sockets.emit("Server-send", data); //gui cho tat ca
        // socket.broadcast.emit("Server-send", data); //gui cho tat ca tru nguoi gui
    });
});


app.use(authRouter)
    // app.use(isAuth); //middleware để xác thực ng dùng bằng token
app.use(studentRouter)
app.use(admissionsRouter)
app.use(eventsRouter)
app.use(managerRouter)


const PORT = process.env.PORT || 3000
server.listen(PORT)
console.log("Server is running! " + PORT)