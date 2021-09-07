module.exports = mongoose => {
    const Tables = mongoose.model(
        "tables",
        mongoose.Schema({
            name: String,
            users: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }]
        })
    );
    return Tables;
};