require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const PORT = 8888;

const app = express();

const corsOptions = {
  // TODO - later since I need to check server first
  origin: "https://dashboard-app.herokuapp.com/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", routes);
const port = process.env.PORT || 8888;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err))
  .then(() => {
    app.listen(port, function () {
      console.log("Server is running on Port: " + port);
    });
  });
