const express = require("express");
const router = express.Router();
const requestController = require("../controllers/studentRequestController");

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

router.get("/student", wrapAsync(requestController.getStudent));
router.post("/student", wrapAsync(requestController.postStudent));
router.put("/student/:id", wrapAsync(requestController.putStudent));
router.get("/student/:id", wrapAsync(requestController.getStudentById));
router.delete("/student/:id", wrapAsync(requestController.deleteStudent));

router.use((req, res) => {
  res.status(404).send("Page Not Found");
});

router.use((err, req, res, next) => {
  const { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).send(message);
});

module.exports = router;
