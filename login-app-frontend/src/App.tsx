// import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

/*Notas:
1- Hacer un register, luego el login.
2- Si está autorizado, podes acceder al home, sino de una al register o login.
3- Marcar error en el login.*/