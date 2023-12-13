const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { newNotification, allNotification, deleteNotification, seenNotification } = require("../controllers/notificationsCtrl");


router.post("/notify", authMiddleware,newNotification)
router.get("/fetchAllNotifications", authMiddleware,allNotification)
router.delete("/deleteNotification/:id", authMiddleware,deleteNotification)
router.put("/seenAllNotifications/", authMiddleware, seenNotification)

module.exports = router;
