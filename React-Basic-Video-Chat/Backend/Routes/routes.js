var router = require("express").Router();
require("dotenv").config();
var OpenTok = require("opentok");

router.get("/", (req, res) => {
  res.send("This is the Home Page");
  console.log("get call");
});

router.get("/home", async (req, res) => {
  console.log("hello");
  let value;
  try {
    value = await open();
  } catch (e) {
    console.log("ERRRRRRRRRRRRRRRRRR", e);
  }
  console.log("this is value", value.sessionId);
  // console.log("again the token", token);
  res.json({ sessionId: value.sessionId, token: value.token });
});

const open = async () => {
  return new Promise((resolve, reject) => {
    const opentok = new OpenTok(
      "47161024",
      "b8b60e53b8721c0d637906ecd1c0257d96d17f07"
    );
    let sessionId;
    let token;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@222");
    opentok.createSession({}, function (error, session) {
      if (error) {
        console.log("Error creating session:", error);
        reject(error);
      } else {
        console.log("INSIDE ELSE!!!!!!!!!!!!!!11");
        sessionId = session.sessionId;
        console.log("Session ID: " + sessionId);
        //  Use the role value appropriate for the user:
        var tokenOptions = {};
        tokenOptions.role = "publisher";
        tokenOptions.data = "username=bob";

        // Generate a token.
        token = opentok.generateToken(sessionId, tokenOptions);
        console.log("token -----------------", token);
        return resolve({ token: token, sessionId: sessionId });
      }
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!1111");
      // return token;
    });
  });
};
module.exports = router;
