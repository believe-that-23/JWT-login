const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


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
            return res.status(200).send({ success: true, msg: "Registration Successful" });
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
                const tokenData = {
                    _id: user._id,
                    user: user.user,
                    email: user.email
                }
                const token = jwt.sign(tokenData, "Secretkey123", { expiresIn: '30d' });
                return res.status(200).send({ success: true, msg: "Login Successful", token: token });
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
        return res.status(200).send({success: true, msg: "password updated"})
    } else {
        return res.send({ msg: "No user or something went wrong." })
    }
}

module.exports = {
    registerUser, loginUser, userData, updateUser
}

