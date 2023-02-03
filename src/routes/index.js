const { authRouter } = require('./auth.route');
const { studentRouter } = require('./student.route');
const { admissionsRouter } = require('./admissions.route');
const { eventsRouter } = require('./events.route');
const { managerRouter } = require('./manager_admission.route');
module.exports = {
    authRouter,
    studentRouter,
    admissionsRouter,
    eventsRouter,
    managerRouter
};