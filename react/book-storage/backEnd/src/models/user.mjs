import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    library: [
        {
            book: { type: ObjectId, ref: 'Book' },
            review: { type: String },
            rating: { type: Number, min: 1, max: 5 }
        }
    ]
});

module.exports = mongoose.model("User", userSchema);