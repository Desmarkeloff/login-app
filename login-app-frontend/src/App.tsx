import { Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PrivateRoute } from './pages/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<Register />} />
      </Route>
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}

export default App;
