const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const routes = require("./routes");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customError");
const app = express();
// Environment Variables
dotenv.config({
    path: "./config/env/config.env"
})

// Database Connection
connectDatabase();

// Express - Body Middleware
app.use(express.json())

const PORT = process.env.PORT || 3000;
// Routes Middleware
app.use("/api", routes);


// Error Handling
app.use(customErrorHandler);

// Static Files Middleware
app.use(express.static(path.join(__dirname, process.env.STATIC_FILES_FOLDER)));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT} : ${process.env.NODE_ENV}`);
})
