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
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, db) => {
    dbo = db.db("wedding-planner");
  }
);
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};
// Your endpoints go after this line
app.get("/allusers", (req, res) => {
  dbo
    .collection("users")
    .find({})
    .toArray((err, user) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      res.send(
        JSON.stringify({
          user
        })
      );
    });
});
app.post("/signup", upload.none(), (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  let country = req.body.country;
  let email = req.body.email;
  let who = req.body.who;
  let date = req.body.date;
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user !== null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      dbo.collection("users").insertOne({
        username: name,
        password: pwd,
        country: country,
        email: email,
        who: who,
        date: date
      });
    }
    let sessionId = generateId();
    sessions[sessionId] = email;

    res.cookie("sid", sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  });
});

app.post("/login", upload.none(), (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  dbo.collection("users").findOne({ email: email }, (err, email) => {
    if (err) {
      res.send(
        JSON.stringify({
          success: false
        })
      );
      return;
    }
    if (email === null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (email.password === password) {
      let sessionId = generateId();
      sessions[sessionId] = email;
      res.cookie("sid", sessionId);
      res.send(JSON.stringify({ success: true }));
      return;
    }
    res.send(
      JSON.stringify({
        success: false
      })
    );
  });
});
app.post("/editUser", upload.single("img"), (res, req) => {
  console.log("req.body.username", req.body.username);
  let username = req.body.username;

  db.users.findOneAndUpdate({
    $set: {
      username: username
    }
  });
  res.send(JSON.stringify({ success: true }));
  return;
});
app.post("/saveChecklist", upload.none(), (req, res) => {
  let username = req.body.username;
  let checklist = req.body.checklist;
  dbo.collection("users").findOne(
    {
      username: username
    },
    (err, user) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user === null) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (user === username) {
        dbo.collections("checklists").insertOne({
          userId: user._id,
          checklist: checklist
        });
        res.send(JSON.stringify({ success: true }));
        return;
      }
    }
  );
});
app.post("/logout", upload.none(), (res, req) => {
  let sessionId = req.cookies.sessionId;
  let username = sessions[sessionId];

  if (username === undefined) {
    res.send(JSON.stringify({ success: false }));
    return;
  }
  delete username;
  res.cookie("sid", 0, { expires: -1 });
  res.send(JSON.stringify({ success: true }));
  return;
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
