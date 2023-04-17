import { base, uploadDirect } from "@uploadcare/upload-client";
import {
   deleteFile,
   storeFile,
   UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";

import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";
import fs from "fs";

const getItems = asyncHandler( async (req,res) => {
   try {
      const items = await Item.find()

      res.status(200).json(items)
   } catch (error) {
      res.status(500)
      throw new Error('Failed to fetch items data')
   }
})

// Add a new item to the database
const addItem = asyncHandler(async (req, res) => {
   let savedItem;
   try {
      const { title, description, categories, price } = req.body;
      const fileData = req.file;
      const buffer = fileData ? fs.readFileSync(fileData.path) : "";

      console.log(`fileData:`, fileData);
      console.log(`Buffer:`, buffer);

      // Check if all required fields are present
      if (!title || !description || !categories || !price || !buffer) {
         res.status(400);
         throw new Error("All fields are required");
      }

      // Create new item in the database
      const newItem = new Item({
         title,
         description,
         categories,
         price,
         imageUrl: "Unknown",
         imageUUID: "Unknown",
      });
      savedItem = await newItem.save();

      const uploadcareResult = await uploadDirect(buffer, {
         publicKey: process.env.UPLOADCARE_PUBLIC_KEY,
         fileName: fileData ? fileData.originalname : "Unknown",
         metadata: {
            categories,
            title,
            mongoDb_Id: savedItem?._id,
         },
      });

      // Create new item in the database
      const updatedItem = await Item.findByIdAndUpdate(
         savedItem?._id,
         {
            imageUrl: uploadcareResult.cdnUrl,
            imageUUID: uploadcareResult.uuid,
         },
         { new: true }
      );
      res.status(201).json(updatedItem);
   } catch (err) {
      await Item.findByIdAndDelete(savedItem?._id);
      console.error(err);
      res.status(500);
      throw new Error("Something went wrong");
   }
});

const deleteItem = asyncHandler(async (req, res) => {
   try {
      const item = await Item.findById(req.params.id);

      const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
         publicKey: process.env.UPLOADCARE_PUBLIC_KEY,
         secretKey: process.env.UPLOADCARE_SECRET_KEY,
      });
      
      await Item.findByIdAndDelete(item._id)

      const result = await deleteFile(
         { uuid: item.imageUUID },
         {
            authSchema: uploadcareSimpleAuthSchema,
         }
      );

      res.status(200).json({ success: true, result });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         error: "Failed to delete Item  <ITEM NAME>",
      });
   }
});
const uploadImageTest = asyncHandler(async (req, res) => {
   try {
      const fileData = req.file;
      const buffer = fs.readFileSync(fileData.path);

      console.log("==================================================");
      console.log("==================================================");
      console.log(`fileData:`, fileData);
      console.log("==================================================");
      const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
         publicKey: process.env.UPLOADCARE_PUBLIC_KEY,
         secretKey: process.env.UPLOADCARE_SECRET_KEY,
      });
      const result = await storeFile(
         { uuid: fileData.filename },
         {
            authSchema: uploadcareSimpleAuthSchema,
         }
      );

      res.status(200).json({ success: true, result });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         error: "Failed to upload Image",
      });
   }
});

export { getItems, addItem, uploadImageTest, deleteItem };
