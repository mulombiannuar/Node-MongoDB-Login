require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

//plug in the promise library
mongoose.Promise = global.Promise;

const connection = mongoose.connection;
connection.on("error", (error) => console.error(error));
connection.once("open", () => console.log("Connected to Database"));

module.exports = connection;
