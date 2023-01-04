const express = require('express')

const multer = require('multer')
const path = require('path')
const hbs = require('hbs')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

const { prepareResponse } = require('../../common/response')

// const partialsPath = path.join(__dirname, "/views/partials")
// hbs.registerPartials(partialsPath);


var Event = require('../../models/event.model');
var Student = require('../../models/student.model');


// index create new event
const indexCreateNewEvent = async(req, res) => {
    let listStudent = await Student.getAll();
    res.render('events/createNewEvent', { listStudent: listStudent })
}


const createNewEvent = async(req, res) => {
    let event = new Event({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time_zone: req.body.time_zone,
        expense: req.body.expense,
        tickets: req.body.tickets,
        description: req.body.description
            // time: req.body.time,
            // location: req.body.location,
            // image: req.body.image,
            // status: req.body.status,
            // type: req.body.type,
            // createdBy: req.body.createdBy,
            // updatedBy: req.body.updatedBy,
            // createdAt: req.body.createdAt,
            // updatedAt: req.body.updatedAt
    })

    //get list student selected from all students
    let listStudent = req.body.listStudent;
    let listStudentSelected = [];
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].selected == true) {
            listStudentSelected.push(listStudent[i]);
        }
    }

    //add event
    Event.create(event, function(err, event) {
        if (err) {
            res.send(err);
        } else {
            //add event_student
            listStudentSelected.forEach(student => {
                Event.create_event_student(event, student, function(err, event) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(prepareResponse(event));
                    }
                });

            });

        }
    });
}

// selected function
// const selected = async(req, res) => {

//     let id = req.params.id;

//     Event.getById(id, function(err, event) {

//         if (err) {
//             res.send(err);
//         } else {
//             Student.getAll(function(err, students) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     Event.get_event_student(id, function(err, event_students) {
//                         if (err) {
//                             res.send(err);
//                         } else {
//                             let listStudent = [];
//                             for (let i = 0; i < students.length; i++) {
//                                 let student = students[i];
//                                 let selected = false;
//                                 for (let j = 0; j < event_students.length; j++) {
//                                     let event_student = event_students[j];
//                                     if (student.id == event_student.student_id) {
//                                         selected = true;
//                                         break;
//                                     }
//                                 }
//                                 listStudent.push({ id: student.id, name: student.name, selected: selected });
//                             }
//                             res.render('event/selected', { event: event, listStudent: listStudent });
//                         }
//                     });
//                 }
//             });
//         }
//     })
// }

//get an event
const getEvent = async(req, res) => {
    let id = req.params.id;
    //get list student
    let listStudent = await Student.getAll();
    //get event
    let event = await Event.getById(id);
    //get event_student
    let event_students = await Event.get_event_student(id);

    //send data to view
    res.render('events/updateEvent', { event: event, listStudent: listStudent, event_students: event_students })

}

const homeEvents = async(req, res) => {
    Event.getAll(function(err, events) {
        if (err) {
            res.send(err);
        } else {
            res.render('event/index', { events: events });
        }
    });
}

//update event
const updateEvent = async(req, res) => {
    let event = new Event({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time_zone: req.body.time_zone,
        expense: req.body.expense,
        tickets: req.body.tickets,
        description: req.body.description
    })

    //get list student selected from all students
    let listStudent = req.body.listStudent;
    let listStudentSelected = [];
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].selected == true) {
            listStudentSelected.push(listStudent[i]);
        }
    }

    //update event
    Event.updateById(event, function(err, event) {
        if (err) {
            res.send(err)
        } else {
            //remove all event_student by event_id
            Event.removeEventStudent(event.id, function(err, event) {
                if (err) {
                    res.send(err);
                } else {
                    //add event_student
                    listStudentSelected.forEach(student => {
                        Event.create_event_student(event, student, function(err, event) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.send(prepareResponse(event));
                            }
                        });

                    });

                }
            });


        }
    })
}


//remove event
const removeEvent = async(req, res) => {
    let id = req.params.id;
    //get all list event_student by event_id
    let event_list = await Event.get_event_student(id);
    //remove all event_student by event_id
    for (let i = 0; i < event_list.length; i++) {
        Event.removeEventStudent(event_list[i].id, function(err, event) {
            if (err) {
                prepareResponse(res, 400, "Error", null);
            } else {
                res.send(prepareResponse(res, 200, "OK", event));
            }
        });
    }

    //remove event
    Event.remove(id, function(err, event) {
        if (err) {
            prepareResponse(res, 400, "Error", null);
        } else {
            res.send(prepareResponse(res, 200, "Delete OK", event));
        }
    });


}

module.exports = { homeEvents, createNewEvent, updateEvent, removeEvent }