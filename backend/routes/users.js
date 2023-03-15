const express = require("express");
const {
  getUsers,
  getUsersFreind,
  addRemoveFriend,
} = require("../controllers/users");
const { jwtoken } = require("../midllewhare/auth");
// console.log(jwtoken, "jwtoken");
const Route = express.Router();
/* Read */
Route.get("/:id", getUsers);
Route.get("/:id/friends", getUsersFreind);
/* Update */
Route.patch("/:id/:friendId", addRemoveFriend);

module.exports = Route;
