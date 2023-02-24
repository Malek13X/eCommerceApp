const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const passwordValidator = require("password-validator");

const userSchema = mongoose.Schema(
   {
      firstName: {
         type: String,
         required: [true, "Please provide a first name."],
         maxLength: [25, "Name cannot be more than 25 characters."],
      },
      lastName: {
         type: String,
         required: [true, "Please provide a last name."],
         maxLength: [25, "Name cannot be more than 25 characters."],
      },
      email: {
         type: String,
         required: [true, "Please provide an email address."],
         unique: true,
         validate: [validator.isEmail, "Please provide a valid email address."],
      },
      password: {
         type: String,
         required: [true, "Please provide a password."],
         validate: [
            {
               validator: (password) => {
                  const schema = new passwordValidator();
                  schema
                     .is()
                     .min(8)
                     .is()
                     .max(50)
                     .has()
                     .uppercase()
                     .has()
                     .lowercase()
                     .has()
                     .digits()
                     .has()
                     .symbols();

                  return schema.validate(password);
               },
               message:
                  "Password must be between 8 and 50 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            },
         ],
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

// Modify properties before saving to the database
userSchema.pre("save", async function (next) {
   // Add password hashing
   if (!this.isModified("password")) {
      next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);

   // Lowercase the email
   if (!this.isModified("email")) {
      next();
   }
   this.email = email.toLowerCase();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
