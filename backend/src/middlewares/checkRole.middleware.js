export const checkRole = (allowedRoles) => (req, res, next) => {
    try {

        const isRoleValid = allowedRoles.includes(req.role);

        // console.log(req.role);
        // console.log(req.userId);
        // console.log(allowedRoles);
        // console.log(role);
        console.log(isRoleValid);

        if (!isRoleValid) {
            return res.status(403).json({ message: "You are not allowed." });
        }
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}