const userController = require("../controller/userController");
const { router } = require("./userRoutes");

router.post("/login", userController.postLoginUser);