require("dotenv").config();
require("colors");
const path = require("path");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(
   cors({
      origin: "http://localhost:3000",
   })
);
app.use(express.json());
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

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/items/", require("./routes/itemRoutes"));

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
