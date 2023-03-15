const User = require("../models/Users");

module.exports.getUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findById(id);
    res.status(200).json(currentUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
module.exports.getUsersFreind = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params, "sadasd");
    const currentUser = await User.findById(id);
    console.log(currentUser, "currentUser");

    const friends = new Promise.all(
      currentUser.friends.map((id) => currentUser.findById(id))
    );
    const formatedfriends = friends.map(
      ({
        _id,
        lastName,
        email,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile,
        impressions,
      }) => {
        return {
          _id,
          lastName,
          email,
          picturePath,
          friends,
          location,
          occupation,
          viewedProfile,
          impressions,
        };
      }
    );
    res.status(200).json(formatedfriends);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports.addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const currentUser = await User.findById(id);
    const friend = await User.findById(id);
    if (currentUser.friends.includes(friendId)) {
      currentUser.friends = currentUser.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      currentUser.friends.push(friendId);
      friend.friends.push(id);
    }
    await currentUser.save();
    await friend.save();
    const friends = new Promise.all(
      currentUser.friends.map((id) => currentUser.findById(id))
    );
    const formatedfriends = friends.map(
      ({
        _id,
        lastName,
        email,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile,
        impressions,
      }) => {
        return {
          _id,
          lastName,
          email,
          picturePath,
          friends,
          location,
          occupation,
          viewedProfile,
          impressions,
        };
      }
    );
    res.status(200).json(formatedfriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
