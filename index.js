const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const pathRouter = require("./routes/Path");

dotenv.config();

// Middleware
// app.use(cors());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  exposedHeaders: 'Content-Range', // Ensure Content-Range is exposed
};
app.use(cors(corsOptions));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter); // Authentication routes
app.use("/user", userRouter); // User-related routes
app.use("/path", pathRouter); // Path-related routes

// Error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDB();

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
