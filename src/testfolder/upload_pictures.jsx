// Set up a new Node.js project and install the following dependencies:
// npm install express cloudinary multer mongoose dotenv

// Create a .env file in the root directory of the project with the following Cloudinary credentials:
// CLOUDINARY_CLOUD_NAME=<your_cloud_name>
// CLOUDINARY_API_KEY=<your_api_key>
// CLOUDINARY_API_SECRET=<your_api_secret>

// Create a models directory and create a User model to store user data:
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
});

module.exports = mongoose.model('User', userSchema);

// Create a controllers directory and create a userController to handle user requests:
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadProfileImage = async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader.upload(file.path);
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { profileImage: result.secure_url },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a routes directory and create a userRoutes file to handle user routes:
const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/user/:userId/profile-image',
  upload.single('image'),
  userController.uploadProfileImage
);

module.exports = router;

// Create an app.js file to configure the Express app and connect to the MongoDB database:
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));

// In the React app, create a form with an input of type file to allow users to select an image to upload:
import React, { useState } from 'react';
import axios from 'axios';

const UploadImageForm = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      await axios.post
    }
    catch (e) {}}
    
}

