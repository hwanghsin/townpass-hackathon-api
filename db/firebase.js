const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://tapei-coding-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const firebaseDB = admin.database();

module.exports = { firebaseDB };
