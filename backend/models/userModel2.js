const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please provide a name."],
         maxLength: [50, "Name cannot be more than 50 characters."],
      },
      email: {
         type: String,
         required: [true, "Please provide an email address."],
         unique: true,
         match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email address.",
         ],
      },
      password: {
         type: String,
         required: [true, "Please provide a password."],
         minLength: [6, "Password must be at least 6 characters."],
      },
      role: {
         type: String,
         enum: ["user", "admin"],
         default: "user",
      },
   },
   {
      timestamps: true,
   }
);

// Add password hashing middleware before saving to the database
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
