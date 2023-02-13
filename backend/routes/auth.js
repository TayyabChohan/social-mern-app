const express = require("express");
const { login } = require("../controllers/auth");
const Route = express.Router();
Route.post("/login", login);
module.exports = Route;
