const Student = require("../models/Student");
const AppError = require("../AppError");

module.exports.getStudent = async (req, res, next) => {
  const allStudents = await Student.find({});
  if (!allStudents.length) {
    throw next(
      new AppError(
        "No Record Found, Please Insert Record from the seeds file",
        404
      )
    );
  }
  res.json(allStudents);
};

module.exports.getStudentById = async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findOne({ id });
  if (!student) {
    return next(new AppError("Invalid Id", 404));
  }
  res.json(student);
};

module.exports.postStudent = async (req, res, next) => {
  const { id = 0, name, currentClass, division } = req.body;
  if (!name || !currentClass || !division) {
    return next(new AppError("Incomplete Details", 400));
  }
  const student = await Student.create({ id, name, currentClass, division });
  res.json(student);
};

module.exports.putStudent = async (req, res, next) => {
  const { id } = req.params;
  const { name, currentClass, division } = req.body;
  const student = await Student.findOneAndUpdate(
    { id },
    { id, name, currentClass, division },
    { runValidators: true, new: true }
  );
  if (!student) {
    return next(new AppError("Invalid Id No Record Found!", 400));
  }
  res.json(student);
};

module.exports.deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findOneAndDelete({ id });
  if (!student) {
    return next(new AppError("Invalid Id No Record Found!", 404));
  }
  res.json({ response: "Student Info Deleted", student: student });
};
