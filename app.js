require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/ErrorHandlingMiddleWare");

const router = require("./routes/index");
const corsConfig = require("./utils/corsConfig");
const rateLimitConfig = require("./utils/rateLimitConfig");

const { DB_PORT = 3000 } = process.env;
const { DB_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } = process.env;

const limiter = rateLimit(rateLimitConfig);

const app = express();

app.use(helmet());
app.use(cors(corsConfig));
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

mongoose.connect(DB_URL, {});

app.use("/", router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(DB_PORT);
