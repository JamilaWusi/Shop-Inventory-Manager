import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["owner", "admin"],
      default: "owner",
    },

    businessName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(){
  this.password = await bcrypt.hash(this.password,10);
})

userSchema.pre("findOneAndUpdate", async function() {
  const update = this.getUpdate()
  console.log(update)
  if (update.password) {
    update.password = await bcrypt.hash(update.password,10);
  }
})

export default mongoose.model("User", userSchema);