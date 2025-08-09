import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Loginpage from './components/Loginpage';
import AdminHome from './components/AdminHome';
import Adduser from './components/Adduser';

// Dummy placeholder components
function Add() {
  return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Add Product Page</h2>;
}
function Product() {
  return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Product Page</h2>;
}
function Profile() {
  return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Profile Page</h2>;
}

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Loginpage setUserRole={setUserRole} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/product" element={<Product />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminHome/>} />
      <Route path="/adduser" element={<Adduser/> }/>
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
