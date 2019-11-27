let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let cookieParser = require("cookie-parser");
let sessions = {};

reloadMagic(app);
app.use(cookieParser());
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use("/uploads", express.static("uploads"));
let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@cluster0-pkl4r.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(
  url,
  {
    useNewUrlParser: true
  },
  (err, db) => {
    dbo = db.db("project-board");
  }
);
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};
// Your endpoints go after this line
app.post("/signup", upload.none(), (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").findOne({ username: name }),
    (err, user) => {
      if (err) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (user !== null) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (user === null) {
        dbo.collection("users").insertOne({ username: name, password: pwd });
      }
      let sessionId = generateId();
      sessions[sessionId] = nameres.cookie("sid", sessionId);
      res.send(JSON.stringify({ success: true }));
    };
  return;
});

app.post("/login");

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
