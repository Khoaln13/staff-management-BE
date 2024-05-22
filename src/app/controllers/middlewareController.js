const jwt = require('jsonwebtoken');
const staffsController = require('./StaffController')


const middlewareController = {

    //verify token
    verifyToken: (req, res, next) => {

        const token = req.headers.token;
        const refreshToken = req.cookies.refreshToken
        if (token) {

            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, decodedToken) => {
                if (err) {
                    return res.status(403).json(err);
                }
                try {
                    const user = await staffsController.findStaffById(decodedToken.id);
                    if (!user) {
                        return res.status(404).json({ message: "User not found" });
                    }
                    req.user = user;
                    next();
                } catch (error) {
                    return res.status(500).json(req.user);
                }
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {

        middlewareController.verifyToken(req, res, () => {
            if (req.user.role_id && req.user.role_id.name === 'admin') {
                next();
            } else {

                res.status(403).json("You're not admin");
            }
        });
    },
    verifyTokenAndUser: (req, res, next) => {

        middlewareController.verifyToken(req, res, () => {
            console.log('user id: ' + req.user._id + 'params id: ' + req.params.id);
            if (req.user && (req.user._id == req.params.id)) {
                next();
            } else {
                res.status(403).json("You're not allowed to use this function");
            }
        });
    },

    verifyTokenAndUserOrAdminAuth: (req, res, next) => {

        middlewareController.verifyToken(req, res, () => {

            if (req.user && (req.user._id == req.params.id || req.user.role_id.name === 'admin')) {
                next();
            } else {
                res.status(403).json("You're not allowed to use this function");
            }
        });
    },

}
module.exports = middlewareController;
