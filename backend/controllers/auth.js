const bcrypt = require("bcrypt");
const tkn = require("jsonwebtoken");
const User = require("../models/Users");
//register user //
module.exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturesPath,
      friends,
      loaction,
      occopation,
      viewedProfile,
      impressions,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUsers = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturesPath,
      friends,
      loaction,
      occopation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUsers.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(5001).json({ error: err.message });
  }
};

//// Login /////
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User Does not exist" });
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
    const token = tkn.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
