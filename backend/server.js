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

const cors = require('cors');

// Database Connection
connectDatabase();

// Express - Body Middleware
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;
// Routes Middleware
app.use("/api", routes);
app.set('views', './views')
app.set('view engine', 'ejs')
app.get("/", (req,res) => {
    res.render("index", {BASE_URL: process.env.BASE_URL, API_PATH: process.env.API_PATH});
})


// Error Handling
app.use(customErrorHandler);

// Static Files Middleware
app.use(express.static(path.join(__dirname, process.env.STATIC_FILES_FOLDER)));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT} : ${process.env.NODE_ENV}`);
})
