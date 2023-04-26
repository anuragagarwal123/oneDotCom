const controller = require("./../controllers/user.controller");
const router = require("express").Router();
// TODO pass the checkrole middleware before calling the business logic

// CRUD Routes /users
router.get("/", controller.getUsers); // /users
router.get("/:userId", controller.getUser); // /users/:userId
router.post("/signup", controller.createUser); // /users
router.post("/login", controller.createUser); // /users
router.put("/:userId", controller.updateUser); // /users/:userId
router.delete("/:userId", controller.deleteUser); // /users/:userId

module.exports = router;
