const db = require("../models");
const Users = db.users;

exports.findAll = (req, res) => {
    Users.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const user = new Users({
        name: req.body.name
    });

    console.log("ADDING: ", user);
    // Save Tutorial in the database
    user.save(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
};