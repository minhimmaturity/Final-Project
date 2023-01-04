const express = require("express");

const eventsRouter = express.Router();


eventsRouter.post(
    "/event",
    createNewEvent,
);


eventsRouter.get(
    "/events",
    homeEvents,
);


module.exports = { eventsRouter };