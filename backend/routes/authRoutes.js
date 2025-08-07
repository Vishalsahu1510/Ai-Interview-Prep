const express= require("express");
const { registerUser, loginUser, getUserProfile, updateProfile} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();
const cloudinary = require('../utils/cloudinary');


//Auth Routes
router.post("/register",registerUser); // Register User
router.post("/login", loginUser); // Login User
router.get("/profile", protect, getUserProfile); // Register User

router.post("/upload-image", upload.single("image"), async (req, res) =>  {
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    res.status(200).json({imageUrl});
});

router.put("/update-profile", protect, updateProfile); 
module.exports = router;