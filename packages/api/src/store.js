"use strict";

const fs = require("fs");
const Sequelize = require("sequelize");

// define store config
let config;
try {
  config = fs.readFileSync("shuffle.config.js");
} catch (e) {
  console.log(`No config file found - using default store - sqlite:store.sqlite`);
  config = "sqlite:store.sqlite";
}

// setup database connection
const sequelize = new Sequelize(config);
sequelize
  .authenticate()
  .then(() => console.log("Successfully connected to the database"))
  .catch(e => console.log(`Failed to connect to the database: ${e}`));

// Load in database models
module.exports = require("./models")(sequelize, Sequelize);
