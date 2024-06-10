const User = require("../Models/User");
const redisClient = require("../utils/redisclient");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    //invalidate cache
    await redisClient.del("allUsers");
    console.log("cache cleared");
    return res.json(user);
  } catch (error) {
    res.send("Server error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    //check for cache
    const cacheKey = "allUsers";
    const cachedUsers = await redisClient.get(cacheKey);
    if (cachedUsers) {
      console.log("Cache hit");
      return res.json({ users: JSON.parse(cachedUsers) });
    }

    const users = await User.find({});
    if (users.length) {
      await redisClient.set(cacheKey, JSON.stringify(users), "EX", 3600);
      console.log("cache missed, users fetched from db");
    }
    return res.json(users);
  } catch (error) {
    res.send("Server error");
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
