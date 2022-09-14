const express = require("express");
const mongoose = require("mongoose");
const api = require("./routes/studentRequests");
const app = express();
const port = 8080;

//connecting database
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/school-app");
  console.log("Mongoose Connected!");
}
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// your code goes here
// routes
app.use("/api", api);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
