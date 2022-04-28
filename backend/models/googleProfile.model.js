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
	googleId: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: true
});

const GoogleProfile = mongoose.model("GoogleProfile", profileSchema);

export default GoogleProfile;
