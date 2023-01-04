const prepareResponse = (res, status, message, args) => {
    res.status(status).json({
        message,
        ...args, //... để lấy tất cả các thuộc tính của args và gán vào đây (args là 1 object) 
    });
};

// const ACTION = {
//     CLASS_USER: 'CLASS_USER',
//     USER_ATTENDANCE: 'USER_ATTENDANCE',
//     CLASS_CALENDAR: 'CLASS_CALENDAR',
// };

// module.exports = { prepareResponse, ACTION };
module.exports = { prepareResponse };