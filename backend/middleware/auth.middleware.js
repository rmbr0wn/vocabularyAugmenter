import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/*
		This file is mostly unused, as there were issues with malformed jwt authorization
		when trying to use the auth in /routes to validate the user.

		The authorization is instead handled client-side, though in the future it would
		be a good idea to properly implement/fix server-side authorization.
*/
const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		let decodedData;

		if(token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.JWT_SECRET);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
