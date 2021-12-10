const { User } = require("../models/user");

const createUser = async (email, password) => {
  try {
    if (await User.emailTaken(email)) {
      console.log("email exsists");
      // throw error;
    }
    const user = new User({ email, password });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = async (user) => {
  const token = user.generateAuthToken();
  return token;
};

module.exports = { createUser, genAuthToken };
