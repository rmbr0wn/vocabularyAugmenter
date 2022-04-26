import GoogleProfile from "../models/googleProfile.model.js";

export const generateGoogleProfile = async (req, res) => {
  const { username, email, googleId } = req.body;

  try {
    const existingProfile = await GoogleProfile.find({ email }).exec();

		if(existingProfile && existingProfile.length > 0){
      // return res.status(400).json({ message: "A profile with that email already exists."});
      return;
    }

    const result = await GoogleProfile.create({ username, email, googleId });

    res.status(201).json({ message: 'Profile successfully created.', result: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with generateProfile: ", error});
  }
};

export const getGoogleProfile = async (req, res) => {
  const { id } = req.params;
  console.log(id);


  console.log(req.params.id);

	try {
    const existingProfile = await GoogleProfile.findOne({ id }).exec();
    console.log(existingProfile);

		if(!existingProfile) return res.status(404).json({ message: "There is no profile associated with that id."});

		res.status(200).json({ result: existingProfile });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong with getGoogleProfile: ", error });
	}
};
