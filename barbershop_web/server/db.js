const mongoose = require("mongoose");

// Your MongoDB Atlas connection string
const connectionString =
  "mongodb+srv://webdevproject:webdevprojecttrifumiroase@webdevproject.njpvbfl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

module.exports = db;
