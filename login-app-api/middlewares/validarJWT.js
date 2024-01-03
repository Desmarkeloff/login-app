import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "There is no token in the request."
        });
    }

    try {
        const { uid, email } = jwt.verify(token, process.env.JWT_SEED);

        req.uid = uid;
        req.email = email;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "unvalid token."
        });
    }

    next();
};