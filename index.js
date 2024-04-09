const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const db = require("./db_connect.js");
async () => {
  await db.sequelize.sync();
};

app.use(cors());

app.get("/", (req, res) => {
  res.send("Fitness App Backend Demo");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
