module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", users.findAll);

    router.post("/", users.create);

    app.use('/api/users', router);
};