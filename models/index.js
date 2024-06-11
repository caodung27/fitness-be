const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Establish MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      useCreateIndex: true, // Ensure unique fields are indexed
      useFindAndModify: false // To suppress deprecation warnings for findOneAndUpdate
    });
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit with failure
  }
}

// Invoke MongoDB connection function
connectDB();

// Define models and export
const db = {};
db.mongoose = mongoose; // Expose mongoose instance
db.User = require("./User")(mongoose);
db.Path = require("./Path")(mongoose);
db.Post = require("./Post")(mongoose);
db.Comment = require("./Comment")(mongoose);

module.exports = db;
