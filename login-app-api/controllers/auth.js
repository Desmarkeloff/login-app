import { generarJWT } from "../helpers/jwt.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userEmail = await User.findOne({ email });

        // Verificar si el usuario existe.
        if (!userEmail) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario o contraseña inválidos."
            });;
        }

        // Verificar la contraseña utilizando bcrypt.compare
        const validPassword = await bcrypt.compare(password, userEmail.password);

        // Verificar si la contraseña es válida.
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario o contraseña inválidos."
            });;
        }

        //generar JWT
        const token = await generarJWT(userEmail._id, userEmail.email);

        res.status(200).json({ ok: true, msg: "Logged in!", token });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const revalidarJWT = async (req, res) => {

    const { uid, email } = req;
    const token = await generarJWT(uid, email);

    res.status(200).json({ ok: true, token });
};