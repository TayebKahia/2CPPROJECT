const express = require("express");
const router = express.Router();
const controller = require("./controller");

router
  .route("/UserSettings")
  .get(controller.getUser)
  .post(controller.createUser)
  .put(controller.updateUser)
  .delete(controller.deleteUser);

router.route("/login").post(controller.loginUser);

router
  .route("/forgot-password")
  .post(controller.ForgotPassword)
  .patch(controller.confirmPassword);

router.route("/settings").post(controller.fillTable);

router
  .route("/settingsTable")
  .post(controller.fillSettingsTable)
  .delete(controller.deleteSettingsTable);

router.route("/roomTable").post(controller.uploadRoomTable);

router.route("/tableGroupe").post(controller.uploadTableGroupe);

router.route("/test").post(controller.updateTest).put(controller.postTest);

router.route("/room").post(controller.uploadRoom);

router.route("/timeTable").get(controller.getTimeTable);

module.exports = router;
// dont forget to clear window.location storage
//  localStorage.clear();
