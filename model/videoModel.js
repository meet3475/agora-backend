const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    filePath: { type: String, required: true },
    originalName: { type: String, required: true },
    size: { type: Number, required: true },
    uploadDate: { type: Date,  default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}

})

const videoModel = mongoose.model('video', VideoSchema);
module.exports = videoModel;