require("dotenv").config();
const express = require("express");
const app = express();
const {initializeDb} = require("./database/connect");
const router = require("./routes");


const PORT = process.env.PORT



app.use(express.json())
    .use("/", router);

initializeDb((error) => {
    if(error) {
        console.log(error);
    }else {
        app.listen(PORT, () => {
            console.log(`Conference Attendance is Active and running on ${PORT}`)
        })
    }
})