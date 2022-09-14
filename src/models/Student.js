const mongoose = require("mongoose");
const Counter = require("./Counter");

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "please enter name"],
  },
  currentClass: {
    type: String,
    required: [true, "please enter class"],
  },
  division: {
    type: String,
    required: [true, "please enter the division"],
  },
});

studentSchema.pre("save", async function (next) {
  const count = await Counter.findOne();
  if (count) {
    this.id = count.seq + 1;
  } else {
    await Counter.create({ user: "count", seq: 0 });
    this.id = 1;
  }
  next();
});

studentSchema.post("save", async function () {
  const id = this.id;
  await Counter.findOneAndUpdate({ user: "count" }, { seq: id });
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
