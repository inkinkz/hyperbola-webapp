var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

var Pool = require("pg-pool");

var pool = new Pool({
  port: 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  max: 20,
  host: "ec2-75-101-133-29.compute-1.amazonaws.com",
  ssl: true,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000 // close idle clients after 1 second
});

var app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(logger("dev"));

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

app.post("/edit-flavor-status", function(req, res) {
  console.log(req.body);
  var flavorID = req.body.flavorID;
  var flavorStatus = req.body.status;
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "UPDATE flavavail_in SET flav_availability = $2 WHERE flavor_id = $1",
        [flavorID, flavorStatus],
        (err, table) => {
          if (err) {
            res.status(400).send(err);
            return console.log(err);
          } else {
            console.log("Data Updated");
            res.status(201).send({ status: "Data updated" });
          }
          done();
        }
      );
    }
  });
});

app.get("/flavor-status", function(req, res) {
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } else {
      db.query(
        "select flavor_id,flav_availability from flavavail_in where location = 'engineering'",
        (err, table) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          } else {
            res.status(200).send(table.rows);
          }
          done();
        }
      );
    }
  });
});

app.post("/user-history", function(req, res) {
  var userID = req.body.userID;
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } else {
      db.query(
        "select datetime , flavor_name, toppings, total_price, transaction_id, status from transaction where user_id = $1 ORDER BY datetime DESC",
        [userID],
        (err, table) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          } else {
            // console.log(table);
            // console.log("Data Updated");
            res.status(200).send(table.rows);
          }
          done();
        }
      );
    }
  });
});

app.post("/user-point", function(req, res) {
  var userID = req.body.userID;
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } else {
      db.query(
        "select reward_points from useraccount where user_id = $1",
        [userID],
        (err, table) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          } else {
            res.status(200).send(table.rows[0]);
          }
          done();
        }
      );
    }
  });
});

app.post("/add-user", function(req, res) {
  // console.log(req.body.userID);
  var userID = req.body.userID;
  var name = req.body.name;
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "INSERT INTO useraccount(user_id, name, reward_points) SELECT * FROM (SELECT $1, $2, 9999) AS tmp WHERE NOT EXISTS (SELECT user_id FROM useraccount WHERE user_id = $1) LIMIT 1;",
        [userID, name],
        (err, table) => {
          if (err) {
            res.status(400).send(err);
            return console.log(err);
          } else {
            // db.end();
          }
          done();
        }
      );
    }
  });
});

app.post("/update-user-point", function(req, res) {
  var userID = req.body.userID;
  var newPoint = req.body.newPoint;
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "UPDATE useraccount SET reward_points = $2 WHERE user_id = $1;",
        [userID, newPoint],
        (err, table) => {
          if (err) {
            res.status(400).send(err);
            return console.log(err);
          } else {
            // db.end();
          }
          done();
        }
      );
    }
  });
});

app.post("/add-point", function(req, res) {
  var userID = req.body.userID;
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "UPDATE useraccount SET reward_points = (reward_points + 10) WHERE user_id = $1 ",
        [userID],
        (err, table) => {
          if (err) {
            res.status(400).send(err);
            return console.log(err);
          } else {
            // db.end();
          }
          done();
        }
      );
    }
  });
});

app.post("/add-transaction", function(req, res) {
  // console.log(req.body);
  var transactionID = req.body.transactionID;
  var totalPrice = req.body.totalPrice;
  var dateTime = req.body.dateTime;
  var userID = req.body.userID;
  var location = req.body.location;
  var vendorID = req.body.vendorID;
  var flavorName = req.body.flavorName;
  var toppings = req.body.toppings;
  var type = req.body.type;

  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "INSERT INTO transaction (transaction_id, total_price, datetime, user_id, vendor_id, location, flavor_name, toppings, status, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'not scanned', $9);",
        [
          transactionID,
          totalPrice,
          dateTime,
          userID,
          vendorID,
          location,
          flavorName,
          toppings,
          type
        ],
        (err, table) => {
          if (err) {
            res.status(400).send(err);
            return console.log(err);
          } else {
            res.status(200).send({ status: "Transaction Added" });
            // db.end();
          }
          done();
        }
      );
    }
  });
});

app.post("/add-queue", function(req, res) {
  var orderID = req.body.orderID;
  pool.connect(async (err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query("CALL add_queue($1)", [orderID], (err, table) => {
        if (err) {
          res.status(400).send(err);
          return console.log(err);
        } else {
          // db.end();
        }
        done();
      });
    }
  });
});

app.get("/get-queue", function(req, res) {
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "select distinct(id), customer_name, flavor_name, toppings, transaction_id, type, token from queue join useraccount on customer_name = useraccount.name order by id",
        (err, table) => {
          if (err) {
            res.status(400).send(err);
            return console.log(err);
          } else {
            res.status(200).send(table.rows);
            // db.end();
          }
          done();
        }
      );
    }
  });
});

app.get("/get-record", function(req, res) {
  pool.connect((err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "select name, total_price, flavor_name, toppings, type, status, date_part('day', datetime) as date, date_part('month', datetime) as month, date_part('year', datetime) as year from transaction  join useraccount on transaction.user_id = useraccount.user_id order by datetime desc",
        (err, table) => {
          if (err) {
            res.status(400).send(err);
            return console.log(err);
          } else {
            res.status(200).send(table.rows);
            // db.end();
          }
          done();
        }
      );
    }
  });
});

app.post("/order-done", function(req, res) {
  var orderID = req.body.orderID;
  var status = req.body.status;

  pool.connect(async (err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query("CALL order_done($1,$2)", [orderID, status], (err, table) => {
        if (err) {
          res.status(400).send(err);
          return console.log(err);
        } else {
          // db.end();
        }
        done();
      });
    }
  });
});

app.post("/update-token", function(req, res) {
  var token = req.body.token;
  var userid = req.body.userID;

  pool.connect(async (err, db, done) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "update useraccount set token = $1 where user_id = $2 and token != $1",
        [token, userid],
        (err, table) => {
          if (err) {
            res.status(400).send(err);
            return console.log(err);
          } else {
            // db.end();
          }
          done();
        }
      );
    }
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
