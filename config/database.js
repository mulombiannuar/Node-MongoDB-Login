require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect("mongodb://mongodb-server:27017/mongo-login");

//plug in the promise library
mongoose.Promise = global.Promise;

const connection = mongoose.connection;
connection.on("error", (error) => console.error(error));
connection.once("open", () => console.log("Connected to Database Server"));

module.exports = connection;
