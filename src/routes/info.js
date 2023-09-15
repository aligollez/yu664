const express = require("express");
const router = express.Router();
const infoService = require("../services/infoService"); // Info tablosunu işleyen servis dosyası

// Tüm kayıtları getiren endpoint
router.get("/", async (req, res) => {
  try {
    const infoData = await infoService.getAllInfo(); // Tüm kayıtları getiren fonksiyon
    res.json(infoData);
  } catch (error) {
    console.error("Error while getting info data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
