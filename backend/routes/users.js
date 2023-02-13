const express = require("express");
const {
  getUsers,
  getUsersFreind,
  addRemoveFriend,
} = require("../controllers/users");
const { jwtoken } = require("../midllewhare/auth");
const Route = express.Router();
/* Read */
Route.get("/:id", jwtoken, getUsers);
Route.get("/:id/friends", jwtoken, getUsersFreind);
/* Update */
Route.patch("/:id/:friendId", jwtoken, addRemoveFriend);

module.exports=Route;
