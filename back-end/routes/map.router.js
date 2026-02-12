const express = require("express");
const router = express.Router();

const getNearestHospital = require("../controllers/map.controlller");

router.get("/nearest-hospital", getNearestHospital);

module.exports = router;
