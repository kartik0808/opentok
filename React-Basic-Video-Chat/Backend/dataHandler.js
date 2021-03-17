// Predefined Packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Userdefined Packages
const router = require("./Routes/routes");
const config = require("./Config/config");

const app = express();

//connecting to port no 8887
app.listen(config.portNumber, () => {
  console.log("Server is Runnning");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
app.use(express.static("imgs"));
