const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");
const multer = require("multer");

// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// Add a new item to the database
const addItem = asyncHandler(async (req, res) => {
  const { title, description, categories, price } = req.body;

  // Check if all required fields are present
  if (!title || !description || !categories || !price || !req.file) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // Upload image to Google Cloud Storage
  const file = req.file;
  const fileName = `IMAGE_${Date.now()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    console.error(err);
    res.status(500);
    throw new Error('Something went wrong');
  });

  blobStream.on('finish', async () => {
    // Create new item in the database
    const newItem = new Item({
      title,
      description,
      categories,
      price,
      image: `https://storage.googleapis.com/${bucketName}/${fileName}`,
    });

    try {
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      console.error(err);
      res.status(500);
      throw new Error('Something went wrong');
    }
  });

  blobStream.end(file.buffer);
});
module.exports = {
   addItem,
};
