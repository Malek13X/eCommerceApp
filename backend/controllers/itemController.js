import { base, uploadDirect } from "@uploadcare/upload-client";
import {
   deleteFile,
   storeFile,
   UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";

import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";

const getItems = asyncHandler(async (req, res) => {
   try {
      const { search } = req.query;
      let token;
      let isAdmin;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         isAdmin = decoded.userRole === "admin" ? true : false;
      }

      let query = Item.find().sort({ title: 1 });

      if (!isAdmin) {
         query = query.where("isHidden").equals(false);
      }
      if (search) {
         query = query.regex("title", new RegExp(search, "i"));
      }

      // query = query.where("").equals(false);

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
      const { title, description, categories, price, quantity, isHidden } =
         req.body;
      const fileData = req.file;
      const buffer = fileData ? fs.readFileSync(fileData.path) : "";

      console.log(`fileData:`, fileData);


      // Check if all required fields are present
      if (
         !title ||
         !description ||
         !categories ||
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
         categories,
         price,
         quantity,
         isHidden,
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

const updateItem = asyncHandler(async (req, res) => {
   try {
      const {
         title,
         description,
         categories,
         price,
         quantity,
         isHidden,
         imageUrl,
         imageUUID,
      } = req.body;
      const item = await Item.findById(req.params.id);

      if (item) {
         item.title = title || item.title;
         item.description = description || item.description;
         item.price = price || item.price;
         item.quantity = quantity || item.quantity;
         item.isHidden = isHidden || Item.isHidden;
         // item.imageUrl = imageUrl || Item.imageUrl;
         // item.imageUUID = imageUUID || Item.imageUUID;
      } else {
         res.status(400);
         throw new Error("User does not exist");
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
