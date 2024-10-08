const moment = require("moment");
const { firebaseDB } = require("../db/firebase");
const express = require("express");
const router = express.Router();

/**
 * @route
 */
router.post("/", (req, res) => {
  const { userId, high, low } = req.body;
  const time = Date.now();

  try {
    if (!userId) throw new Error("請輸入使用者ID");
    if (!high || !low) throw new Error("請輸入完整血壓資訊");

    firebaseDB
      .ref(`/blood-pressure/${userId}/${time}`)
      .set({ high, low, updated: time });
    res.send({ ok: true, message: "data added successfully!" });
  } catch (error) {
    res
      .status(400)
      .send({ ok: false, message: `failed to save`, errMsg: error.message });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("請輸入使用者ID");
    }
    firebaseDB.ref(`blood-pressure/${id}`).once("value", (snapshot) => {
      res.send({
        ok: true,
        data: Object.values(snapshot.val() || {}).map((item) => {
          return {
            ...item,
            updated: moment(item.updated).format("YYYY-MM-DD HH:mm:ss"),
          };
        }),
      });
    });
  } catch (error) {
    res
      .status(400)
      .send({ ok: false, message: `failed to fetch`, errMsg: error.message });
  }
});

router.get("*", (req, res) => {
  res.status(404).send({ ok: false, message: `找不到網站` });
});

module.exports = router;
