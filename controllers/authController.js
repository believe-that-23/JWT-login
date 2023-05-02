const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mailSender = require('../config/mailSender')


const registerUser = async (req, res) => {
    const { user, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(200).send({ success: false, msg: "User already registered with this email" })
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newEntry = await User.create({
                user: user,
                email: email,
                password: hashedPassword
            });
            // const newEntry = new User(req.body);
            // newEntry.save();
            await mailSender(newEntry, 'verify-mail');
            return res.status(200).send({ success: true, msg: "Registration Successful and verification mail sent to your mail" });
        } catch (error) {
            return res.status(400).send({ success: false, msg: error })
        }
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (user && (await bcrypt.compare(password, user.password))) {
                if (user.isVerified) {
                    const tokenData = {
                        _id: user._id,
                        user: user.user,
                        email: user.email
                    }
                    const token = jwt.sign(tokenData, process.env.JWT_KEY, { expiresIn: '30d' });
                    return res.status(200).send({ success: true, msg: "Login Successful", token: token });
                } else {
                    return res.send({success: false, msg: "email not verified, Please check your mail.."})
                }
            } else {
                return res.send({ success: false, msg: "invalid credentials" })
            }
        } else {
            return res.send({ success: false, msg: "invalid credentials" })
        }
    } catch (error) {
        return res.send(error);
    }
}

const userData = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).send({ success: true, data: req.body.user })
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateUser = async (req, res) => {
    const { updateUser } = req.body;
    const email = updateUser.email;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(updateUser.cupassword, user.password))) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(updateUser.password, salt);
        await User.findByIdAndUpdate(user._id, {
            name: updateUser.name,
            email: updateUser.email,
            password: hashedPassword
        });
        return res.status(200).send({ success: true, msg: "password updated" })
    } else {
        return res.send({ msg: "No user or something went wrong." })
    }
}

const verifyMail = async (req, res) => {
    try {
        const tokenDetail = await Token.findOne({ token: req.body.token })
        if (tokenDetail) {
            await User.findOneAndUpdate({ _id: tokenDetail.userid, isVerified: true })
            await Token.findOneAndDelete({ token: req.body.token })

            res.send({ success: true, msg: "email verified successfully" });
        }
    } catch (error) {
        res.send({ success: false, msg: "Invalid token" })
    }
}

module.exports = {
    registerUser, loginUser, userData, updateUser, verifyMail
}

