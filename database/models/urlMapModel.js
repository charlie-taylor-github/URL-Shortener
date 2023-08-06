import mongoose from "mongoose";

const urlMapSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    shortURL: { type: String, unique: true, required: true },
    originalURL: { type: String, required: true },
    clickCount: { type: Number, default: 0 }
});

const URLMap = mongoose.model("URLMap", urlMapSchema);

export default URLMap;
