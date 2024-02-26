import { testService } from "../services/test.services.js";

export const testController = async (req, res) => {
	try {
		testService(req, res);
		return res.status(200).json({ message: "Test controller works." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
