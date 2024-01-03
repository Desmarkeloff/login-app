import express from "express";
import { createUser, deleteAllUsers, deleteUser, getUsers, updateUser } from "../controllers/users.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

//CREATE
router.post('/',
    [
        check("name", "El nombre debe contener al menos 2 caracteres.")
            .not()
            .isEmpty()
            .isLength({ min: 2 }),
        check("lastname", "El apellido debe contener al menos 2 caracteres.")
            .not()
            .isEmpty()
            .isLength({ min: 2 }),
        check("email", "El formato de email no es válido.")
            .not()
            .isEmpty()
            .isEmail()
            .isLength({ min: 5 }),
        check("nickname", "El apodo debe contener al menos 2 caracteres.")
            .not()
            .isEmpty().isLength({ min: 3 }),
        check("password", "La contraseña debe contener al menos 6 caracteres.")
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        check("confirmPassword", "La confirmación de contraseña debe contener al menos 6 caracteres.")
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        validarCampos
    ],
    createUser
);

//READ
router.get('/', getUsers);
//UPDATE
router.put('/:id', updateUser);
//DELETE
router.delete('/:id', deleteUser);
//DELETE ALL
router.delete('/', deleteAllUsers);

export default router;