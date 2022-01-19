const express = require("express");

const mongoose = require("mongoose");
const morgan = require("morgan");
const url = "mongodb://localhost/Edureka";
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const router = require("./routes/users");

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;
app.use(morgan("dev"));
const path = require("path");

app.use(express.static(path.join(__dirname, "./task_project/static")));
// const routes = require("./controllers/users");
const PORT = process.env.PORT || 8000;
app.use("/users", require("./routes/users"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.set("views", __dirname + "/task_project/views");

conn.on("open", () => {
 console.log("Connected to Edureka database");
});

// app.use(routes);
app.listen(PORT, () => {
 console.log(`Server listening on http://localhost:${PORT}`);
});
