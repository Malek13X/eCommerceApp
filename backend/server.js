import { config } from "dotenv";
import "colors";
import path from "path";
import cors from "cors";
import express from "express";
import session from "express-session";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // specify the directory to save uploaded files
const port = process.env.PORT || 5000;

config();
connectDB();
const app = express();

app.use(
   cors({
      origin: "http://localhost:3000",
   })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

// Session middleware
app.use(
   session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set to true if using HTTPS
   })
);

app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/items/", upload.single("image"), itemRoutes);

// //  Serve frontend
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))

//     app.get('*', (req,res) => {
//         res.sendFile(
//             path.resolve(__dirname, '../','frontend','build', 'index.html')
//         )
//     })
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'))
// }
app.use(errorHandler);

app.listen(port, () =>
   console.log(`-Server started on port ${port} `.bgGreen.bold.gray)
);
