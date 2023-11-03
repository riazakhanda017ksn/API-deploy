const express = require("express")
const connectDB = require("./src/db")
const cors = require("cors");
require("dotenv").config()
connectDB();
const noteRouter = require("./src/routes/note");
const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send("Hello ToDo")
})

//imported router available here
app.use("/api/note", noteRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log(`http://localhost:${process.env.PORT || 5000}`);
  });
  