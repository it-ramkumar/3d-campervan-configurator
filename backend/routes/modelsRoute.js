// routes/models.js
const express = require("express");
const router = express.Router();
const {
  getInterior,
  getExterior,
  getSystem,
  getAllModels
} = require("../controllers/modelController");


router.get("/interior", getInterior);
router.get("/exterior", getExterior);
router.get("/system", getSystem);
router.get("/all", getAllModels);

module.exports = router;