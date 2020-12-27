//server
const express = require("express");
const app = express();

const port = process.env.PORT || 5000; //production/development ports
app.listen(port, () => console.log(`Server is running on port ${port}`));

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
// app.use(passport.session());

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



