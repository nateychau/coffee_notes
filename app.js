//server
const express = require("express");
const app = express();
const path = require('path'); 

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000; //production/development ports
app.listen(port, () => console.log(`Server is running on port ${port}`));

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//db
const db = require('./config/keys').mongoURI;
const mongoose = require("mongoose");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//middleware
const cors = require("cors"); //cors middleware
const bodyParser = require('body-parser'); //middleware for json parsing
//user auth
const users = require("./routes/api/users");
const passport = require('passport'); //user auth
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); //parse json sent to frontend
app.use(passport.initialize());
app.use(cors()); //for any cors issues we might run into with spotify api

//api routes
const notes = require("./routes/api/notes");
const beans = require("./routes/api/beans");
const roasters = require("./routes/api/roasters");
const spotify = require("./routes/api/spotify");

//use routes declared in users.js and note.js
app.use("/api/users", users); 
app.use("/api/notes", notes);
app.use("/api/beans", beans);
app.use("/api/roasters", roasters);
app.use("/api/spotify", spotify);
