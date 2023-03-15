const express = require("express");
const { getFeedPost, getUserpost, likePost } = require("../controllers/posts");
const { jwtoken } = require("../midllewhare/auth");
const Route = express.Router();
//Read//
Route.get("/", getFeedPost);
Route.get("/:userId/posts", getUserpost);
//Update//
Route.get("/:id/like", likePost);

module.exports = Route;
