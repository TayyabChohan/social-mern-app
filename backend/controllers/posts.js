const Post = require("../models/Posts");
const User = require("../models/Users");
module.exports.createPost = async (req, res) => {
  try {
    const { userId, discription, picturePath } = req.body;
    const user = await User.findById(userId);
    const newUser = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      discription,
      likes: {},
      comments: [],
      picturePath,
    });
    await newUser.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};

module.exports.getFeedPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};
module.exports.getUserpost = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};
module.exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isliked = post.likes.get(userId);
    if (isliked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      {
        new: true,
      }
    );
    res.status(201).json(updatePost);
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};
