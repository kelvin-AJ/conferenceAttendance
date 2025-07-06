const router = require("express").Router();
const attendanceController = require("./controller");

router.get("/", (req, res) => {
    res.json("Welcome to Stake Conference!")
});


// Get REQUEST
router.get("/attendees", attendanceController.getAttendees);
router.get("/attendance", attendanceController.getAttendance);


// POST Requests
router.post("/attendance", attendanceController.addAttendance);

module.exports = router