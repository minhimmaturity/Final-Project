const db = require('../DB/connect');

const Event = function(event) {
    this.id = event.id;
    this.name = event.name;
    this.date = event.date;
    this.time_zone = event.time_zone;
    this.expense = event.expense;
    this.tickets = event.tickets;
    this.description = event.description;

}

Event.create = async function(newEvent, result) {
    await db.query("INSERT INTO event SET ?", newEvent, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Event.getAll = async function(result) {
    await db.query("Select * from event", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('event : ', res);
            result(null, res);
        }
    });
}

Event.getById = async function(eventId, result) {
    await db.query("Select * from event where id = ? ", eventId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Event.updateById = async function(event, result) {

    await db.query("UPDATE event SET name = ?, date = ?, time_zone = ?, expense = ?, tickets = ? WHERE id = ?", [event.name, event.date, event.time_zone, event.expense, event.tickets, event.id], function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Event.removeEvent = async function(id, result) {
    // remove event_student by id event
    await db.query("DELETE FROM event WHERE id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


Event.removeEventStudent = async function(id, result) {
    // remove event_student by id event
    await db.query("DELETE FROM event_student WHERE event_id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}



Event.create_event_student = async function(event, student, result) {
    await db.query("INSERT INTO event_student SET ?", { event_id: event.id, studentId: student.id }, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}


Event.update_event_student = async function(event, student, result) {
    await db.query("UPDATE event_student SET studentId = ? WHERE event_id = ?", [student.id, event.id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


Event.get_all_even_student = async function(eventId, result) {
    await db.query("Select * from event_student where event_id = ? ", eventId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}




module.exports = Event;