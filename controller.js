const {getDb} = require("./database/connect");
const {ObjectId} = require("mongodb");

let lastId = "IkejaStakeConference0010-tes";

const getAttendees = async function(req, res) {
    try{
        const collection = getDb().db().collection("attendees");
        const attendees = await collection.find().toArray();

        res.status(200).json(attendees);
    }catch (err) {
        res.status(500).json("Sorry I Couldn't get Attendees")
    }
} 


const getAttendance = async function(req, res) {
    try{

        updateAttendance();
        const collection = getDb().db().collection("attendance_total");
        const attendees = await collection.find().toArray();

        res.status(200).json(attendees);
    }catch (err) {
        res.status(500).json("Sorry I Couldn't get Attendance")
    }
}

const addAttendance = async function (req, res) {
    
    
    try{
        const attendeesCollection = getDb().db().collection("attendees");


        
        if(!req.body.attendeeId.startsWith("IkejaStakeConference")){
            res.status(406).json("Not Stake Conference QR");
            return;
        }



        const attendee = {
            fullName: req.body.fullName,
            scanTime: Date.now(),
            attendeeId: req.body.attendeeId
        }


        if(attendee.attendeeId == lastId ){
            res.status(409).json("This person is already marked present");
            return;
        }

        lastId = attendee.attendeeId;

        

        
        if(await isPresent(req.body.attendeeId)){
            res.status(409).json("This person is already marked present");
        }else{

            const response = attendeesCollection.insertOne(attendee);
            res.status(201).json(response);
            console.log(response)   

            updateAttendance();
        }
        

    }catch (err) {
        res.status(500).json(err || "Sorry, I couldn't post that")
    }
}



// HELPERS

const isPresent = async function(attendeeID) {
    console.log(attendeeID)
    const attendeesCollection = await getDb().db().collection("attendees");
    const attendee = await attendeesCollection.findOne({attendeeId: attendeeID});

    console.log(attendee)
    return attendee;   
}

const updateAttendance = async function () {
    const attendeesCollection = await getDb().db().collection("attendees");
    const attendanceNumberCollection = await getDb().db().collection("attendance_total");

    const number = await attendeesCollection.countDocuments();
    const updatedAttendance = await attendanceNumberCollection.updateOne( 
        { 
            _id: new ObjectId("686b01aa3a121dca3686ca13") }
            ,{$set: {attendance: number}} );

    console.log("Attendance Updated", updatedAttendance)
}

module.exports = {
    getAttendees,
    getAttendance,
    addAttendance
}