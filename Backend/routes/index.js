const express = require("express");
const router = express.Router();
const autoAssignController = require("../controller/autoAssign");
const homeController = require("../controller/home");
const dateController = require("../controller/changeDate");
router.get("/", homeController.home);
router.put("/sites", dateController.changeDate);
router.post("/auto-assign", autoAssignController.autoAssign);

module.exports = router;
