module.exports = mongoose => {
    const Users = mongoose.model(
        "users",
        mongoose.Schema(
            {
                name: String,
                assigned: Boolean
            }
        )
    );
    return Users;
};