const { authRouter } = require('./auth.route');
const { studentRouter } = require('./student.route');
const { admissionsRouter } = require('./admissions.route');
const { eventsRouter } = require('./events.route');
module.exports = {
    authRouter,
    studentRouter,
    admissionsRouter,
    eventsRouter
};