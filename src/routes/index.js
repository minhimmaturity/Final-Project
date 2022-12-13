const { authRouter } = require('./auth.route');
const { studentRouter } = require('./student.route');
const { admissionsRouter } = require('./admissions.route');
module.exports = {
    authRouter,
    studentRouter,
    admissionsRouter
};