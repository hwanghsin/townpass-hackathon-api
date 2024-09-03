const express = require("express");
const { firebaseDB } = require("./db/firebase");

const app = express();
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/blood-pressure", (req, res) => {
  const { id, high, low, rate, oxygen } = req.body;
  const time = Date.now();
  firebaseDB
    .ref(`blood-pressure/${id}/${time}`)
    .push({ high, low, rate, oxygen, updated: time });
  res.send({ ok: true, message: "User added successfully!" });
});

app.get("/api/blood-pressure/:id", (req, res) => {
  const { id } = req.params;
  firebaseDB.ref(`blood-pressure/${id}`).once("value", (snapshot) => {
    res.send(snapshot.val());
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
