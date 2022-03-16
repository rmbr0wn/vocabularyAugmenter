import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  id: { type: String }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
