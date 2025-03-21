const multer = require("multer");
const path = require("path");
const fs = require("fs");
const videoModel = require("../model/videoModel");

// Define storage settings for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/videos");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize multer upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max file size
    
    fileFilter: (req, file, cb) => {
        // const allowedMimeTypes = ["video/mp4", "video/webm", "video/ogg"];
        const allowedMimeTypes = ["video/mp4", "video/webm", "video/ogg", "video/webm;codecs=h264", "video/quicktime"];
        
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only MP4, WebM, and OGG formats are allowed."));
        }
    }
}).single("video"); // Handling single file upload

// Video upload controller
const uploadVideo = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        try {
            // Save the video file path in the database
            const newVideo = await videoModel.create({
                filePath: `/uploads/videos/${req.file.filename}`,
                originalName: req.file.originalname,
                size: req.file.size,
                uploadDate: new Date(),
            });

            res.status(200).json({
                success: true,
                message: "Video uploaded successfully.",
                filePath: newVideo.filePath,
            });
        } catch (error) {
            console.error("Database Error:", error);
            res.status(500).json({ success: false, message: "Database error.", error });
        }
    });
};

module.exports = { uploadVideo };
