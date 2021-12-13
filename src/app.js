const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");

config();
loaders();


const app = express();

app.use(express.json());
app.use(helmet());


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
})