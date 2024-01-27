import { useState } from 'react';
import '../styles/login.css';
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
export const Login = () => {

  const navigate = useNavigate();

  interface User {
    email: string;
    password: string;
    token: null | string;
  }

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    token: ""
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleTogglePassword = () => setShowPassword((show) => !show);

  // const navigate = useNavigate();
  const queryUrl: string = "http://localhost:8016/api/auth";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | any>) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post(queryUrl, user);

      const { token } = userResponse.data;
      setUser(user => ({ ...user, token }));

      Swal.fire({
        title: 'Logged In!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      localStorage.setItem('token', token);

      navigate("/");

    } catch (error: any) {

      Swal.fire({
        title: error.response.data.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      });

    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="login-container" onSubmit={handleSubmit} >
      <form className="login-form" >
        <Typography style={{ "textDecoration": "underline", "color": "#6e90cd" }} variant="h4" component="div" gutterBottom>
          Ingresa a tu cuenta!
        </Typography>
        <TextField
          style={{ "width": "80%" }}
          className="login-input"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name='email'
          value={user.email}
          onChange={handleInputChange}
        />

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
          name='password'
          value={user.password}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          style={{ "color": "#6e90cd", "border": "1px solid #6e90cd" }}
          color="success"
          className="login-btn"
          variant="outlined">Ingresar</Button>
        <section className="goto-register-section">
          <Typography variant="body2">¿No tienes una cuenta?</Typography>
          <Link to="/new" className='goto-register'>Registrarse</Link>
        </section>
      </form>

    </div>
  );
};

