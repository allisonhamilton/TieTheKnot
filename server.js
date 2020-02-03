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

      res.send(JSON.stringify({ success: true, user: user }));
    });
});
app.get("/checklistTwelve", (req, res) => {
  dbo
    .collection("TasksAtTwelve")
    .find({})
    .toArray((err, tasks) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      res.send(JSON.stringify({ success: true, tasks: tasks }));
    });
});
app.get("/checklistEight", (req, res) => {
  dbo
    .collection("TasksAtEight")
    .find({})
    .toArray((err, tasks) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      res.send(JSON.stringify({ success: true, tasks: tasks }));
    });
});
app.get("/checklistFour", (req, res) => {
  dbo
    .collection("TasksAtFour")
    .find({})
    .toArray((err, tasks) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      res.send(JSON.stringify({ success: true, tasks: tasks }));
    });
});
app.get("/checklistOneMonth", (req, res) => {
  dbo
    .collection("TasksAtOne")
    .find({})
    .toArray((err, tasks) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      res.send(JSON.stringify({ success: true, tasks: tasks }));
    });
});

app.post("/signup", upload.none(), (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  let country = req.body.country;
  let email = req.body.email;
  let who = req.body.who;
  let date = req.body.date;
  let image = req.body.image;
  dbo.collection("users").findOne({ email: email }, (err, user) => {
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
        date: date,
        image: image
      });
    }
    let sessionId = generateId();
    sessions[sessionId] = email;

    res.cookie("sid", sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  });
});

