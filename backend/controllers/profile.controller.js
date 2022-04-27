import GoogleProfile from "../models/googleProfile.model.js";
import User from "../models/user.model.js"

export const changeUsername = async (req, res) => {
  const { newUsername, userType, userEmail } = req.body;

  try {
    const updatedUsername = { username: newUsername.username };
    const emailFilter = { email: userEmail };
    const usernameLength = updatedUsername.username.length;

    if(usernameLength < 4) return res.status(400).json({ message: "The new username must be at least 4 characters." });

    if(userType === 'Google'){
      const googleUsernameExists = await GoogleProfile.findOne(updatedUsername);
      const regularUsernameExists = await User.findOne(updatedUsername);

      if(googleUsernameExists || regularUsernameExists) {
        return res.status(400).json({ message: "That username already exists. Please choose a new one." });
      }

      const existingProfile = await GoogleProfile.findOneAndUpdate( emailFilter, updatedUsername, {new: true} );

  		if(!existingProfile) return res.status(404).json({ message: "Unable to find a user associated with this email." });

      res.status(200).json({ message: 'Username successfully updated.', result: existingProfile });
    }

    else if (userType === 'Regular'){
      const googleUsernameExists = await GoogleProfile.findOne(updatedUsername);
      const regularUsernameExists = await User.findOne(updatedUsername);

      if(googleUsernameExists || regularUsernameExists) {
        return res.status(400).json({ message: "That username already exists. Please choose a new one." });
      }

      const existingUser = await User.findOneAndUpdate( emailFilter, updatedUsername, {new: true} );

      if(!existingUser) return res.status(404).json({ message: "Unable to find a user associated with this email." });

      res.status(200).json({ message: 'Username successfully updated.', result: existingUser });
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong with changeUsername: ", error });
  }
};
