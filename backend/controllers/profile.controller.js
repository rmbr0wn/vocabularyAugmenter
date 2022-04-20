import Profile from "../models/profile.model.js";

export const generateProfile = async (req, res) => {
  const { username, email, image } = req.body;

  console.log(req.body)

  try {
    const existingProfile = await Profile.findOne({ email });

		if(existingProfile) return res.status(400).json({ message: "A profile with that email already exists."});

    const result = await Profile.create({ username, email, image });

    res.status(201).json({ message: 'Profile successfully created.', result: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with generateProfile: ", error});
  }
};

export const getProfile = async (req, res) => {

};

export const changeUsername = async (req, res) => {

};

export const changeImage = async (req, res) => {

};