app.post("/deleteInTwelve", upload.none(), (req, res) => {
  console.log("req.body.task", req.body.task);
  let task = req.body.task;
  dbo.collection("TasksAtTwelve").deleteOne({ title: task }, (err, tasks) => {
    if (err) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (tasks === undefined) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (tasks !== undefined) {
      res.send(JSON.stringify({ success: true, ListTwelve: tasks }));
      return;
    }
  });
});
app.post("/autoChecklist", upload.none(), (req, res) => {
  let email = req.body.email;
  dbo.collection("users").findOne({ email: email }, (err, user) => {
    if (err) {
      res.send(
        JSON.stringify({
          success: false
        })
      );
    }
    if (user === null) {
      res.send(
        JSON.stringify({
          success: false
        })
      );
    }
    if (user.email === email) {
      dbo.collection("TasksAtTwelve").insertMany([
        {
          userId: user._id,
          title: "Announce your engagement to loved ones",
          done: false
        },
        {
          userId: user._id,
          title: "Plan an engagement party",
          done: false
        },
        {
          userId: user._id,
          title: "Choose a date",
          done: false
        },
        {
          userId: user._id,
          title: "Choose a location for the wedding",
          done: false
        },
        {
          userId: user._id,
          title: "Schedule an engagement photo shoot",
          done: false
        },

        {
          userId: user._id,
          title: "Start your guest list, choose how many guests to invite",
          done: false
        },
        {
          userId: user._id,
          title: "Figure out a realistic budget",
          done: false
        },
        {
          userId: user._id,
          title: "Browse through our blogs for insipiration and ideas",
          done: false
        },
        {
          userId: user._id,
          title: "Choose a theme and color scheme",
          done: false
        },
        {
          userId: user._id,
          title: "Start looking at venues",
          done: false
        },
        {
          userId: user._id,
          title: "Start looking for caterers",
          done: false
        },
        {
          userId: user._id,
          title: "Start looking for a photographer/videographer",
          done: false
        },
        {
          userId: user._id,
          title:
            "Start looking for a DJ, band, musician for reception and ceremony",
          done: false
        },
        {
          userId: user._id,
          title: "Book your venue for the ceremony and the reception",
          done: false
        },
        {
          userId: user._id,
          title: "Book your caterer",
          done: false
        },
        {
          userId: user._id,
          title: "Book DJ, band and/or musician",
          done: false
        },
        {
          userId: user._id,
          title: "Make your guest list",
          done: false
        },
        {
          userId: user._id,
          title: "Start looking at wedding attire",
          done: false
        },
        {
          userId: user._id,
          title: "Confirm your wedding party",
          done: false
        }
      ]);
      dbo.collection("TasksAtEight").insertMany([
        {
          userId: user._id,
          title: "Send your save the dates",
          done: false
        },
        {
          userId: user._id,
          title: "Decide on wedding attire",
          done: false
        },
        {
          userId: user._id,
          title:
            "Make sure guests have a place to stay if travelling to wedding site",
          done: false
        },
        {
          userId: user._id,
          title: "Choose a florist",
          done: false
        },
        {
          userId: user._id,
          title:
            "Check the necessary laws on marriage and how to in your province, territory or state",
          done: false
        },
        {
          userId: user._id,
          title:
            "Check the necessary laws on marriage and how to in your province, territory or state",
          done: false
        },
        {
          userId: user._id,
          title: "Choose decorations for ceremony venue",
          done: false
        },
        {
          userId: user._id,
          title: "Choose decorations for reception venue",
          done: false
        },
        {
          userId: user._id,
          title: "Research honeymoon destinations",
          done: false
        },
        {
          userId: user._id,
          title: "Choose rings get them sized",
          done: false
        },
        {
          userId: user._id,
          title: "Send invitations for guests",
          done: false
        }
      ]);
      dbo.collection("TasksAtFour").insertMany([
        {
          userId: user._id,
          title: "Book an officiant",
          done: false
        },
        {
          userId: user._id,
          title: "Make sure wedding party is dressed and fitted",
          done: false
        },
        {
          userId: user._id,
          title:
            "Ensure decorations, table settings and seating for venue needs are finalized (example: chairs, tables, tents, etc...)",
          done: false
        },
        {
          userId: user._id,
          title: "Create and update registry if needed",
          done: false
        },
        {
          userId: user._id,
          title: "Book bakery for cake",
          done: false
        },
        {
          userId: user._id,
          title: "Finalize guest list",
          done: false
        },
        {
          userId: user._id,
          title: "Start a seating chart",
          done: false
        },
        {
          userId: user._id,
          title: "Book transportation for guests, if necessary",
          done: false
        },
        {
          userId: user._id,
          title: "Book hair stylist and makeup artist",
          done: false
        },
        {
          userId: user._id,
          title: "Book personal accomodations for wedding night",
          done: false
        },
        {
          userId: user._id,
          title: "Book rehearsal dinner venue",
          done: false
        }
      ]);
      dbo.collection("TasksAtOne").insertMany([
        {
          userId: user._id,
          title: "Buy gifts for wedding party",
          done: false
        },
        {
          userId: user._id,
          title: "Pick up rings",
          done: false
        },
        {
          userId: user._id,
          title: "Finalize hair stylist and make-up artist",
          done: false
        },
        {
          userId: user._id,
          title: "Write and finalize vows",
          done: false
        },
        {
          userId: user._id,
          title: "Confirm Florist",
          done: false
        },
        {
          userId: user._id,
          title: "Confirm DJ, band or musician",
          done: false
        },
        {
          userId: user._id,
          title: "Confirm bakery",
          done: false
        },
        {
          userId: user._id,
          title: "Confirm caterer",
          done: false
        },
        {
          userId: user._id,
          title: "Confirm officiant",
          done: false
        },
        {
          userId: user._id,
          title: "Last dress/attire fitting for wedding party",
          done: false
        },
        {
          userId: user._id,
          title: "Confirm rehearsal dinner",
          done: false
        },
        {
          userId: user._id,
          title: "Confirm seating chart",
          done: false
        },
        {
          userId: user._id,
          title: "Practice your first dance",
          done: false
        }
      ]);
      res.send(
        JSON.stringify({
          success: true
        })
      );
    }
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
  });
});
app.post("/editUser", upload.single("img"), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let date = req.body.date;
  let image = req.body.image;
  let email = req.body.email;
  let sessionId = req.cookies.sid;

  dbo
    .collection("users")
    .updateOne({ email: email }, { $set: { username: username } });

  sessions[sessionId] = email;
  res.cookie("sid", sessionId);
  res.send(JSON.stringify({ success: true }));
  return;
});
app.post("/newTask", upload.none(), (req, res) => {
  let userEmail = req.body.email;
  let task = req.body.task;
  let date = req.body.dueDate;
  let done = req.body.done;
  dbo.collection("users").findOne(
    {
      email: userEmail
    },
    (err, email) => {
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

      if (
        email.email === userEmail &&
        req.body.dueDate === "8 to 12 months before"
      ) {
        dbo.collection("TasksAtTwelve").insertOne({
          userId: email._id,
          title: task,
          done: done
        });
        res.send(JSON.stringify({ success: true }));
        return;
      }
      if (
        email.email === userEmail &&
        req.body.dueDate === "4 to 8 months before"
      ) {
        dbo.collection("TasksAtEight").insertOne({
          userId: email._id,
          title: task,
          done: done
        });
        res.send(JSON.stringify({ success: true }));
        return;
      }
      if (
        email.email === userEmail &&
        req.body.dueDate === "1 to 4 months before"
      ) {
        dbo.collection("TasksAtFour").insertOne({
          userId: email._id,
          title: task,
          done: done
        });
        res.send(JSON.stringify({ success: true }));
        return;
      }
      if (email.email === userEmail && req.body.dueDate === "1 months left") {
        dbo.collection("TasksAtOne").insertOne({
          userId: email._id,
          title: task,
          done: done
        });
        res.send(JSON.stringify({ success: true }));
        return;
      }
    }
  );
});
app.post("/logout", upload.none(), (res, req) => {
  console.log("cookie", req.cookies);
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  console.log("loggin out ?????");
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
