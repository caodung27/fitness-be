const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const pathRouter = require("./routes/Path");

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/path", pathRouter);
// app.get("/", async (req, res) => {
//     res.status(200).json({
//       message: "Hello World!",
//     });
// });

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const db = require("./models");
(async () => {
  try {
    await db.sequelize.sync();
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
})();


const port = process.env.PORT || 8080;
const startServer = async () => {
  try {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();