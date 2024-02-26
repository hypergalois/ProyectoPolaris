export const handleForgotPassword = async (req, res) => {
	try {
		// Creamos un token de reset
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
