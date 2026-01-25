const express = require("express");
const router = express.router
const getNearestHospital = require("../controllers/map.controlller")

router.get("/nearest-hospital", getNearestHospital)


export default router;