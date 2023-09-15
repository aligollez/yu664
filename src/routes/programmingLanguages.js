const express = require("express");
const router = express.Router();
const infoService = require("../services/info"); // info tablosu işlemleri için oluşturduğunuz servis dosyası

/* GET info */
router.get("/", async function (req, res, next) {
  try {
    res.json(await infoService.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting info `, err.message);
    next(err);
  }
});

/* POST info */
router.post("/", async function (req, res, next) {
  try {
    res.json(await infoService.create(req.body));
  } catch (err) {
    console.error(`Error while creating info`, err.message);
    next(err);
  }
});

/* PUT info */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await infoService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating info`, err.message);
    next(err);
  }
});

/* DELETE info */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await infoService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting info`, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await infoService.search(req.params.id));
  } catch (err) {
    console.error(`Error while searching info`, err.message);
    next(err);
  }
});

module.exports = router;
