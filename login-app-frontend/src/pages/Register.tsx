import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import "../styles/register.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export const Register = () => {

    interface User {
        name: string;
        lastname: string;
        email: string;
        nickname: string;
        password: string;
        confirmPassword: string;
        [key: string]: string; // Índice de cadena para permitir otras propiedades string
    }

    const queryUrl: string = "http://localhost:8016/api/users";

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [user, setUser] = useState<User>(
        {
            name: "",
            lastname: "",
            email: "",
            nickname: "",
            password: "",
            confirmPassword: ""
        }
    );

    const [inputErrors, setInputErrors] = useState<User>({
        name: "",
        lastname: "",
        email: "",
        nickname: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleTogglePassword = () => setShowPassword((show) => !show);
    const handleToggleConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.confirmPassword !== user.password) {
            Swal.fire({
                title: 'Las contraseñas no coinciden!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            await axios.post(queryUrl, user);

            Swal.fire({
                title: 'User succesfully created!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setInputErrors({
                name: "",
                lastname: "",
                email: "",
                nickname: "",
                password: "",
                confirmPassword: ""
            });

            setUser({
                name: "",
                lastname: "",
                email: "",
                nickname: "",
                password: "",
                confirmPassword: ""
            });

            navigate("/login");
        } catch (error: any) {
            // Verificar si el error es de tipo AxiosError
            if (axios.isAxiosError(error)) {
                if (error.response === undefined) {
                //     console.log("Error desconocido:", error);
                    return;
                }

                const { errors } = error.response.data;

                if (error.response) {
                    // console.error("Respuesta del servidor:", error.response.data.errors);

                    //inicializo una variable para colocar todos los errores.
                    const newInputErrors: User = { ...inputErrors };

                    //Busco los errores y los almaceno.
                    for (const key in newInputErrors) {
                        if (key in errors && errors[key].msg) {
                            newInputErrors[key] = errors[key].msg;
                        }
                    }

                    //Setteo los valores.
                    setInputErrors(newInputErrors);

                    if (error.response.data.msg) {
                        Swal.fire({
                            title: error.response.data.msg,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                        return;
                    }
                    return;
                }
            } else {
                // El error no es de tipo AxiosError.
                // console.error("Error desconocido:", error);
                return;
            }
        };
    };

    return (
        <div className="register-container">
            <Box
                className='form-container'
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography style={{ "textDecoration": "underline", "color": "#6e90cd" }} variant="h3" component="div" gutterBottom>
                    Registrate!
                </Typography>

                <div className="register-name-group">
                    <TextField
                        className="register-input"
                        id={inputErrors.name === "" ? "" : "standard-error-helper-text name"}
                        label="Nombre"
                        error={inputErrors.name !== ""}
                        variant={inputErrors.name === "" ? "outlined" : "filled"}
                        helperText={inputErrors.name === "" ? "" : inputErrors.name}
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                    />

                    <TextField
                        className="register-input"
                        id={inputErrors.lastname === "" ? "" : "standard-error-helper-text lastname"}
                        label="Apellido"
                        error={inputErrors.lastname !== ""}
                        variant={inputErrors.lastname === "" ? "outlined" : "filled"}
                        helperText={inputErrors.lastname === "" ? "" : inputErrors.lastname}
                        name="lastname"
                        value={user.lastname}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="register-email-group">

                    <TextField
                        className="register-input"
                        id={inputErrors.email === "" ? "" : "standard-error-helper-text email"}
                        label="Email"
                        error={inputErrors.email !== ""}
                        variant={inputErrors.email === "" ? "outlined" : "filled"}
                        helperText={inputErrors.email === "" ? "" : inputErrors.email}
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />

                    <TextField
                        className="register-input"
                        id={inputErrors.nickname === "" ? "" : "standard-error-helper-text nickname"}
                        label="Apodo"
                        error={inputErrors.nickname !== ""}
                        variant={inputErrors.nickname === "" ? "outlined" : "filled"}
                        helperText={inputErrors.nickname === "" ? "" : inputErrors.nickname}
                        name="nickname"
                        value={user.nickname}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="register-password-group">

                    <TextField
                        className="register-input"
                        id="outlined-password"
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        error={inputErrors.password !== ""}
                        variant={inputErrors.password === "" ? "outlined" : "filled"}
                        helperText={inputErrors.password === "" ? "" : inputErrors.password}
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePassword} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        className="register-input"
                        id="outlined-password"
                        label="Confirmar contraseña"
                        type={showConfirmPassword ? "text" : "password"}
                        error={inputErrors.confirmPassword !== ""}
                        variant={inputErrors.confirmPassword === "" ? "outlined" : "filled"}
                        helperText={inputErrors.confirmPassword === "" ? "" : inputErrors.confirmPassword}
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleToggleConfirmPassword} edge="end">
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                </div>
                <Button
                    style={{ "color": "#6e90cd", "border": "1px solid #6e90cd" }}
                    color="success"
                    className="register-btn"
                    variant="outlined"
                    type="submit">
                    Crear cuenta
                </Button>
                
                <div className="register-goto-login">
                    <Typography variant="body2">¿Ya tienes una cuenta?</Typography>
                    <Link to="/login" className="goto-login">
                        Iniciar sesión
                    </Link>
                </div>
            </Box>
        </div >
    );
};