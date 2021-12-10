const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");

// mongodb+srv://carlosTest:<password>@cluster0.6ve9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
  useUnifiedTopology: true,
});

// body parser
app.use(express.json());

/// sanitize
app.use(xss());
app.use(mongoSanitize());

// routes
app.use("/api", routes);

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
