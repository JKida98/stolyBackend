module.exports = app => {
    const tables = require("../controllers/tables.controller.js");

    var router = require("express").Router();

    router.put("/:id", tables.update);

    router.put("/:id/:userId", tables.removeFromTable);
    
    router.get("/", tables.findAll);
    
    router.post("/", tables.create);

    app.use('/api/tables', router);
};