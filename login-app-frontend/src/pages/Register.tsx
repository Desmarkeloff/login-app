import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import "../styles/register.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
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

    const handleTogglePassword = () => setShowPassword((show) => !show);
    const handleToggleConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
        } catch (error: any) {
            // Verificar si el error es de tipo AxiosError
            if (axios.isAxiosError(error)) {
                if (error.response == undefined) {
                    console.log("Error desconocido:", error);
                    return;
                }
                const { errors } = error.response.data;

                // Verificar si el error tiene una respuesta del servidor.
                if (error.response) {
                    // Acceder a los detalles de la respuesta del servidor.
                    console.error("Respuesta del servidor:", error.response.data.errors);

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

                    return;
                }
            } else {
                // El error no es de tipo AxiosError.
                console.error("Error desconocido:", error);
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
                    {
                        inputErrors.name === ""
                            ? <TextField className="register-input" label="Nombre" variant="outlined" name="name" value={user.name} onChange={handleInputChange} />
                            : <TextField
                                error
                                className="register-input-error"
                                id="standard-error-helper-text"
                                label="Nombre"
                                helperText={inputErrors.name}
                                variant="filled"
                            />

                    }
                    {
                        inputErrors.lastname === ""
                            ? <TextField className="register-input" label="Apellido" variant="outlined" name="lastname" value={user.lastname} onChange={handleInputChange} />
                            : <TextField
                                error
                                className="register-input-error"
                                id="standard-error-helper-text"
                                label="Apellido"
                                helperText={inputErrors.lastname}
                                variant="filled"
                            />
                    }
                </div>

                <div className="register-email-group">
                    {
                        inputErrors.email === ""
                            ? <TextField className="register-input" label="Email" variant="outlined" name="email" value={user.email} onChange={handleInputChange} />
                            : <TextField
                                error
                                className="register-input-error"
                                id="standard-error-helper-text"
                                label="Email"
                                helperText={inputErrors.email}
                                variant="filled"
                            />
                    }
                    {
                        inputErrors.nickname === ""
                            ? <TextField className="register-input" label="Apodo" variant="outlined" name="nickname" value={user.nickname} onChange={handleInputChange} />
                            : <TextField
                                error
                                className="register-input-error"
                                id="standard-error-helper-text"
                                label="Apodo"
                                helperText={inputErrors.nickname}
                                variant="filled"
                            />

                    }

                </div>

                <div className="register-password-group">
                    {
                        inputErrors.password === ""
                            ? <TextField
                                className="register-input"
                                id="outlined-password"
                                label="Contraseña"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
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
                            : <TextField
                                error
                                className="register-input-error"
                                id="standard-error-helper-text"
                                label="Contraseña"
                                type={showPassword ? "text" : "password"}
                                helperText={inputErrors.password}
                                variant="filled"
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
                    }
                    {
                        inputErrors.confirmPassword === ""
                            ? <TextField
                                className="register-input"
                                id="outlined-confirm-password"
                                label="Confirmar Contraseña"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
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
                            : <TextField
                                error
                                className="register-input-error"
                                id="standard-error-helper-text"
                                label="Confirmar Contraseña"
                                type={showPassword ? "text" : "password"}
                                helperText={inputErrors.confirmPassword}
                                variant="filled"
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
                    }

                </div>
                <Button style={{ "color": "#6e90cd", "border": "1px solid #6e90cd" }} color="success" className="register-btn" variant="outlined" type="submit">Crear cuenta</Button>
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