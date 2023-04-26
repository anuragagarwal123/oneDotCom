const User = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//get all users
exports.getUsers = async (req, res, next) => {
  try {
    let userResult = await User.findAndCountAll();
    if (userResult) {
      return res.status(200).json({ users: userResult });
    }
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

//get user by id
exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    let getUserInfo = await User.findByPk(userId);
    if (!getUserInfo) {
      return res.status(404).json({ message: "User not found!", data: {} });
    } else {
      res.status(200).json({ user: getUserInfo });
    }
  } catch (err) {
    next(err);
  }
};

//create user
exports.createUser = async (req, res, next) => {
  try {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    //const salt = await bcrypt.genSalt(10);
    // const password = await bcrypt.hash(req.body.password, salt);
    const role =  req.body.role;

    const title = req.body.title;
    const userName = req.body.userName;

    let data = await User.create({
      firstName,
      lastName,
      email,
      password,
      title,
      userName,
      role
    });
    
    res.status(200).json({"message": "User created successfully", data});

  } catch (error) {
    next(error);
  }
};

//Login User
exports.login = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { userName: req.body.userName } });
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        let token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          },
          process.env.SECRET
        );
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    }
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

//update user
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const updatedFirstName = req.body.first_name;
    const updatedLastName = req.body.last_name;
    const updatedEmail = req.body.email;
    const updatedPassword = req.body.password;
    const updatedTitle = req.body.title;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    } else {
      user.first_name = updatedFirstName;
      user.last_name = updatedLastName;
      user.email = updatedEmail;
      user.password = updatedPassword;
      user.title = updatedTitle;
      return user.save();
    }
  } catch (err) {
    next(err);
  }
};

//delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    await User.destroy({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    next(err);
  }
};
