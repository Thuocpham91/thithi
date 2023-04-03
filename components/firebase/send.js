const firebaseAdmin = require("firebase-admin");

const serviceAccount = require('../../real-estates-320712-firebase-adminsdk-rko83-8b81099ce0.json');

// Initialize Firebase
const defaultAppConfig = {
  credential: firebaseAdmin.credential.cert(serviceAccount),
  // databaseURL: "https://real-estates-320712-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebaseAdmin.initializeApp(defaultAppConfig);



module.exports = async function(fcm_token, payload) {
  try {
    const options = {
        priority: "high",
        timeToLive: 60 * 60 *24
    };
      
    await firebaseAdmin.messaging().sendToDevice(fcm_token, payload, options)
      .then(function(response) {})
      .catch(function(error) {
        console.log("Error sending message:", error.message);
    });
  } catch(error) {
    console.log(error);
  }
}