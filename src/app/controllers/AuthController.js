const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const staffController = require('./StaffController');

let refreshTokens = [];

const AuthController = {
    async RegisterAccount(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create a new user
            const newAccount = new Account({
                username: req.body.username,
                password: hashed,
            });

            const account = await newAccount.save();
            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Generate access token using arrow function
    generateAccessToken(user) {
        return jwt.sign({
            id: user._id,
            role_name: user.role_id ? user.role_id.name : user.role_name,
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "20s" }
        );
    },
    generateRefreshToken(user) {
        return jwt.sign({
            id: user._id,
            role_name: user.role_id ? user.role_id.name : user.role_name,

        },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    // Log in
    async LoginAccount(req, res, next) {
        try {
            const account = await Account.findOne({ username: req.body.username });
            if (!account) {
                return res.status(404).json({ message: "Wrong username", account });
            }
            const validPassword = await bcrypt.compare(req.body.password, account.password)
            if (!validPassword) {
                return res.status(404).json({ message: "Wrong password" });
            }
            const user = await staffController.findStaffByAccountId(account._id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const accessToken = AuthController.generateAccessToken(user);
            const refreshToken = AuthController.generateRefreshToken(user);
            refreshTokens.push(refreshToken)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",

            })

            res.status(200).json({ user: { _id: user._id, role: user.role_id.name }, accessToken });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        console.log("refreshToken: " + refreshToken);
        //Send error if token is not valid
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log("verify: " + err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //create new access token, refresh token and send to user
            const newAccessToken = AuthController.generateAccessToken(user);
            const newRefreshToken = AuthController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    },
    LogoutAccount: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("Logged out");
    }
};

module.exports = AuthController;
