// run this file 'node src/preload.js' - to empty previous data and preload the data with some initials

const mongoose = require("mongoose");
const initialData = require("./InitialData"); // array of initial Data
const Student = require("./models/Student");
const Counter = require("./models/Counter");
//Connect Database
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/school-app");
  console.log("Mongoose Connected!");
}

const preloadData = async () => {
  await Student.deleteMany({});
  await Counter.deleteMany({});
  for (const data of initialData) {
    await Student.create({ ...data });
  }
};

preloadData().then(() => {
  mongoose.connection.close();
  console.log("Data Loaded");
});
