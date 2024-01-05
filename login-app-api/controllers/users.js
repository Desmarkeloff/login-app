import { generarJWT } from "../helpers/jwt.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    const { password, confirmPassword } = req.body;
    try {
        const existingEmail = await User.findOne({ email: newUser.email });
        const existingNickname = await User.findOne({ nickname: newUser.nickname });

        //Check if email already exists.
        if (existingEmail) {
            return res.status(400).json({ ok: false, msg: "Email already exists." });
        }
        //Check if nickname already exists.
        if (existingNickname) {
            return res.status(400).json({ ok: false, msg: "Nickname already exists." });
        }

        //Check if passwords match.
        if (password !== confirmPassword) {
            return res.status(400).json({ ok: false, msg: "Passwords doens't match." });
        }

        //Encriptar contraseña y confirmar contraseña.
        const saltPw = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, saltPw);

        const saltCPw = bcrypt.genSaltSync();
        newUser.confirmPassword = bcrypt.hashSync(confirmPassword, saltCPw);

        //Guardar usuario en mongoDB.
        await newUser.save();

        //Generar JWT
        const token = await generarJWT(newUser._id, newUser.email);

        res.status(201).json({ uid: newUser._id, email: newUser.email, token });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (req.body.name.length < 1) {
            res.status(500).json({ ok: false, msg: "name is empty" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getOneUser = async (req, res) => {
    try {
        const user = await findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteAllUsers = async (req, res) => {
    try {
        const result = await User.deleteMany();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};