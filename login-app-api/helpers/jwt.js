import jwt from 'jsonwebtoken';

export const generarJWT = (uid, email) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, email };

        jwt.sign(payload, process.env.JWT_SEED, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("Something went wrong with token generation.");
            }

            resolve(token);
        });
    });
};