export const testService = async (req, res) => {
	try {
		console.log("Test service works.");
		console.log(req.userId);
		console.log(req.role);
		// Hago cosas
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
