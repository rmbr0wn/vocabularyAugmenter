import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingAccount = await User.findOne({ email });

		if(!existingAccount) return res.status(404).json({ message: "There is no account associated with that email." });

		const isPasswordCorrect = await bcrypt.compare(password, existingAccount.password);

		if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid login credentials." });

		const token = jwt.sign({ email: existingAccount.email, id: existingAccount._id }, "testToken", { expiresIn: "1h" });

		res.status(200).json({ result: existingAccount, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};


export const signUp = async (req, res) => {
	const { email, password, confirmPassword, username } = req.body;

	try{
		const existingAccount = await User.findOne({ email });

		if(existingAccount) return res.status(400).json({ message: "An account with that email already exists." });

		const usernameExists = await User.findOne({ username });

		if(usernameExists) return res.status(400).json({ message: "That username is already taken." });

		if(password !== confirmPassword) return res.status(400).json({ message: "The passwords don't match." });

		if(!username) return res.status(400).json({ message: "You must enter a username." });

		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({ email, password: hashedPassword, username: `${username}` });
		const token = jwt.sign({ email: result.email, id: result._id }, "testToken", { expiresIn: "1h" });

		res.status(201).json({ message: "User created.", result: result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong: ", error });
	}
};
