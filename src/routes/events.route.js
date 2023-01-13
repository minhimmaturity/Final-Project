const express = require("express");

const eventsRouter = express.Router();


eventsRouter.post(
    "/event"
);


eventsRouter.get(
    "/events"
);


module.exports = { eventsRouter };