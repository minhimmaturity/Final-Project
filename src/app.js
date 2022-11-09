const express = require('express')

const app = express()

const models = require('./models/account.model');
app.set('view engine', 'hbs')
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

const { authRouter } = require('./routes/auth.route')

//cac request co chua /admin se di den controller admin
const auth = require('./controllers/auth.controller');



// const { ObjectId } = require('mongodb')

// const {
//     getDatabase,
//     deleteProduct,
//     getAllDocumentsFromCollection,
//     getDocumentById,
//     insertObjectToCollection,
//     updateCollection
// } = require('./databaseHandler')


// const cookieParser = require('cookie-parser')
// app.use(cookieParser())

const path = require('path');
const hbs = require('hbs');
const async = require('hbs/lib/async')
const { redirect } = require('express/lib/response')
const console = require('console')

const partialsPath = path.join(__dirname, "/views/partials");
hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs')
app.set('views', '../views');

app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }))

// const session = require('express-session')
// app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false }))


app.use(authRouter)
    // app.get('/login', async(req, res) => {


//     const category = await categories()

//     res.render('login', { category: category, totalProduct: totalProduct })

// })

// app.post('/login', async(req, res) => {
//     const phone = req.body.txtEmail

//     const password = req.body.password


//     if (!user) {
//         res.render('login', { err: "User dose not exist or wrong password." })
//         return
//     } else {

//         await res.cookie('userId', user.email)

//         res.redirect('/user')
//     }


const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is running! " + PORT)