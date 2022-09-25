//Packages used
const express = require("express");
const mongoose = require("mongoose");

//app & port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.use(require("./routes"));

//mongoose.connect tells Mongoose which database we want to connect to.  if the MONGODB_URI exists, we will use this otherwise use the local mongodb server
mongoose.connect(
  process.env.MONGODB_URI || "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));
