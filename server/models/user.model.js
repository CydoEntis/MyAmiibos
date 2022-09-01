import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bycryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    minlength: 5,
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email"
    },
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    trim: true,
    select: false
  }
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.getSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
})

export default mongoose.model('User', UserSchema);