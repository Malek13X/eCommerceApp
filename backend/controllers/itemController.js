import { uploadDirect } from "@uploadcare/upload-client";
import {
   deleteFile,
   storeFile,
   UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";

import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sharp from "sharp";

const getItems = asyncHandler(async (req, res) => {
   try {
      const { search } = req.query;

      let query = Item.find().sort({ title: 1 });

      if (search) {
         query = query.regex("title", new RegExp(search, "i"));
      }

      query.exec((err, items) => {
         if (err) {
            console.error(err);
            res.status(500);
            throw new Error("Something went wrong");
         }

         res.status(200).json(items);
      });
   } catch (error) {
      res.status(500);
      throw new Error("Failed to fetch items data");
   }
});

// Add a new item to the database
const addItem = asyncHandler(async (req, res) => {
   let savedItem;
   try {
      const { title, description, category, price, quantity } = req.body;
      const image = req.file;

      // const buffer = fileData ? fs.readFileSync(fileData.path) : "";
      console.log("Body", req.body);

      // Convert image to JPEG
      console.log(image.mimetype.split("/")[1]);

      let buffer = null;
      if (image) {
         const imageFormat = image.mimetype.split("/")[1]; // Extract the image format from the MIME type
         if (imageFormat !== "jpeg" || imageFormat !== "png") {
            buffer = await sharp(image.path)
               // .flatten({ background: { r: 223, g: 232, b: 232 } })
               // .jpeg()
               .toBuffer();
         } else {
            buffer = await sharp(image.path).toBuffer();
         }
      }

      //  Check if all required fields are present
      if (
         !title ||
         !description ||
         !category ||
         !price ||
         !quantity ||
         !buffer
      ) {
         res.status(400);
         throw new Error("All fields are required");
      }

      // Create new item in the database
      const newItem = new Item({
         title,
         description,
         category,
         price,
         quantity,
         imageUrl: "Unknown",
         imageUUID: "Unknown",
      });
      savedItem = await newItem.save();

      const uploadcareResult = await uploadDirect(buffer, {
         publicKey: process.env.UPLOADCARE_PUBLIC_KEY,
         fileName: image ? image.originalname : "Unknown",
         metadata: {
            title,
            category,
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
      throw new Error("Failed to add item, Something went wrong");
   }
});

const updateItem = asyncHandler(async (req, res) => {
   try {
      const {
         title,
         description,
         category,
         price,
         quantity,

         imageUrl,
         imageUUID,
      } = req.body;
      const item = await Item.findById(req.params.id);

      if (item) {
         item.title = title || item.title;
         item.description = description || item.description;
         item.price = price || item.price;
         item.category = category || item.category;
         item.quantity = quantity || item.quantity;

         // item.imageUrl = imageUrl || Item.imageUrl;
         // item.imageUUID = imageUUID || Item.imageUUID;
      } else {
         res.status(400);
         throw new Error("Item does not exist");
      }

      const updatedItem = await item.save();

      console.log("From Server:", updatedItem);
      res.status(200).json(updatedItem);
   } catch (error) {}
});

const deleteItem = asyncHandler(async (req, res) => {
   try {
      const item = await Item.findById(req.params.id);

      const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
         publicKey: process.env.UPLOADCARE_PUBLIC_KEY,
         secretKey: process.env.UPLOADCARE_SECRET_KEY,
      });

      await Item.findByIdAndDelete(item._id);

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

export { getItems, addItem, uploadImageTest, deleteItem, updateItem };
