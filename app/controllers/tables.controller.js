const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;
const tableRoutes = require("../routes/table.routes");
const { json } = require("body-parser");
const Tables = db.tables;
const Users = db.users;

exports.findAll = (req, res) => {
    Tables.find({})
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

exports.removeFromTable = async (req, res) => {
    try {
        let table = await Tables.findOne({ _id: ObjectId(req.params.id) });
        let user = await Users.findOne({ _id: ObjectId(req.params.userId) });
        let newUsers = table.users.filter((x) => {
            return !x.equals(ObjectId(req.params.userId))
        });

        let update = { users: newUsers };
        await table.updateOne(update);
        await user.updateOne({assigned: false})
        let updated = await Tables.findOne({ _id: ObjectId(req.params.id) });
        res.send(updated);
    }
    catch (error) {
        console.log(error);
    }
}

exports.update = async (req, res) => {
    try {
        let user = await Users.findOne({ _id: ObjectId(req.body[0].id) });
        let table = await Tables.findOne({ _id: ObjectId(req.params.id) });
        console.log(table);
        let newUsers = table.users;
        newUsers.push(user);
        let update = { users: newUsers }
        await table.updateOne(update);
        await user.updateOne({ assigned: true })
        res.send(table);
    } catch (error) {
        console.log(error)
    }
}

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }



    const table = new Tables({
        name: req.body.name
    });


    table
        .save(table)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};