const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const passwordValidator = require("password-validator");
const libphonenumber = require("google-libphonenumber");

const nameValidator = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
function formatPhoneNumber(number) {
   const phoneUtil = phoneNumber.PhoneNumberUtil.getInstance();
   const parsedNumber = phoneUtil.parse(number);
   return phoneUtil.format(
      parsedNumber,
      phoneNumber.PhoneNumberFormat.INTERNATIONAL
   );
}
const userSchema = mongoose.Schema(
   {
      firstName: {
         type: String,
         required: [true, "Please provide a first name."],
         maxLength: [25, "Name cannot be more than 25 characters."],
         match: [
            nameValidator,
            "First name can only contain letters, spaces, hyphens, and apostrophes.",
         ],
      },
      lastName: {
         type: String,
         required: [true, "Please provide a last name."],
         maxLength: [25, "Name cannot be more than 25 characters."],
         match: [
            nameValidator,
            "Last name can only contain letters, spaces, hyphens, and apostrophes.",
         ],
      },
      email: {
         type: String,
         required: [true, "Please provide an email address."],
         unique: true,
         validate: [validator.isEmail, "Please provide a valid email address."],
      },
      password: {
         type: String,
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
      phone: {
         type: String,
         default: "LB +961",
         validate: [
            {
               validator: (value) => {
                  //example of what value should look like: LB +961 81922609
                  if (value) {
                     const countryCode = value.split(" ")[0];
                     const dialCode = value.split(" ")[1];
                     const phoneNumber = value.split(" ")[2];

                     const regions = [
                        "US +1",
                        "GB +44",
                        "FR +33",
                        "AE +971",
                        "LB +961",
                     ];

                     if (regions.includes(dialCode)) {
                        const number = phoneUtil.parse(
                           phoneNumber,
                           countryCode
                        );
                        return phoneUtil.isValidNumber(number);
                     }
                  } else {
                     return true;
                  }
               },
               message: (props) =>
                  `${props.value} is not a valid phone number!`,
            },
         ],
      },
      addresses: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
         },
      ],
   },
   {
      timestamps: true,
   }
);

//
userSchema.path("password").validate(function (value) {
   if (!this.password && !value) {
      throw new Error("Please provide a password.");
   }
}, null);

// Modify properties before saving to the database
userSchema.pre("save", async function (next) {
   // Add password hashin
   if (!this.isModified("password")) {
      next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);

   // Lowercase firstName and lastName
   this.firstName = this.firstName.toLowerCase();
   this.lastName = this.lastName.toLowerCase();

   // Lowercase the email
   if (this.email) {
      this.email = this.email.toLowerCase();
   }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
