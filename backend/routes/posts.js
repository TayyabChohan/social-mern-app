const express = require("express");
const { getFeedPost, getUserpost, likePost } = require("../controllers/posts");
const { jwtoken } = require("../midllewhare/auth");
const Route = express.Router();
//Read//
Route.get("/", jwtoken, getFeedPost);
Route.get("/:userId/posts", jwtoken, getUserpost);
//Update//
Route.get("/:id/like", jwtoken, likePost);

module.exports = Route;
