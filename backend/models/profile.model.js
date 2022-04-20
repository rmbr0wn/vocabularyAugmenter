import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema({
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
	image: {
    type: String,
		required: true
	},
},  {
	timestamps: true,
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
