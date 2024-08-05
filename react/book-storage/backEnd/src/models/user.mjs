import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    pass: { type: String, required: true},
    createdAt: { type: Data, default: Date.now}
});

module.exports = mongoose.model("User", userSchema);