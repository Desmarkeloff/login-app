import { useState } from 'react';
import '../styles/login.css';
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Login = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleTogglePassword = () => setShowPassword((show) => !show);

  return (
    <div className="login-container">
      <form className="login-form">
        <Typography style={{ "textDecoration": "underline", "color": "#6e90cd" }} variant="h4" component="div" gutterBottom>
          Ingresa a tu cuenta!
        </Typography>
        <TextField style={{ "width": "80%" }} className="login-input" id="outlined-basic" label="Email o Usuario" variant="outlined" />

        <TextField
          className="register-input"
          id="outlined-password"
          label="Contraseña"
          style={{ "width": "80%" }}
          type={showPassword ? "text" : "password"}
          variant="outlined"
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

        <Button style={{ "color": "#6e90cd", "border": "1px solid #6e90cd" }} color="success" className="login-btn" variant="outlined">Ingresar</Button>
        <section className="goto-register-section">
          <Typography variant="body2">¿No tienes una cuenta?</Typography>
          <Link to="/new" className='goto-register'>Registrarse</Link>
        </section>
      </form>

    </div>
  );
};
