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
  .patch(controller.updatePassword);
router.route("/confirmOTP").post(controller.confirmOTP);

router.route("/settings").get(controller.getSettings);

router
  .route("/settingsTable")
  .get(controller.getSettingsTable)
  .delete(controller.deleteSettingsTable);

router.route("/roomTable").get(controller.getRoomTable);

router.route("/tableGroupe").get(controller.getTableGroupe);

router.route("/test").post(controller.postTest).put(controller.updateTest);



router
  .route("/chapters")
  .get(controller.getChapters)
  .put(controller.updateChapters);
router.route("/sousChapitre").get(controller.getSousChapitre);

router.route("/teacherSettings").get(controller.getTeacherSettings)

router
  .route("/salleTable")
  .get(controller.getSalle)
  .post(controller.createSalle)
  .put(controller.updateSalle)
  .delete(controller.deleteSalle);

router
  .route("/moduleTable")
  .get(controller.getModule)
  .post(controller.createModule)
  .put(controller.updateModule)
  .delete(controller.deleteModule);

router
  .route("/groupTable")
  .get(controller.getGroupe)
  .post(controller.createGroupe)
  .put(controller.updateGroupe)
  .delete(controller.deleteGroupe);

router.route(`/groupeTableSettings`).get(controller.getGroupTableSettings);


router.route('/scheduleTable').get(controller.getScheduleTable)


module.exports = router;
// dont forget to clear window.location storage
//  localStorage.clear();
